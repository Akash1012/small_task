import { useEffect, useRef } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import "./Chat.css";

function Chat({
  messages,
  isLoading,
  sidebarOpen,
  onSend,
  onNewChat,
  onToggleSidebar,
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  return (
    <div className="chat">
      <header className="chat-header">
        <div className="chat-header-left">
          {!sidebarOpen && (
            <button
              className="expand-sidebar-button"
              onClick={onToggleSidebar}
              title="Show sidebar"
            >
              ☰
            </button>
          )}

          <h2>AI Assistant</h2>
        </div>

        <button className="header-new-chat-button" onClick={onNewChat}>
          New Chat
        </button>
      </header>

      <MessageList
        messages={messages}
        isLoading={isLoading}
        endRef={messagesEndRef}
      />

      <ChatInput
        onSend={onSend}
        disabled={isLoading}
      />
    </div>
  );
}

export default Chat;
