import React from 'react'
import BackgroundImage from 'gatsby-background-image'
import { getImage } from "gatsby-plugin-image"
import { convertToBgImage } from "gbimage-bridge"
const BlogLangingPage = ({ image, title, date }) => {
  const headerImage = [
    `linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%), url(${image})`,

  ]

  const img = getImage(image)

  // Use like this:
  const bgImage = convertToBgImage(img)
  return (
    <BackgroundImage
      {...bgImage}
      Tag='header'
      className='header-image'
      fluid={headerImage}
      preserveStackingContext
      style={{
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >BlogLangingPage</BackgroundImage>
  )
}

export default BlogLangingPage
