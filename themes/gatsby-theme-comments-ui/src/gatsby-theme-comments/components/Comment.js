import React from "react"
import { css, Flex } from "theme-ui"
import { distanceInWordsToNow } from "date-fns"

function Comment({ comment }) {
  const { name, content, time } = comment
  console.log(time)
  const date = time.toDate()

  return (
    <Flex as="li" css={css({ mb: 3 })}>
      <div css={css({ mr: 2, flex: "0 0 48px", height: 48 })}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          alt="avatar"
          css={css({ width: "100%", borderRadius: "100%" })}
        />
      </div>
      <div>
        <div>
          {name} - {distanceInWordsToNow(date)} ago
        </div>
        <p css={css({ my: 0 })}>{content}</p>
      </div>
    </Flex>
  )
}

export default Comment
