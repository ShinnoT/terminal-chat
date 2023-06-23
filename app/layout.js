import "./globals.css";
import { VT323 } from "next/font/google";

import ConnectionProvider from "@/context/connect";
import AuthProvider from "@/context/authentication";
import PrivateRoute from "@/context/private-route";

// import "supports-color";

const typewriter = VT323({ weight: "400", subsets: ["latin"] });

const metadata = {
    title: "Paranoia",
    description: "The only chat that keeps your secrets safe.",
};

const RootLayout = ({ children }) => {
    const protectedRoutes = ["/chat"];

    return (
        <html lang="en">
            <body className={typewriter.className}>
                <ConnectionProvider>
                    <AuthProvider>
                        <PrivateRoute protectedRoutes={protectedRoutes}>
                            {children}
                        </PrivateRoute>
                    </AuthProvider>
                </ConnectionProvider>
            </body>
        </html>
    );
};

export { RootLayout as default, metadata };
