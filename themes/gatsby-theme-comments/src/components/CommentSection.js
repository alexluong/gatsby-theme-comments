import React from "react"
import { useComments } from "../hooks"
import Loading from "./Loading"
import AddComment from "./AddComment"
import Comments from "./Comments"

function CommentSection({ id }) {
  const { loading, comments } = useComments(id)

  if (loading) {
    return <Loading />
  }

  return (
    <aside>
      <AddComment id={id} />
      <Comments comments={comments} id={id} />
    </aside>
  )
}

export default CommentSection
