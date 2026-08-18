import "./Message.css";

function Message({ role, content }) {
    const isUser = role === "user";

    return (
        <div className={`message-row ${isUser ? "user" : "assistant"}`}>
            <div className="message">
                {content}
            </div>
        </div>
    );
}

export default Message;