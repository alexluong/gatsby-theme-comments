import React from "react"
import { css } from "theme-ui"

function Button(props) {
  return (
    <button
      {...props}
      css={css({
        display: "block",
        bg: "primary",
        borderColor: "primary",
        color: "background",
        borderRadius: 4,
        p: 1,
        fontSize: 1,
        cursor: "pointer",
      })}
    />
  )
}

export default Button
