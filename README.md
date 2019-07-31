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
- [Installation](#installation)
- [Usage](#usage)
  - [1. Register](#1-register)
  - [2. Use in React](#2-use-in-react)
- [Showcase](#showcase)
  - [UI child themes of `gatsby-theme-comments`](#ui-child-themes-of-gatsby-theme-comments)
  - [Sites that uses `gatsby-theme-comments`](#sites-that-uses-gatsby-theme-comments)
- [APIs](#apis)
  - [Comment](#comment)
  - [Exports](#exports)
    - [CommentSection](#commentsection)
      - [id](#id)
    - [CommentCount](#commentcount)
      - [id](#id-1)
    - [useComments](#usecomments)
    - [useCommentCount](#usecommentcount)
    - [useAddComment](#useaddcomment)
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

module.exports = {
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


## Installation

```
npm install gatsby-theme-comments
```

## Usage

### 1. Register

In `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    ...otherPlugins,

    "gatsby-theme-comments",
  ],
}
```

### 2. Use in React

In your post template (`src/templates/post.js`), you can use `CommentSection` in your JSX:

```jsx
import { CommentSection } from "gatsby-theme-comments"

...

return (
  <Layout>
    <Article />
    <Author />

    <CommentSection id={slug} />
  </Layout>
)
```

The `id` prop must be a unique string or number that identifies the post. It can be the post's id, slug, or title, but do be aware that you'd lose track of the comments if you change that id.

For example, let's say that you use `slug` as the identifier. If you want to change the post's slug, remember to go into your Firebase database and change that value too.

## Showcase

### UI child themes of `gatsby-theme-comments`

- [Barebone/Core](https://npmjs.com/package/gatsby-theme-comments)
- [Minimal UI](https://npmjs.com/package/gatsby-theme-comments-ui)

If you wrote a child theme for `gatsby-theme-comments`, please submit a [PR](https://github.com/alexluong/gatsby-theme-comments/edit/master/README.md) to add your theme to the list.

### Sites that uses `gatsby-theme-comments`

Nobody is using this plugin. Sad face 😢

If you use `gatsby-theme-comments`, please submit a [PR](https://github.com/alexluong/gatsby-theme-comments/edit/master/README.md) to add your site to the list.

Feel free to reach out or open an issue if you're interested in using this. I'm available to answer any questions or take feature requests.

## APIs

### Comment

The `Comment` interface is an object that looks like this:

```ts
interface Comment {
  id: string;
  content: string;
  name: string;
  createdAt: Timestamp;
}

interface Timestamp {
  nanoseconds: number;
  milliseconds: number;
}
```

### Exports

#### CommentSection

A component that renders a form for users to add comment as well as all the comments of the post. This is the simplest way to use `gatsby-theme-comments`. You can use this component in your `Post` template.

##### id

> `string` | *required*

A unique identifier used to identify each post

#### CommentCount

A component that renders the comment count of the post

##### id

> `string` | *required*

A unique identifier used to identify each post

#### useComments

> `function(id: string): { loading: boolean, comments: Array<Comment> }`

This hook takes the identifier as argument and gives you the corresponding array of comments.

If the identifier is invalid, the comment array is empty.

```jsx
function Comments({ id }) {
  const { loading, comments } = useComments()

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <ul>
      {comments.map(comment) => (
        <li key={comment.id}>{comment.content}</li>
      )}
    </ul>
  )
}
```

#### useCommentCount

> `function(id: string): { loading: boolean, commentCount: number }`

This hook takes the identifier as argument and gives you the corresponding number of comments.

If the identifier is invalid, the count is 0. The reason for this is that the plugin only keeps track of posts with at least 1 comment. Therefore, if a post doesn't have any, its `id` would not be available in database.

```jsx
function CommentCount({ id }) {
  const { loading, commentCount } = useCommentCount()

  if (loading) {
    return <p>0 comment</p>
  }

  return <p>{commentCount} comment{commentCount > 1 ? "s" : ""}</p>
}
```

#### useAddComment

> `function(): function(comment: Comment): void`

This hook returns a function for you to add comment to database.

```jsx
function AddComment({ comment }) {
  const addComment = useAddComment()

  return (
    <button onClick={() => addComment(comment)}>Add</button>
  )
}
```

*Note*: The `Comment` you pass to the `addComment` function is one without `Timestamp`. The `createdAt` field will be included whenever the plugin makes a call to Firebase. You don't have to construct that value.

### Shadowable Components

## License

MIT
