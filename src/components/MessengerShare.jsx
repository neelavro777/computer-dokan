import React from 'react';
import { FacebookMessengerShareButton, FacebookMessengerIcon } from 'react-share';

const MessengerShare = ({ url }) => {
  return (
    <div>
      <FacebookMessengerShareButton url={url}>
        <FacebookMessengerIcon size={32} round />
      </FacebookMessengerShareButton>
    </div>
  );
};

export default MessengerShare;
