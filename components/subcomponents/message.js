"use client";

const Message = ({ user, color, messageType, children }) => {
    return (
        <div className="flex flex-row items-start justify-start">
            {messageType === "message" ? (
                <>
                    <p className={`w-14 mx-2 ${color}`}>{user}:::</p>
                    <p className={`mx-2 flex-grow break-all ${color}`}>
                        {children}
                    </p>
                </>
            ) : (
                <>
                    <p className="mx-2 flex-grow break-all italic text-gray-500 text-xs">
                        {children}
                    </p>
                </>
            )}
        </div>
    );
};

export default Message;
