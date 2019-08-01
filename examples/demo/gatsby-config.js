require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: "My Blog Title",
    author: "My Name",
    description: "My site description...",
    social: [
      {
        name: "twitter",
        url: "https://twitter.com/gatsbyjs",
      },
      {
        name: "github",
        url: "https://github.com/gatsbyjs",
      },
    ],
  },
  plugins: [
    {
      resolve: "gatsby-theme-blog",
      options: {},
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        features: {
          firestore: true,
        },
      },
    },
    "gatsby-theme-comments-ui",
  ],
}
