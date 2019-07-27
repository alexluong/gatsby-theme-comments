import React from "react"
import { css } from "theme-ui"

function Form(props) {
  return <form {...props} css={css({ mb: 4 })} noValidate />
}

export default Form
