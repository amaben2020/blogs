// import * as React from "react";
// import { graphql } from "gatsby";
// import BlogCard from "../components/BlogCard";

// type HomeProps = {
//   data: {
//     blogs: {
//       edges: {
//         node: {
//           id: string,
//         },
//       },
//     },
//   },
// };

// // markup
// const IndexPage = ({ data: { blogs } }: HomeProps) => {
//   return (
//     <div>
//       <h1>Hello Gatsby</h1>

//       {blogs.edges?.map((blog) => {
//         return (
//           <div>
//             <BlogCard data={{ ...blog.node, styler: { padding: 3 } }} />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default IndexPage;

// export const query = graphql`
//   query {
//     blogs: allContentfulBlogs {
//       edges {
//         node {
//           title
//           id
//           slug
//           updatedAt
//           body {
//             raw
//           }
//           coverImages {
//             gatsbyImageData(sizes: "600", layout: FIXED, formats: PNG)
//           }
//         }
//       }
//     }
//   }
// `;

//@ts-nocheck
import React from 'react'
import { Link, graphql } from 'gatsby'
// import './post.css';
import Layout from '../components/layout'

const IndexPage = ({ data }) => {
  const postList = data.allMarkdownRemark;
  const blogList = data.allContentfulBlogs.edges
  console.log('bList', blogList)
  console.log(postList);
  return (
    <Layout>
      {postList.edges.map(({ node }, i) => (
        <Link to={node.fields.slug} key={i} className="link" >
          <div style={{ color: 'black' }}>
            <h1>{node.frontmatter.title}</h1>
            <span>{node.frontmatter.date}</span>
            <p>{node.excerpt}</p>
          </div>
        </Link>
      ))}

      <div style={{ border: '1px solid black', padding: 20 }}>
        Navigate to blogs without Pagination
        {blogList?.map(elem => (
          <Link to={`/blogs/${elem.node.slug}`} key={elem}  >
            Blog Link
          </Link>
        ))}

      </div>
    </Layout>
  )
}

export default IndexPage;

// BLOG IS SORTED BY DATE

export const listQuery = graphql`
  query ListQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          fields{
            slug
          }
          excerpt(pruneLength: 250)
          frontmatter {
            date 
            title
          }
        }
      }
    }

     allContentfulBlogs {
    edges {
      node {
      slug
    }
  }
} 
  }
`

