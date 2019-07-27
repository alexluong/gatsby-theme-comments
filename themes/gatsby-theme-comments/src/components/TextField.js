import React from "react"

function TextField({ labelProps, label, ...inputProps }) {
  return (
    <label {...labelProps}>
      <span>{label}</span>
      {inputProps.rows ? (
        <textarea {...inputProps} />
      ) : (
        <input {...inputProps} />
      )}
    </label>
  )
}

export default TextField
