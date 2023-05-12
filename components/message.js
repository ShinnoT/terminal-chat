"use client";

const Message = ({ user, color, children }) => {
    return (
        <div className={`flex flex-row items-start justify-between ${color}`}>
            <p className="w-2/6 md:w-2/12 lg:w-1/12">User {user}:</p>
            <p className="w-4/6 md:w-10/12 lg:w-11/12 mr-2">{children}</p>
        </div>
    );
};

export default Message;
