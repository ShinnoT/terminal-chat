import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Landing from "@/components/landing";
import Footer from "@/components/footer";
import Customers from "@/components/customers";
import Features from "@/components/features";
import Screenshots from "@/components/screenshots";
import logoTransparentImage from "@/public/logo_transparent.png";

const Home = () => {
    return (
        <div className="bg-gradient-to-t from-gray-800 via-gray-900 to-gray-950 text-green-600">
            <Navbar />
            <main className="text-lg lg:text-xl flex flex-col items-center justify-center py-12 px-4 md:px-12 lg:px-24">
                <Landing />
                <div className="mt-20 lg:mt-56 flex flex-col items-center justify-evenly w-full lg:w-7/12 text-justify">
                    <p>
                        Chat with confidence and protect your privacy with
                        Paranoia, the most secure end-to-end encrypted chat
                        platform. Our cutting-edge technology ensures that your
                        conversations remain private and inaccessible to anyone
                        but you and your intended recipients. Say goodbye to
                        surveillance and data breaches, and embrace a worry-free
                        communication experience.
                    </p>
                    <Image
                        src={logoTransparentImage}
                        alt="Man messaging"
                        className="h-auto w-8/12"
                    />
                </div>
                <Screenshots />
                <Customers />
                <Features />
                <div className=" mt-20 lg:mt-52 mb-20 w-full flex flex-col items-center justify-evenly">
                    <h1 className="text-center">
                        Don't miss your chance to be secure, start chatting now.
                    </h1>
                    <Link href="/login" target="_blank">
                        <div className="rounded-full bg-gradient-to-l from-green-800 to-lime-500 w-30 h-7 p-0.5 mt-3">
                            <button className="rounded-full w-full h-full bg-gray-800 hover:bg-gradient-to-l hover:from-green-800 hover:to-lime-500 hover:text-gray-900 duration-500 px-5 flex flex-row text-xl justify-between items-center">
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
                {/* <div className="flex flex-row items-center justify-evenly w-full">
                    <Image
                        src={logoTransparentImage}
                        alt="Man messaging"
                        className="h-auto w-1/2"
                    />
                </div> */}
            </main>
            <Footer />
        </div>
    );
};

export default Home;
