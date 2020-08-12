import React from "react"
import firebase from "gatsby-plugin-firebase"

export function useComments(id) {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [comments, setComments] = React.useState([])

  React.useEffect(() => {
    setLoading(true)

    firebase
      .firestore()
      .collection("comments")
      .orderBy("createdAt", "desc")
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
  }, [])

  return { loading, error, comments }
}

export function useCommentCount(id) {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    setLoading(true)
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .onSnapshot(
        doc => {
          const data = doc.data()
          setLoading(false)
          setCount(data ? data.commentCount : 0)
        },
        error => {
          setLoading(false)
          setError(error)
        },
      )
  }, [])

  return { loading, error, count }
}

export function useAddComment() {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  function addComment(comment) {
    return new Promise((resolve, reject) => {
      setLoading(true)

      const db = firebase.firestore()
      const batch = db.batch()
      batch.set(db.collection("comments").doc(), {
        ...comment,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      batch.set(
        db.collection("posts").doc(comment.postId),
        {
          commentCount: firebase.firestore.FieldValue.increment(1),
        },
        { merge: true },
      )

      batch
        .commit()
        .then(() => {
          setLoading(false)
          resolve()
        })
        .catch(error => {
          setLoading(false)
          setError(error)
          reject(error)
        })
    })
  }

  return { loading, error, addComment }
}
