"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useConnection } from "./connect";

const StateContext = createContext({
    authenticated: false,
    user: null,
    loading: true,
});

const DispatchContext = createContext(null);

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "LOGIN":
            return {
                ...state,
                authenticated: true,
                user: payload,
            };
        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                ...state,
                authenticated: false,
                user: null,
            };
        case "POPULATE":
            return {
                ...state,
                user: {
                    ...state.user,
                    ...payload,
                },
            };
        case "STOP_LOADING":
            return {
                ...state,
                loading: false,
            };
        case "START_LOADING":
            return {
                ...state,
                loading: true,
            };
        default:
            throw new Error(`Unknown action type: ${type}`);
    }
};

const AuthProvider = ({ children }) => {
    const { connection } = useConnection();
    const pathName = usePathname();
    const router = useRouter();

    const [state, defaultDispatch] = useReducer(reducer, {
        user: null,
        authenticated: false,
        loading: true,
    });

    const dispatch = (type, payload) =>
        console.log(`${type} dispatch called.`) ||
        defaultDispatch({ type, payload });

    useEffect(() => {
        if (connection) {
            try {
                const loginHandler = (data) => {
                    console.log(
                        "running login event handler in AuthenticationContext."
                    );
                    const { success } = data;
                    if (success) {
                        // NOTE: 0.5s delay so user can see check marks on login form
                        // NOTE: `router.push("/chat")` logic used to be in login form
                        setTimeout(() => {
                            dispatch("LOGIN", data?.user);
                            router.push("/chat");
                        }, 500);
                    }
                };

                connection.on("login", loginHandler);

                return () => {
                    connection.off("login", loginHandler);
                };
            } catch (err) {
                console.log(err);
            } finally {
                dispatch("STOP_LOADING");
            }
        }
    }, [connection]);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};

const useAuthState = () => useContext(StateContext);
const useAuthDispatch = () => useContext(DispatchContext);

export { useAuthState, useAuthDispatch, AuthProvider as default };
