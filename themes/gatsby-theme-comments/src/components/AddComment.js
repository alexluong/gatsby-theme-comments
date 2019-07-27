import React from "react"
import { FirebaseContext } from "gatsby-plugin-firebase"

function Comments({ id }) {
  const firebase = React.useContext(FirebaseContext)

  function add() {
    firebase
      .firestore()
      .collection("comments")
      .add({
        name: "Alex",
        content: "Hello",
        postId: id,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      })
  }

  return <button onClick={add}>Add</button>
}

export default Comments
