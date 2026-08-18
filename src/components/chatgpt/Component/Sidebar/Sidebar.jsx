import "./Sidebar.css";

function Sidebar({
  conversations,
  activeId,
  isOpen,
  onSelect,
  onNewChat,
  onDelete,
  onToggle,
}) {
  const handleDelete = (event, id) => {
    // Without this the row underneath would also get selected.
    event.stopPropagation();
    onDelete(id);
  };

  return (
    <aside className={`sidebar ${isOpen ? "" : "collapsed"}`}>
      <div className="sidebar-inner">
        <div className="sidebar-header">
          <span className="sidebar-title">Chats</span>

          <button
            className="sidebar-toggle"
            onClick={onToggle}
            title="Collapse sidebar"
          >
            «
          </button>
        </div>

        <button className="new-chat-button" onClick={onNewChat}>
          + New Chat
        </button>

        {conversations.length === 0 ? (
          <p className="sidebar-empty">No chats yet</p>
        ) : (
          <ul className="chat-history">
            {conversations.map((conversation) => (
              <li
                key={conversation.id}
                className={`history-item ${
                  conversation.id === activeId ? "active" : ""
                }`}
                onClick={() => onSelect(conversation.id)}
              >
                <span className="history-title">{conversation.title}</span>

                <button
                  className="delete-button"
                  onClick={(event) => handleDelete(event, conversation.id)}
                  title="Delete chat"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
