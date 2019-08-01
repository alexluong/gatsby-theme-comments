import React from "react"
import { useComments } from "../hooks"
import AddComment from "./AddComment"
import Comments from "./Comments"

function CommentSection({ id }) {
  const { loading, comments } = useComments(id)

  return (
    <aside>
      <AddComment id={id} />
      <Comments comments={comments} id={id} loading={loading} />
    </aside>
  )
}

export default CommentSection
