const MessageInput = () => {
    return (
        <div className="flex flex-row items-center justify-between mt-2">
            &gt;
            <input
                className="appearance-none bg-transparent border-none w-full text-geen-800 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Type a message..."
                aria-label="Message"
                autoFocus
            />
        </div>
    );
};

export default MessageInput;
