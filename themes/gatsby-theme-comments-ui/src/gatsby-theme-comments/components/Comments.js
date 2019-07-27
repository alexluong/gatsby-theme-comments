import React from "react"
import { css } from "theme-ui"

import Comment from "./Comment"

function Comments({ comments, id }) {
  if (!comments) {
    return <p>Loading...</p>
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
