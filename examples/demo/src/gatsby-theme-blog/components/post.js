import React from "react"
import { Styled, css } from "theme-ui"

import PostFooter from "gatsby-theme-blog/src/components/post-footer"
import Layout from "gatsby-theme-blog/src/components/layout"
import SEO from "gatsby-theme-blog/src/components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"

import { CommentSection, CommentCount } from "gatsby-theme-comments"

const Post = ({
  data: {
    post,
    site: {
      siteMetadata: { title },
    },
  },
  location,
  previous,
  next,
}) => {
  const slug = location.pathname.replace(/\//gi, "")

  return (
    <Layout location={location} title={title}>
      <SEO title={post.title} description={post.excerpt} />
      <main>
        <Styled.h1>{post.title}</Styled.h1>
        <Styled.p
          css={css({
            fontSize: 1,
            mt: -3,
            mb: 3,
          })}
        >
          {post.date} - <CommentCount id={slug} />
        </Styled.p>

        <MDXRenderer>{post.body}</MDXRenderer>
      </main>
      <PostFooter {...{ previous, next }} />

      <CommentSection id={slug} />
    </Layout>
  )
}

export default Post
