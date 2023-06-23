"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useAuthState } from "./authentication";
import Loader from "@/components/loader";

const PrivateRoute = ({ protectedRoutes, children }) => {
    const router = useRouter();
    const pathName = usePathname();
    const { authenticated, loading } = useAuthState();

    const pathIsProtected = !!protectedRoutes.find((e) => e === pathName);

    useEffect(() => {
        if (!loading && !authenticated && pathIsProtected) {
            // Redirect route, you can point this to /login
            console.log("redirecting home");
            router.push("/");
        }
    }, [loading, authenticated, pathIsProtected]);

    if ((loading || !authenticated) && pathIsProtected) {
        return <Loader />;
    }

    return children;
};

export default PrivateRoute;
