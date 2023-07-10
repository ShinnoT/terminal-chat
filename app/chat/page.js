import Chat from "@/components/chat";
import Encryptor from "@/context/encrypt";

const ChatPage = () => {
    return (
        <Encryptor>
            <main className="h-screen p-3 md:p-6">
                <Chat />
            </main>
        </Encryptor>
    );
};

export default ChatPage;
