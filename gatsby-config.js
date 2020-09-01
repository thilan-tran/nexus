module.exports = {
  siteMetadata: {
    title: "Thilan Tran | Home and Portfolio",
    description:
      "The personal website and portfolio of software engineer Thilan Tran.",
    author: "@thilantran",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/static/favicon.svg",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sass",
  ],
}
