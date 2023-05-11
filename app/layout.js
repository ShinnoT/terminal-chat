import "./globals.css";
import { VT323 } from "next/font/google";

const typewriter = VT323({ weight: "400", subsets: ["latin"] });

const metadata = {
    title: "Terminal Chat",
    description: "It's time to wake up Neo...",
};

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body className={typewriter.className}>{children}</body>
        </html>
    );
};

export { RootLayout as default, metadata };
