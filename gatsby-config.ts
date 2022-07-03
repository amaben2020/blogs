import type { GatsbyConfig } from "gatsby";

const path = require('path')

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Gatsby Contentful app`,
    siteUrl: `https://www.yourdomain.tld`,
    role: 'Developer at Company',
    bio: 'My short bio that I will use to introduce myself'
  },

  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ["CONTENTFUL_ACCESS_TOKEN", "CONTENTFUL_SPACEID"]
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content`,
        name: "pages",
      }
    },
    //{
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/MDX`,
    //     name: "mdx-bio",
    //   }
    // },

    {
      resolve: '@gatsby-contrib/gatsby-plugin-elasticlunr-search',
      options: {
        fields: ['title', 'tags', 'desc', "javascript", "react", "gatsby"],
        resolvers: {
          MarkdownRemark: {
            title: (node: any) => node.frontmatter.title,
            tags: (node: any) => node.frontmatter.tags,
            desc: (node: any) => node.frontmatter.desc,
            // path: (node: any) => '/blog' + node.fields.slug,
            path: (node: any) => node.fields.slug,
          },
        },
        filter: (node, getNode) =>
          node.frontmatter.type === "Blog",
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACEID,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'mdx-bio',
        path: `${__dirname}/MD`,
      },
    },
    'gatsby-plugin-mdx',
    {
      resolve: `gatsby-remark-images`,
      options: {
        maxWidth: 750,
        linkImagesToOriginal: false,
      },
    },

    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          formats: ['auto', 'webp'],
          placeholder: 'blurred',
          quality: 70,
          breakpoints: [300],
          backgroundColor: 'transparent',
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        }
      }
    },


    "gatsby-plugin-sass", "gatsby-plugin-image", "gatsby-transformer-remark"
    , "gatsby-image", "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-remark-images", "gatsby-plugin-sitemap", "gatsby-plugin-react-helmet-async",
  ],
};

export default config;


