import React from "react"
import { css } from "theme-ui"

import Loading from "gatsby-theme-comments/src/components/Loading"
import Comment from "gatsby-theme-comments/src/components/Comment"

function Comments({ comments, loading }) {
  if (loading) {
    return <Loading />
  }

  if (comments.length === 0) {
    return <p>There is no comments.</p>
  }

  return (
    <ul css={css({ pl: 0, listStyleType: "none" })}>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ul>
  )
}

export default Comments
