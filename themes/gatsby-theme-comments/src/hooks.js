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

export function useCommentCount(id) {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [count, setCount] = React.useState(0)

  useFirebase(firebase => {
    setLoading(true)
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .onSnapshot(
        doc => {
          const { commentCount } = doc.data()
          setLoading(false)
          setCount(commentCount)
        },
        error => {
          setLoading(false)
          setError(error)
        },
      )
  })

  return { loading, error, count }
}

export function useAddComment() {
  const firebase = React.useContext(FirebaseContext)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  function addComment(comment) {
    setLoading(true)

    const db = firebase.firestore()
    const batch = db.batch()
    batch.set(db.collection("comments").doc(), {
      ...comment,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    })
    batch.update(db.collection("posts").doc(comment.postId), {
      commentCount: firebase.firestore.FieldValue.increment(1),
    })

    batch
      .commit()
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
