"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { useConnection } from "./connect";
import { useAuthState } from "./authentication";
import {
    generateKeyPair,
    deriveSecretKey,
    generateExportableKey,
    importKey,
} from "@/helpers/encryption";

const EncryptionContext = createContext({
    secretKey: null,
});

const Encryptor = ({ children }) => {
    const { connection } = useConnection();
    const { authenticated, user } = useAuthState();

    // const [roomDetails, setRoomDetails] = useState({
    //     userCount: 1,
    //     users: [user],
    // });
    const [privateKey, setPrivateKey] = useState(null);
    const [personalPublicKey, setPersonalPublicKey] = useState(null);
    const [secretKey, setSecretKey] = useState(null);

    const roomDetailsHandler = ({ userCount }) => {
        if (userCount < 2)
            connection.emit("sendMessage", {
                username: user.username,
                room_id: user.room_id,
                message:
                    "chat not encrypted - waiting for other user to connect in order to generate ECDH secrety encryption keys.",
            });
    };

    const initializeEncryption = async () => {
        console.log("encryption initialized.");
        console.log("private key in init:: ", privateKey);
        console.log("public key in init:: ", personalPublicKey);
        const exportableKey = await generateExportableKey(personalPublicKey);

        // sessionStorage.setItem("privateKey", keyPair.privateKey);
        // setPrivateKey(keyPair.privateKey)
        connection.emit("publicKey", { publicKey: exportableKey });
    };

    const finalizeEncryption = async ({ publicKey }) => {
        console.log("encryption finalization begin.");
        const importedPublicKey = await importKey(publicKey);
        console.log("private key in final:: ", privateKey);
        console.log("public key in final:: ", importedPublicKey);
        const secretKey = await deriveSecretKey({
            privateKey,
            publicKey: importedPublicKey,
        });
        setSecretKey(secretKey);
        console.log("SECRET AES KEY GENERATED!:: ", secretKey);
        connection.emit("sendMessage", {
            username: user.username,
            room_id: user.room_id,
            message:
                "public keys exchanged - end-to-end encryption initialized.",
        });
    };

    useEffect(() => {
        if (connection) {
            if (authenticated) {
                // TODO: check how many people in connected room
                // TODO: if only 1 (a.k.a creator), then display "chat not encrypted - waiting for other user"
                // TODO: if more than 1, setup ECDH
                const getKeyPair = async () => {
                    const keyPair = await generateKeyPair();
                    setPrivateKey(keyPair.privateKey) ||
                        setPersonalPublicKey(keyPair.publicKey);
                };
                if (!privateKey || !personalPublicKey) getKeyPair();

                if (privateKey && personalPublicKey) {
                    connection.emit("fetchRoomDetails");
                    connection.on("roomDetails", roomDetailsHandler);
                    connection.on("initializeEncryption", initializeEncryption);
                    connection.on("finalizeEncryption", finalizeEncryption);
                }
            }
        }

        return () => {
            // TODO: disconnect event listeners
            connection.off("roomDetails", roomDetailsHandler);
            connection.off("initializeEncryption", initializeEncryption);
            connection.off("finalizeEncryption", finalizeEncryption);
        };
    }, [connection, privateKey, personalPublicKey]);

    return (
        <EncryptionContext.Provider value={secretKey}>
            {children}
        </EncryptionContext.Provider>
    );
};

const useEncryptionKey = () => useContext(EncryptionContext);

export { Encryptor as default, useEncryptionKey };
