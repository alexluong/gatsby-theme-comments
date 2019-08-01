import React from "react"
import { useCommentCount } from "../hooks"

function CommentCount({ id }) {
  const { loading, count } = useCommentCount(id)

  if (loading) {
    return <span>0 comment</span>
  }

  return (
    <span>
      {count} comment{count > 1 ? "s" : ""}
    </span>
  )
}

export default CommentCount
