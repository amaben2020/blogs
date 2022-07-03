import React from "react";
import { Helmet } from "react-helmet-async";
import { useStaticQuery, graphql } from "gatsby";
export default function SEO({ description, lang = "en", title }) {
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s · My Site`}
      meta={[
        {
          name: `description`,
          content: description,
        },
      ]}
    />
  );
}
