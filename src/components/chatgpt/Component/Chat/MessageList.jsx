import Message from "./Message";
import "./MessageList.css";

function MessageList({ messages, isLoading, endRef }) {
  return (
    <main className="message-container">
      <div className="message-list">
        {messages.map((message) => (
          <Message
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}

        {isLoading && (
          <div className="typing-indicator">
            AI is thinking...
          </div>
        )}

        <div ref={endRef} />
      </div>
    </main>
  );
}

export default MessageList;
