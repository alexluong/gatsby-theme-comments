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
        credentials: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.FIREBASE_DATABASE_URL,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID
        }
      },
    },
    "gatsby-theme-comments-ui",
  ],
}
