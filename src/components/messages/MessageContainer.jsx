import React, { useEffect } from 'react';
import Messages from './Messages';
import { useChatContext } from '../../context/ChatContext';

const MessageContainer = () => {
  const { selectedUser, setSelectedUser } = useChatContext();
  const isNoChatSelected = !selectedUser;

  return (
    <div className='md:w-1/2 flex flex-col p-3 border border-gray-300 rounded'>
      {isNoChatSelected ? (<NoChatSelected /> ): (
        <>
          {/* Header */}
          <div className='px-4 py-2 mb-2 bg-blue-500 text-black'>
            <span className='text-lg font-bold'>To: </span>
            <span className='text-lg font-bold'>{selectedUser.fullName}</span>
          </div>
          <Messages />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className='flex-grow-1 flex justify-center items-center'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex col items-center gap-2'>
        <p>Welcome Name</p>
        <p className='text-lg font-bold'>Select a chat to start messaging</p>
      </div>
    </div>
  )
}