import { graphql } from "gatsby"
import React from 'react'
import { MDXRenderer } from "gatsby-plugin-mdx";

const Bio = ({ data }: any) => {
  const {
    mdx: { body },
  } = data;

  console.log(body)
  return (
    <div>Bio

      {/* <div dangerouslySetInnerHTML={{
        __html: data.markdownRemark.frontmatter
      }}></div> */}

      <MDXRenderer>
        {body}
      </MDXRenderer>
    </div>
  )
}

export default Bio


export const query = graphql`
{  mdx(frontmatter: {type: {eq: "bio"}}) {
    body
  }}
`;
