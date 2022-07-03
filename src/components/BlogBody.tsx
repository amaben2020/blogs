// import React from "react";
// import { MARKS, BLOCKS } from "@contentful/rich-text-types"
// import { Options } from "@contentful/rich-text-types"
// import { Bold, Heading1 } from "./Markdown";
// import useContentfulImages from "../hooks/useContentfulImages";


// // type BlogBodyProps = {
// //   content: RenderRichTextData<ContentfulRichTextGatsby>
// // }


// export const BlogBody = ({ content }: any) => {
//   const options: Options = {
//     renderMark: {
//       [MARKS.BOLD]: (text: string) => <Bold>{text}</Bold>,
//     },
//     renderNode: {
//       [BLOCKS.HEADING_1]: (node: any, children: any) => (
//         <Heading1>{children}</Heading1>
//       ),
//       [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
//         <p>{children}</p>
//       ),
//       [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
//         const asset = useContentfulImages(node.data.target.sys.id)

//         console.log('ASSET', asset);
//         if (asset) {
//           return <img src={asset.node.asset.url} alt={asset.node.title} />
//         }
//       }
//     }
//   }
//   return (
//     <article> {renderRichText(content, options)}</article>
//   )
// }


import React from "react"

import {
  ContentfulRichTextGatsbyReference,
  renderRichText,
  RenderRichTextData,
} from "gatsby-source-contentful/rich-text"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { Options } from "@contentful/rich-text-react-renderer"


import { Bold, Heading1, Text } from "./Markdown"
import useContentfulImages from "../hooks/useContentfulImages"
import { GatsbyImage } from "gatsby-plugin-image"

type BlogBodyProps = {
  content: RenderRichTextData<ContentfulRichTextGatsbyReference>
}

export const BlogBody = ({ content }: BlogBodyProps) => {
  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <Heading1>{children}</Heading1>,
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = useContentfulImages(node.data.target.sys.id)
        if (asset) {
          console.log(asset);
          return (
            <GatsbyImage
              alt='ß'
              image={asset.node.fluid}
              style={{ maxWidth: "500px", margin: "5% auto" }}
            />
          )
        }
      },
    },
  }

  return (
    <article className="blog-body">{renderRichText(content, options)}</article>
  )
}