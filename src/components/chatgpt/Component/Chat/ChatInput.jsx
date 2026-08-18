import { useState } from "react";
import "./ChatInput.css";

function ChatInput({ onSend, disabled }) {
    const [value, setValue] = useState("");

    const handleSubmit = () => {
        const message = value.trim();

        if (!message || disabled) {
            return;
        }

        onSend(message);
        setValue("");
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="input-container">
            <textarea
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                disabled={disabled}
                rows={1}
            />

            <button
                onClick={handleSubmit}
                disabled={!value.trim() || disabled}
            >
                ↑
            </button>
        </div>
    );
}

export default ChatInput;