import { graphql, useStaticQuery } from "gatsby"
import React from 'react'

const useContentfulImages = (assetUrl: string) => {
  const { assets } = useStaticQuery(
    graphql`
    query CONTENTFUL_IMAGE_QUERY{
      assets: allContentfulAsset {
        edges {
          node {
            contentful_id
    }
    }
    }
    }
    `
  )

  const asset = assets.edges.find(({ node }) => node.contentful_id === assetUrl)

  return asset

}


export default useContentfulImages