import React, {useLayoutEffect, useState} from "react";
import {Message} from "../types/Message";
import ChatStore from '../store/ChatStore';
import { v4 as uid } from 'uuid';

const FirstPerson = () => {
    const profile = {
        name: 'First Person'
    };

    const [message, setMessage] = useState("");
    const [chatState, setChatState] = useState(ChatStore.initialState);

    useLayoutEffect(() => {
        ChatStore.subscribe(setChatState);
        ChatStore.init();
    }, []);

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const messageObject = {
            user: 'first-person',
            text: message.trim(),
        };
        ChatStore.sendMessage(messageObject);
        setMessage("");
        // (document.getElementById('messageInput') as HTMLFormElement).reset();

    };

    return (
        <div className="container">
            <h2>{profile.name}</h2>
            <div className="chat-box">
                {chatState.data.map((message: Message) => (
                    <div key={uid()}>
                        <p key={uid()} className={message.user}>{message.text}</p>
                        <div key={uid()} className="clear"> </div>
                    </div>
                ))}
            </div>
            <form id="messageForm" onSubmit={onFormSubmit}>
                <input
                    type="text"
                    id="messageInput"
                    name="messageInput"
                    placeholder="type here..."
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setMessage(e.target.value)
                    }}
                    required
                />
                <button type="submit">Send</button>
                <br/>
            </form>

            <button className="clear-button" onClick={() => ChatStore.clearChat()}>
                Clear Chat
            </button>

        </div>
    );
};

export default FirstPerson;
