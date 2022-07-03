import React from "react";
import Helmet from "react-helmet";

function Metatags(props) {
  const { title, description, pathname, url, thumbnail } = props;

  if (!props) {
    return null;
  }
  return (
    <Helmet
      title={title}
      meta={[
        { name: "title", content: title },

        { name: "description", content: description },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:url",
          content: pathname ? url + pathname : url,
        },

        {
          property: "og:image",
          content: thumbnail && thumbnail,
        },
        {
          property: "og:image:secure_url",
          content: thumbnail && thumbnail,
        },

        {
          property: "og:description",
          content: description,
        },

        {
          property: "og:image:width",
          content: "1200",
        },

        {
          property: "og:image:height",
          content: "630",
        },
        {
          property: "og:locale",
          content: "en",
        },
        { name: "twitter:card", content: "summary_large_image" },

        { name: "twitter:title", content: title },

        {
          name: "twitter:description",
          content: description,
        },
        {
          name: "twitter:image",
          content: thumbnail && thumbnail,
        },
        { property: "og:type", content: "website" },
        { name: "robots", content: "index, follow" },

        { name: "twitter:creator", content: "@saigowthamr" },
        { property: "og:site_name", content: "yoursitename" },
      ]}
    >
      <html lang="en" />
    </Helmet>
  );
}

export default Metatags;
