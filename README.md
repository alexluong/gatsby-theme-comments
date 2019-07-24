# gatsby-theme-comments

Provides drop-in comment functionality for static Gatsby site, powered by Firebase

## The problem

You want to drive engagement for your Gatsby blog via comments.

## This solution

This is a Gatsby theme that let you add comment section to your blog.

This differs from other solutions in that it gives you complete control of your data and UI. You store your data on your own database, and you can modify the design as you see fit.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Notes](#notes)
- [Install](#install)
- [How to use](#how-to-use)
  - [1. Register](#1-register)
  - [2. Use in React](#2-use-in-react)
- [APIs](#apis)
  - [CommentEmbed Props](#commentembed-props)
    - [id](#id)
  - [Shadowable Components](#shadowable-components)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Notes

This theme uses `firebase` to store comments. You will need to initialize a `firebase` instance on your Gatsby site.

One way to go about that is using [`gatsby-plugin-firebase`](https://github.com/alexluong/gatsby-plugin-firebase). Here is a quick instruction on how to set it up:

1. Install

```
npm install firebase gatsby-plugin-firebase
npm install -D dotenv
```

2. Register the plugin in `gatsby-config.js`

```js
require("dotenv").config()

modules.export = {
  plugins: [
    ...otherPlugins,

    {
      resolve: "gatsby-plugin-firebase",
      options: {
        features: {
          firestore: true,
        },
      },
    },
  ],
}
```

3. Add environment variables in `.env`

```
GATSBY_FIREBASE_API_KEY=<YOUR_FIREBASE_API_KEY>
GATSBY_FIREBASE_AUTH_DOMAIN=<YOUR_FIREBASE_AUTH_DOMAIN>
GATSBY_FIREBASE_DATABASE_URL=<YOUR_FIREBASE_DATABASE_URL>
GATSBY_FIREBASE_PROJECT_ID=<YOUR_FIREBASE_PROJECT_ID>
GATSBY_FIREBASE_STORAGE_BUCKET=<YOUR_FIREBASE_STORAGE_BUCKET>
GATSBY_FIREBASE_MESSAGING_SENDER_ID=<YOUR_FIREBASE_MESSAGING_SENDER_ID>
GATSBY_FIREBASE_APP_ID=<YOUR_FIREBASE_APP_ID>
```

And voila, you're ready to rock and roll!


## Install

```
npm install gatsby-theme-comments
```

## How to use

### 1. Register

In `gatsby-config.js`:

```js
modules.export = {
  plugins: [
    ...otherPlugins,

    "gatsby-theme-comments",
  ],
}
```

### 2. Use in React

In your post template (`src/templates/post.js`), you can use `CommentEmbed` in your JSX:

```jsx
import { CommentsEmbed } from "gatsby-theme-comments"

...

return (
  <Layout>
    <Article />
    <Author />

    <CommentsEmbed id={slug} />
  </Layout>
)
```

The `id` prop must be a unique string or number that identifies the post. It can be the post's id, slug, or title, but do be aware that you'd lose track of the comments if you change that id.

For example, let's say that you use `slug` as the identifier. If you want to change the post's slug, remember to go into your Firebase database and change that value too.

## APIs

### CommentEmbed Props

#### id

> `string` | *required*

A unique identifier used to identify each post

### Shadowable Components

## License

MIT
