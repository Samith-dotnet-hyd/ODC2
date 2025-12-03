import React, { useState, useRef, useEffect } from "react";
import "../styles/chat.css";
export default function ChatBox({ messages = [], onSend }) {
  const [text, setText] = useState("");
  const el = useRef();

  useEffect(() => {
    if (el.current) el.current.scrollTop = el.current.scrollHeight;
  }, [messages]);

  const send = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="chat-box">
      <h4>Chat</h4>
      <div className="chat-messages" ref={el}>
        {messages.map((m, i) => (
          <div key={i} className="chat-bubble">
            {m.system ? <em>{m.text}</em> : <><strong>{m.senderName ?? m.userId}: </strong>{m.message}</>}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Type message"/>
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
