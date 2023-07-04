import Image from "next/image";
import messageSVG from "@/public/messaging.svg";
import undraw1 from "@/public/undraw_1.svg";
import undraw2 from "@/public/undraw_2.svg";
import undraw3 from "@/public/undraw_3.svg";
import undraw4 from "@/public/undraw_4.svg";
import undraw5 from "@/public/undraw_5.svg";

const Features = () => {
    return (
        <section className="mt-20 lg:mt-52 w-full flex flex-col">
            <h1 className="text-4xl text-center mb-8 lg:mb-16">Features</h1>
            <div className="flex flex-row items-center justify-evenly w-full">
                <div className="w-6/12 flex flex-col justify-around items-start">
                    <h3 className="text-lime-500">Anonymous Sign-up</h3>
                    <p className="mt-2 text-left lg:text-justify text-sm lg:text-lg">
                        Create your account without revealing any personally
                        identifiable information, maintaining your anonymity
                        from the start.
                    </p>
                </div>
                <Image
                    src={undraw5}
                    alt="Chat illustration"
                    className="h-auto w-4/12"
                />
            </div>
            <div className="mt-20 flex flex-row-reverse items-center justify-evenly w-full">
                <div className="w-6/12 flex flex-col justify-around items-end lg:items-start">
                    <h3 className="text-lime-500 text-right lg:text-left">
                        Military-Grade Encryption
                    </h3>
                    <p className="mt-2 text-right lg:text-justify text-sm lg:text-lg">
                        Your messages are shielded with the highest level of
                        encryption, ensuring only you and your intended
                        recipients can read them.
                    </p>
                </div>
                <Image
                    src={messageSVG}
                    alt="Chat illustration"
                    className="h-auto w-4/12"
                />
            </div>
            <div className="mt-20 flex flex-row items-center justify-evenly w-full">
                <div className="w-6/12 flex flex-col justify-around items-start">
                    <h3 className="text-lime-500">Password Protection</h3>
                    <p className="mt-2 text-left lg:text-justify text-sm lg:text-lg">
                        Set a strong password to safeguard your Paranoia account
                        from unauthorized access.
                    </p>
                </div>
                <Image
                    src={undraw2}
                    alt="Chat illustration"
                    className="h-auto w-4/12"
                />
            </div>
            <div className="mt-20 flex flex-row-reverse items-center justify-evenly w-full">
                <div className="w-6/12 flex flex-col justify-around items-end lg:items-start">
                    <h3 className="text-lime-500 text-right lg:text-left">
                        Anonymous Group Chats
                    </h3>
                    <p className="mt-2 text-right lg:text-justify text-sm lg:text-lg">
                        Engage in private group conversations while keeping your
                        identity concealed.
                    </p>
                </div>
                <Image
                    src={undraw3}
                    alt="Chat illustration"
                    className="h-auto w-4/12"
                />
            </div>
            <div className="mt-20 flex flex-row items-center justify-evenly w-full">
                <div className="w-6/12 flex flex-col justify-around items-start">
                    <h3 className="text-lime-500">Secure File Transfer</h3>
                    <p className="mt-2 text-left lg:text-justify text-sm lg:text-lg">
                        Share files and documents securely, knowing they are
                        protected throughout the entire transmission process.
                    </p>
                </div>
                <Image
                    src={undraw4}
                    alt="Chat illustration"
                    className="h-auto w-4/12"
                />
            </div>
        </section>
    );
};

export default Features;
