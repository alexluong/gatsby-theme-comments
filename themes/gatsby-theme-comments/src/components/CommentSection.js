import React from "react"
import { useFirebase } from "gatsby-plugin-firebase"
import Comments from "./Comments"

function CommentSection({ id }) {
  const [comments, setComments] = React.useState(null)

  useFirebase(firebase => {
    firebase
      .firestore()
      .collection("comments")
      .orderBy("time", "desc")
      .where("postId", "==", id)
      .onSnapshot(querySnapshot => {
        const arr = []
        querySnapshot.forEach(doc => {
          arr.push({ ...doc.data(), id: doc.id })
        })
        setComments(arr)
      })
  })

  console.log(comments)

  return <Comments comments={comments} />
}

export default CommentSection
