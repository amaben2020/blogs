import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from 'react'
import Pagination from './Pagination.js'
import { BlogBody } from "../../components/BlogBody"
import BlogLangingPage from "../../components/LandingPage"


type TemplateProps = {
  data: {
    blog: {
      title: string;
      coverImages: {
        gatsbyImageData: {
          sizes: {
            base64: string;
          };
        };
      };
      body: {
        raw: string;
      };

    }
  }
}

const BlogTemplate = ({ data: { blog } }: any) => {
  const image = blog && blog.coverImages && getImage(blog.coverImages)

  console.log(blog)
  return (
    <div>{blog.title}
      <div>
        <h2>Contentful Blog Template</h2>
        <GatsbyImage image={image} alt='Okay' />
        {/* <BlogLangingPage image={image} title={blog.title} date={blog.date} /> */}
        {/* <BlogBody content={blog.body} /> */}
      </div>

      <div>
        Pagination

        <Pagination />
      </div>
    </div>
  )
}

export default BlogTemplate


export const query = graphql`
query($slug: String!) {
 blog: contentfulBlogs(slug: { eq: $slug }) {
    title
    id
    slug
    body{
      raw
    }
    coverImages{
      gatsbyImageData(sizes: "600", layout: FIXED, formats: PNG)
    }
    date(formatString: "MMMM Do, YYYY")
  }
}
`



// export const pageQuery = graphql`
// query($skip: Int!, $limit: Int!) {
//   blog: contentfulBlogs(
//     limit: $limit
//     skip: $skip) {
//     nodes {
//       frontmatter {
//         date
//         title
//         tags
//         desc
//       }
//      coverImages{
//     gatsbyImageData(sizes: "600", layout: FIXED, formats: PNG)
//      }
//     }
//   }
// }
// `;