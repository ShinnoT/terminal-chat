import Message from "@/components/message";
import MessageInput from "@/components/message-input";

const Home = () => {
    return (
        <main className="flex h-screen flex-col items-left justify-between p-3 md:p-6">
            <div className="h-full overflow-y-auto">
                {[...Array(40)].map((x, i) =>
                    i % 2 === 0 ? (
                        <Message key={i} user="1mN5" color="text-green-700">
                            Chat area. Hello world.
                        </Message>
                    ) : (
                        <Message key={i} user="a76KK2x" color="text-green-400">
                            Chat area. Hello world. This is a really really
                            really really really long message. Chat area. Hello
                            world. This is a really really really really really
                            long message.
                        </Message>
                    )
                )}
            </div>
            <MessageInput />
        </main>
    );
};

export default Home;
