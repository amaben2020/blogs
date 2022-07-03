import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from 'react'

const BlogCard = ({ data }: any) => {
  console.log(data)
  const image = data && data.coverImages && getImage(data.coverImages)
  console.log(image)
  return (
    <div style={{ ...data.styler, border: " 0.5px solid gray" }}>
      <h2>{data.title}</h2>
      <GatsbyImage image={image} alt='Okay' />
    </div>
  )
}

export default BlogCard