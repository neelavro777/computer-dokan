import React from 'react'
import { FacebookShareButton, FacebookIcon } from 'react-share';

const FaceBookShare = ({url, quote}) => {
  return (
    <div>
      <FacebookShareButton url={url} quote={quote}>
        <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
    </div>
  )
}

export default FaceBookShare
