import React from "react"
import Loading from "./Loading"
import Comment from "./Comment"

function Comments({ comments, loading }) {
  if (loading) {
    return <Loading />
  }

  if (comments.length === 0) {
    return <p>There is no comments.</p>
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
