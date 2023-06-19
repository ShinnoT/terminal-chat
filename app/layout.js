import "./globals.css";
import { VT323 } from "next/font/google";
import { Provider as ConnectionProvider } from "@/context/connect";

// import "supports-color";

const typewriter = VT323({ weight: "400", subsets: ["latin"] });

const metadata = {
    title: "Paranoia",
    description: "The only chat that keeps your secrets safe.",
};

const RootLayout = ({ children }) => {
    return (
        <ConnectionProvider>
            <html lang="en">
                <body className={typewriter.className}>{children}</body>
            </html>
        </ConnectionProvider>
    );
};

export { RootLayout as default, metadata };
