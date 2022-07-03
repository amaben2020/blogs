const path = require("path");
const { createFilePath, createFileNode } = require(`gatsby-source-filesystem`);
const _ = require("lodash");

const createMDPages = async ({ createPage, graphql }) => {
  // return new Promise((resolve, reject) => {
  //   resolve(
  //     graphql(`
  //       {
  //         allMarkdownRemark(
  //           sort: { order: DESC, fields: [frontmatter___date] }
  //           limit: 1000
  //         ) {
  //           edges {
  //             node {
  //               fields {
  //                 slug
  //               }
  //               frontmatter {
  //                 title
  //                 tags
  //               }
  //             }
  //           }
  //         }
  //       }
  //     `).then((result) => {
  //       if (result.errors) {
  //         console.log(result.errors);
  //         return reject(result.errors);
  //       }

  const postsQuery = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
            }
          }
        }
      }
    }
  `);

  if (postsQuery.errors) {
    console.log(postsQuery.errors);
  }

  const posts = postsQuery.data.allMarkdownRemark.edges;
  const blogTemplate = path.resolve("./src/templates/blog-post.js");
  const tagsTemplate = path.resolve("./src/templates/tag-template.js");

  //All tags
  let allTags = [];
  // Iterate through each post, putting all found tags into `allTags array`
  _.each(posts, (edge) => {
    if (_.get(edge, "node.frontmatter.tags")) {
      allTags = allTags.concat(edge.node.frontmatter.tags);
    }
  });
  // Eliminate duplicate tags
  allTags = _.uniq(allTags);

  allTags.forEach((tag, index) => {
    createPage({
      path: `/${_.kebabCase(tag)}/`,
      component: tagsTemplate,
      context: {
        tag,
      },
    });
  });

  // pagination: very simple
  posts.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: blogTemplate,
      defer: true,
      context: {
        slug: node.fields.slug,
        prev: index === 0 ? null : posts[index - 1],
        next: index === posts.length - 1 ? null : posts[index + 1],
      },
    });
  });
  return;
};

// create a data layer in gatsby
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

const createContentfulBlogPages = ({ createPage, graphql }) => {
  // for contentful:
  const blogFromContentfulTemplate = path.resolve(
    "./src/templates/Blog/index.tsx"
  );
  return graphql(`
    {
      blogs: allContentfulBlogs {
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then((res) => {
    res.data.blogs.edges.forEach(({ node: { slug } }) => {
      createPage({
        path: `/blogs/${slug}`,
        component: blogFromContentfulTemplate,
        context: {
          slug: slug,
        },
      });
    });
  });
};

const createMDBlogPages = async ({ createPage, graphql }) => {
  const MDTemplate = path.resolve("./src/templates/MD/post.tsx");
  try {
    const {
      data: {
        blogs: { edges },
      },
    } = await graphql(`
      {
        blogs: allContentfulBlogs {
          edges {
            node {
              slug
            }
          }
        }
      }
    `);

    const postsPerPage = 6;
    const numPages = Math.ceil(edges.length / postsPerPage);

    edges.forEach(({ node: { slug } }, i) => {
      console.log("indexes", i);
      createPage({
        path: i === 0 ? "/post" : `/post/${slug}/${i + 1}`,
        component: MDTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          slug: slug,
        },
      });
    });
  } catch ({ message }) {
    console.error(message);
  }
};

// creates multiple templates
exports.createPages = async ({ actions: { createPage }, graphql }) => {
  await createContentfulBlogPages({ createPage, graphql });
  await createMDPages({ createPage, graphql });
  await createMDBlogPages({ createPage, graphql });
};
