"use client";

const Message = ({ user, color, children }) => {
    return (
        <div className={`flex flex-row items-start justify-start ${color}`}>
            <p className="w-14 mx-2">{user}:::</p>
            <p className="mx-2 flex-grow">{children}</p>
        </div>
    );
};

export default Message;
