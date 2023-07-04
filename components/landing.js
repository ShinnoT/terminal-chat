import Image from "next/image";
import Link from "next/link";
import encryptedMessageSVG from "@/public/encrypted_messaging.svg";

const Landing = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-evenly w-full">
            <div className="w-full lg:w-6/12 flex flex-col items-start justify-evenly">
                <h1 className="text-center text-5xl sm:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-lime-500">
                    Paranoia
                </h1>
                <h1 className="text-xl sm:text-4xl text-lime-600">
                    End-to-end encrypted, database-less, fully secure chat for
                    everyday <em className="text-lime-500">espionage</em>.
                </h1>
                <p className="mt-4 text-left">
                    Keep your secrets safe with us.
                </p>
                <Link href="/login" target="_blank">
                    <div className="rounded-full bg-gradient-to-l from-green-800 to-lime-500 w-30 h-7 p-0.5 mt-3">
                        <button className="rounded-full w-full h-full bg-gray-950 hover:bg-gradient-to-l hover:from-green-800 hover:to-lime-500 hover:text-gray-900 duration-500 px-5 flex flex-row text-xl justify-between items-center">
                            <p className="mr-2">Try it</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-3.5 h-3.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                />
                            </svg>
                        </button>
                    </div>
                </Link>
            </div>
            <Image
                src={encryptedMessageSVG}
                alt="Man messaging"
                className="h-auto w-full mt-16 lg:mt-0 sm:w-1/2 lg:w-6/12 -scale-x-100"
                // include -scale-x-100 in class to flip image
            />
        </div>
    );
};

export default Landing;
