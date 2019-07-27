import React from "react"
import { css } from "theme-ui"

function TextField({ labelProps, label, ...inputProps }) {
  const inputCss = css({
    width: "100%",
    color: "text",
    p: 1,
    bg: "background",
    borderColor: "muted",
    borderWidth: 1,
    borderRadius: 4,
    fontFamily: "body",
    fontSize: 1,
    mb: 2,
    resize: "none",
    ":focus": {
      borderColor: "primary",
    },
  })

  return (
    <label {...labelProps} css={css({ display: "block" })}>
      <span>{label}</span>

      <br />

      {inputProps.rows ? (
        <textarea {...inputProps} css={inputCss} />
      ) : (
        <input {...inputProps} css={inputCss} />
      )}
    </label>
  )
}

export default TextField
