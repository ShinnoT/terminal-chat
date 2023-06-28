"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useAuthState } from "./authentication";
import Loader from "@/components/loader";

const ProtectedRoute = ({ protectedRoutes, rerouteRoutes, children }) => {
    const router = useRouter();
    const pathName = usePathname();
    const { authenticated, loading } = useAuthState();

    const pathIsProtected = !!protectedRoutes.find((e) => e === pathName);
    const pathShouldRouteToChat = !!rerouteRoutes.find((e) => e === pathName);

    const protectedConditional = (loading || !authenticated) && pathIsProtected;
    const chatRerouteConditional =
        (loading || authenticated) && pathShouldRouteToChat;

    useEffect(() => {
        if (!loading && !authenticated && pathIsProtected) {
            // Redirect route if NOT logged in
            console.log("redirecting to login");
            router.push("/login");
        }

        if (!loading && authenticated && pathShouldRouteToChat) {
            // Redirect route if logged in
            setTimeout(() => {
                console.log("redirecting to chat");
                router.push("/chat");
            }, 1000);
        }
    }, [loading, authenticated, pathIsProtected, pathShouldRouteToChat]);

    return protectedConditional || chatRerouteConditional ? (
        <Loader />
    ) : (
        children
    );
};

export default ProtectedRoute;
