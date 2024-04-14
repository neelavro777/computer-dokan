import React from 'react';  
import { Link } from 'react-router-dom';
import ChatSearchInput from './ChatSearchInput';
import ChatList from './ListChatUsers';
import SendOffer from './SendOffer';
import PendingOffers from './PendingOffers';

const ChatSidebar = () => {
    return (
        <div className='md:w-1/2 border-right p-4 d-flex flex-column'>
            <ChatSearchInput />
            <hr className="my-4" />
            <ChatList /> 
            <PendingOffers />   
            <SendOffer />
            <Link to="/" className="btn btn-primary mb-4">Back</Link>
        </div>
    )
} 

export default ChatSidebar;