import { useState } from "react";
import Sidebar from "./Component/Sidebar/Sidebar";
import Chat from "./Component/Chat/Chat";
import "./App.css";

const greeting = {
  id: "greeting",
  role: "assistant",
  content: "Hi! How can I help you today?",
};

// Messages shown before the first send, while the chat is still a draft.
const draftMessages = [greeting];

const buildTitle = (content) => {
  const title = content.trim().replace(/\s+/g, " ");

  return title.length > 40 ? `${title.slice(0, 40)}…` : title;
};

const appendMessage = (conversations, id, message) =>
  conversations.map((conversation) =>
    conversation.id === id
      ? { ...conversation, messages: [...conversation.messages, message] }
      : conversation,
  );

function ChatGpt() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeId,
  );

  const messages = activeConversation
    ? activeConversation.messages
    : draftMessages;

  const handleSend = (content) => {
    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    // Remember which chat this reply belongs to, so switching chats
    // while it is in flight does not put the answer in the wrong place.
    let targetId = activeId;

    if (targetId === null) {
      targetId = crypto.randomUUID();

      const conversation = {
        id: targetId,
        title: buildTitle(content),
        messages: [greeting, userMessage],
      };

      setConversations((prev) => [conversation, ...prev]);
      setActiveId(targetId);
    } else {
      setConversations((prev) => appendMessage(prev, targetId, userMessage));
    }

    setLoadingId(targetId);

    // Simulate API call
    setTimeout(() => {
      const assistantMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `This is an AI response to: "${content}"`,
      };

      setConversations((prev) =>
        appendMessage(prev, targetId, assistantMessage),
      );
      setLoadingId((current) => (current === targetId ? null : current));
    }, 1000);
  };

  const handleNewChat = () => {
    setActiveId(null);
  };

  const handleDelete = (id) => {
    setConversations((prev) =>
      prev.filter((conversation) => conversation.id !== id),
    );

    setActiveId((current) => (current === id ? null : current));
  };

  return (
    <div className="app-layout">
      {/* <Sidebar
        conversations={conversations}
        activeId={activeId}
        isOpen={sidebarOpen}
        onSelect={setActiveId}
        onNewChat={handleNewChat}
        onDelete={handleDelete}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      /> */}

      <Chat
        key={activeId ?? "draft"}
        messages={messages}
        isLoading={loadingId !== null && loadingId === activeId}
        sidebarOpen={sidebarOpen}
        onSend={handleSend}
        onNewChat={handleNewChat}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />
    </div>
  );
}

export default ChatGpt;
