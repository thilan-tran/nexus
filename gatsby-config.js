module.exports = {
  siteMetadata: {
    title: 'Thilan Tran | Home and Portfolio',
    description:
      'The personal website and portfolio of software engineer Thilan Tran.',
    author: '@thilantran'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        start_url: '/',
        icon: 'src/static/favicon.svg'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/static`,
        name: 'static'
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sass'
  ]
};
