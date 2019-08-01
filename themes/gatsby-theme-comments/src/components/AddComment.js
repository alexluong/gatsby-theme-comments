import React from "react"
import Form from "./Form"
import Button from "./Button"
import TextField from "./TextField"
import { useAddComment } from "../hooks"

function Comments({ id }) {
  const [content, setContent] = React.useState("")
  const [name, setName] = React.useState("")
  const { loading, addComment } = useAddComment()

  function comment(e) {
    e.preventDefault()
    addComment({ name, content, postId: id }).then(() => {
      setContent("")
      setName("")
    })
  }

  return (
    <Form onSubmit={comment}>
      <TextField
        label="Name:"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <TextField
        label="Comment:"
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={3}
        required
      />
      <Button loading={loading}>Comment</Button>
    </Form>
  )
}

export default Comments
