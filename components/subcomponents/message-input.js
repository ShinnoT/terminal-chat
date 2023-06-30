"use client";

const MessageInput = ({ handleNewMessage }) => {
    return (
        <form
            className="flex flex-row items-center justify-between mt-2"
            onSubmit={handleNewMessage}
        >
            &gt;
            <input
                className="appearance-none bg-transparent border-none w-full text-geen-800 py-1 px-2 leading-tight focus:outline-none"
                id="message"
                type="text"
                placeholder="Type a message..."
                aria-label="Message"
                autoComplete="off"
                autoFocus
            />
        </form>
    );
};

export default MessageInput;
