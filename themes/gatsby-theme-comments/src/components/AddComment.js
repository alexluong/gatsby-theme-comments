import React from "react"
import { FirebaseContext } from "gatsby-plugin-firebase"
import Form from "./Form"
import Button from "./Button"
import TextField from "./TextField"

function Comments({ id }) {
  const firebase = React.useContext(FirebaseContext)
  const [content, setContent] = React.useState("")
  const [name, setName] = React.useState("")

  function comment(e) {
    e.preventDefault()

    firebase
      .firestore()
      .collection("comments")
      .add({
        name,
        content,
        postId: id,
        time: firebase.firestore.FieldValue.serverTimestamp(),
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
      <Button>Comment</Button>
    </Form>
  )
}

export default Comments
