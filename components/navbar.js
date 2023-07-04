import Link from "next/link";
import Image from "next/image";
import logoImage from "@/public/logo.png";
import logoTransparentImage from "@/public/logo_transparent.png";

const Navbar = () => {
    const hoverLinks = "hover:text-green-500 duration-500";
    return (
        <nav className="sticky top-0 z-10 bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/">
                        <h1 className="text-center text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-lime-500">
                            _Paranoia/
                        </h1>
                    </Link>
                    <div className="flex space-x-4">
                        <Link
                            className={hoverLinks}
                            href="/chat"
                            target="_blank"
                        >
                            /chat
                        </Link>
                        <a className={hoverLinks} href="#" target="_blank">
                            /creator_portfolio
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
