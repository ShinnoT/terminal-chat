import Image from "next/image";
import scrnshtLoginFull from "@/public/browser_create_room_full.png";
import scrnshtChat from "@/public/browser_chat_page.png";

const Screenshots = () => {
    return (
        <>
            <div className="mt-16 lg:mt-28 flex flex-col lg:flex-row items-center justify-evenly w-full">
                <div className="w-full lg:w-4/12 flex flex-col justify-around items-center lg:items-start">
                    <h3 className="text-lime-500 text-center lg:text-left">
                        Anonymous Group Chats: Connect Privately
                    </h3>
                    <p className="mt-2 text-justify text-sm">
                        Engage in private group conversations while maintaining
                        your anonymity. Share ideas and collaborate securely
                        with Paranoia's anonymous group chat feature.
                    </p>
                </div>
                <Image
                    src={scrnshtLoginFull}
                    alt="App login screenshot"
                    className="h-auto w-full lg:w-7/12"
                />
            </div>
            <div className="mt-20 lg:mt-28 flex flex-col lg:flex-row-reverse items-center justify-evenly w-full">
                <div className="w-full lg:w-4/12 flex flex-col justify-around items-center lg:items-start">
                    <h3 className="text-lime-500 text-center lg:text-left">
                        Secure Messaging at Your Fingertips
                    </h3>
                    <p className="mt-2 text-justify text-sm">
                        Chat with confidence using Paranoia's intuitive
                        interface. Our end-to-end encryption ensures your
                        conversations are protected from unauthorized access.
                    </p>
                </div>
                <Image
                    src={scrnshtChat}
                    alt="App chat screenshot"
                    className="h-auto w-full lg:w-7/12"
                />
            </div>
        </>
    );
};

export default Screenshots;
