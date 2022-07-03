import { graphql } from "gatsby"
import React from 'react'
import Pagination from './../Blog/Pagination.js'

const Post = ({ pageContext, data }: any) => {
  const {
    numPages,
    currentPage

  } = pageContext
  console.log(data)
  console.log('context', pageContext)
  // console.log(data.blog.body.raw)
  // const { blog: { frontmatter: { date, tags, title },
  //   html } } = data
  // const shortDate = date.split("T")[0]
  return (
    <div>Markdown Post

      <h3>{data.blog.title}</h3>
      <div className="prose max-w-5xl"
        dangerouslySetInnerHTML={{ __html: data.blog?.body?.raw }} />

      <Pagination numPages={numPages} slug={data.blog.slug} currentPage={currentPage} />
    </div>
  )
}

export default Post


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
