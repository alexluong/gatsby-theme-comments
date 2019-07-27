import React from "react"
import Comment from "./Comment"

function Comments({ comments }) {
  if (!comments) {
    return <p>Loading...</p>
  }

  return (
    <ul>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ul>
  )
}

export default Comments
