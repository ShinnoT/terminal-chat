// "use client";

// import { useEffect } from "react";

// const Encryptor = () => {
//     useEffect(() => {
//         // NOTE: needs to be the same IV for both encrypt and decrypt
//         const iv = window.crypto.getRandomValues(new Uint8Array(12));

//         const generateKeyPair = async () => {
//             const keyPair = await window.crypto.subtle.generateKey(
//                 {
//                     name: "ECDH",
//                     namedCurve: "P-384",
//                 },
//                 false,
//                 ["deriveKey"]
//             );
//             return keyPair;
//         };

//         // NOTE: Derive an AES key, given:
//         // NOTE: - our ECDH private key
//         // NOTE: - their ECDH public key
//         const deriveSecretKey = ({ privateKey, publicKey }) => {
//             return window.crypto.subtle.deriveKey(
//                 {
//                     name: "ECDH",
//                     public: publicKey,
//                 },
//                 privateKey,
//                 {
//                     name: "AES-GCM",
//                     length: 256,
//                 },
//                 false,
//                 ["encrypt", "decrypt"]
//             );
//         };

//         const encodeMessage = (text) => {
//             const enc = new TextEncoder();
//             return enc.encode(text);
//         };

//         const decodeMessage = (text) => {
//             const dec = new TextDecoder();
//             return dec.decode(text);
//         };

//         //   NOTE: Encrypt the message using the secret key.
//         //   NOTE: Update the "ciphertextValue" box with a representation of part of
//         //   NOTE: the ciphertext.
//         const encrypt = async ({ secretKey, message }) => {
//             const encoded = encodeMessage(message);
//             const ciphertext = await window.crypto.subtle.encrypt(
//                 {
//                     name: "AES-GCM",
//                     iv,
//                 },
//                 secretKey,
//                 encoded
//             );

//             const buffer = new Uint8Array(ciphertext, 0, 5);
//             // console.log(`${buffer}...[${ciphertext.byteLength} bytes total]`);
//             return ciphertext;
//         };

//         //   NOTE: Decrypt the message using the secret key.
//         //   NOTE: If the ciphertext was decrypted successfully,
//         //   NOTE: update the "decryptedValue" box with the decrypted value.
//         //   NOTE: If there was an error decrypting,
//         //   NOTE: update the "decryptedValue" box with an error message.
//         const decrypt = async ({ secretKey, message }) => {
//             const decrypted = await window.crypto.subtle.decrypt(
//                 {
//                     name: "AES-GCM",
//                     iv,
//                 },
//                 secretKey,
//                 message
//             );

//             return decodeMessage(decrypted);
//         };

//         const agreeSharedSecretKey = async () => {
//             // NOTE: Generate 2 ECDH key pairs: one for Alice and one for Bob
//             // NOTE: In more normal usage, they would generate their key pairs
//             // NOTE: separately and exchange public keys securely
//             const alicesKeyPair = await generateKeyPair();
//             const bobsKeyPair = await generateKeyPair();

//             // NOTE: Alice then generates a secret key using her private key and Bob's public key.
//             const alicesSecretKey = await deriveSecretKey({
//                 privateKey: alicesKeyPair.privateKey,
//                 publicKey: bobsKeyPair.publicKey,
//             });

//             // NOTE: Bob generates the same secret key using his private key and Alice's public key.
//             const bobsSecretKey = await deriveSecretKey({
//                 privateKey: bobsKeyPair.privateKey,
//                 publicKey: alicesKeyPair.publicKey,
//             });

//             const encrypted = await encrypt({
//                 secretKey: alicesSecretKey,
//                 message: "haha secret message for you",
//             });
//             const decrypted = await decrypt({
//                 secretKey: bobsSecretKey,
//                 message: encrypted,
//             });

//             console.log("encrypted:: ", encrypted);
//             console.log("decrypted:: ", decrypted);
//         };

//         agreeSharedSecretKey();
//     }, []);

//     return;
// };

// TODO: 1 - generate private & public key pair for user on login
// TODO: 2 - save public key in backend with other user data (i.e. password)
// TODO: 3 - receive public key of other user
// TODO: 4 - using personal private key & other user's public key generate an encryption key
// TODO: 5 - use AES for encryption using encryption key from step 5

// NOTE: internal helper functions
const encodeMessage = (text) => {
    const enc = new TextEncoder();
    return enc.encode(text);
};

const decodeMessage = (text) => {
    const dec = new TextDecoder();
    return dec.decode(text);
};

// NOTE: external helper functions

/**
 * Generates and returns a unique encryption / decryption IV
 * @returns {Uint8Array} an encryption / decryption IV
 */
const generateIV = () => window.crypto.getRandomValues(new Uint8Array(12));

/**
 * Generates and returns a unique ECDH private + public key pair
 * @returns {Promise<CryptoKeyPair>} a CryptoKeyPair
 */
const generateKeyPair = async () => {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "ECDH",
            namedCurve: "P-384",
        },
        true,
        ["deriveKey"]
    );
    return keyPair;
};

/**
 * Exports a CryptoKey
 * @param {CryptoKey} key - the public key to convert to an exportable format
 * @returns {Promise<ArrayBuffer>} a CryptoKey
 */
const generateExportableKey = async (key) => {
    const exportableKey = await window.crypto.subtle.exportKey("jwk", key);
    return exportableKey;
};

/**
 * Imports a CryptoKey
 * @param {ArrayBuffer} key - the public key to convert to an exportable format
 * @returns {Promise<CryptoKey>} a CryptoKey
 */
const importKey = async (key) => {
    const importedKey = await window.crypto.subtle.importKey(
        "jwk",
        key,
        {
            name: "ECDH",
            namedCurve: "P-384",
        },
        false,
        []
    );
    return importedKey;
};

/**
 * Derives an AES secret encryption key from our ECDH private key + their ECDH public key
 * @param {CryptoKeyPair.privateKey<CryptoKey>} privateKey - our personal ECDH private key
 * @param {CryptoKeyPair.publicKey<CryptoKey>} publicKey - their ECDH public key
 * @returns {Promise<CryptoKey>} a AES secret key for use in encryption / decryption
 */
const deriveSecretKey = ({ privateKey, publicKey }) => {
    // NOTE: Derive an AES key, given:
    // NOTE: - our ECDH private key
    // NOTE: - their ECDH public key
    return window.crypto.subtle.deriveKey(
        {
            name: "ECDH",
            public: publicKey,
        },
        privateKey,
        {
            name: "AES-GCM",
            length: 256,
        },
        false,
        ["encrypt", "decrypt"]
    );
};

/**
 * Encrypts string messages using ECDH secret key + IV
 * @param {CryptoKey} secretKey - AES secret key generated with ECDH
 * @param {Uint8Array} iv - unique encryption / decryption IV for randomization
 * @param {string} message - string to be encrypted
 * @returns {Promise<ArrayBuffer>} encrypted ArrayBuffer message
 */
const encrypt = async ({ secretKey, iv, message }) => {
    //   NOTE: Encrypt the message using the secret key.
    //   NOTE: Update the "ciphertextValue" box with a representation of part of
    //   NOTE: the ciphertext.
    const encoded = encodeMessage(message);
    const ciphertext = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv,
        },
        secretKey,
        encoded
    );

    const buffer = new Uint8Array(ciphertext, 0, 5);
    // console.log(`${buffer}...[${ciphertext.byteLength} bytes total]`);
    return ciphertext;
};

/**
 * Decrypts string messages using ECDH secret key + IV
 * @param {CryptoKey} secretKey - AES secret key generated with ECDH
 * @param {Uint8Array} iv - unique encryption / decryption IV for randomization (must be the same used for encryption)
 * @param {ArrayBuffer} message - encrypted message to be decrypted
 * @returns {Promise<string>} encrypted string message
 */
const decrypt = async ({ secretKey, iv, message }) => {
    //   NOTE: Decrypt the message using the secret key.
    //   NOTE: If the ciphertext was decrypted successfully,
    //   NOTE: update the "decryptedValue" box with the decrypted value.
    //   NOTE: If there was an error decrypting,
    //   NOTE: update the "decryptedValue" box with an error message.
    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv,
        },
        secretKey,
        message
    );

    return decodeMessage(decrypted);
};

export {
    generateIV,
    generateKeyPair,
    generateExportableKey,
    importKey,
    deriveSecretKey,
    encrypt,
    decrypt,
};
