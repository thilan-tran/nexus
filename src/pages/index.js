import React from "react"
import { Helmet } from "react-helmet"

import App from "../components/App"

const author = "Thilan Tran"
const title = "Thilan Tran | Home and Portfolio"
const descr = "The home and portfolio of software engineer Thilan Tran."

const IndexPage = ({ data }) => (
  <>
    <Helmet
      htmlAttributes={{ lang: "en" }}
      title={title}
      meta={[
        {
          name: "description",
          content: descr,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: descr,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:creator",
          content: author,
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: descr,
        },
      ]}
    />
    <App />
  </>
)

export default IndexPage
