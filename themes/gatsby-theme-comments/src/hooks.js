import React from "react"
import { useFirebase, FirebaseContext } from "gatsby-plugin-firebase"

export function useComments(id) {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [comments, setComments] = React.useState([])

  useFirebase(firebase => {
    setLoading(true)
    firebase
      .firestore()
      .collection("comments")
      .orderBy("time", "desc")
      .where("postId", "==", id)
      .onSnapshot(
        querySnapshot => {
          const arr = []
          querySnapshot.forEach(doc => {
            arr.push({
              ...doc.data({ serverTimestamps: "estimate" }),
              id: doc.id,
            })
          })
          setLoading(false)
          setComments(arr)
        },
        error => {
          setLoading(false)
          setError(error)
        },
      )
  })

  return { loading, error, comments }
}

export function useAddComment() {
  const firebase = React.useContext(FirebaseContext)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  function addComment(comment) {
    setLoading(true)

    firebase
      .firestore()
      .collection("comments")
      .add({
        ...comment,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        setError(error)
      })
  }

  return { loading, error, addComment }
}
