import React from "react"

function Comment({ comment }) {
  return (
    <li>
      {comment.content} - {comment.name}
    </li>
  )
}

export default Comment
