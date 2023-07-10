// ====================================================================
// import { AES, enc } from "crypto-js";

// // TODO: change this to fetch from process.env
// const ENCRYPTION_KEY = "@HIUHD3IH4IU5H291";

// const encryptMessage = (message) => {
//     return AES.encrypt(message, ENCRYPTION_KEY).toString();
// };

// const decryptMessage = (message) => {
//     const bytes = AES.decrypt(message, ENCRYPTION_KEY);
//     return bytes.toString(enc.Utf8);
// };

// export { encryptMessage, decryptMessage };

// ====================================================================
// const {
//     generateIdentityKeyPair,
//     generateRegistrationId,
//     generatePreKey,
//     generateSignedPreKey,
// } = libsignal?.KeyHelper;

// const generateIdentity = async ({ store }) => {
//     try {
//         const identityKey = await generateIdentityKeyPair();
//         const registrationId = await generateRegistrationId();
//         store.put("identityKey", identityKey);
//         store.put("registrationId", registrationId);
//     } catch (error) {
//         console.error(error.message);
//     }
// };

// const generatePreKeyBundle = async ({ store, preKeyId, signedPreKeyId }) => {
//     try {
//         const identity = await store.getIdentityKeyPair();
//         const registrationId = await store.getLocalRegistrationId();
//         const preKey = await generatePreKey(registrationId + 1);
//         const signedPreKey = await generateSignedPreKey(
//             identity,
//             registrationId + 1
//         );

//         store.storePreKey(preKey.keyId, preKey.keyPair);
//         store.storeSignedPreKey(signedPreKey.keyId, signedPreKey.keyPair);

//         return {
//             identityKey: identity.pubKey,
//             registrationId,
//             preKey: {
//                 keyId: preKey.keyId,
//                 publicKey: preKey.keyPair.pubKey,
//             },
//             signedPreKey: {
//                 keyId: signedPreKey.keyId,
//                 publicKey: signedPreKey.keyPair.pubKey,
//                 signature: signedPreKey.signature,
//             },
//         };
//     } catch (error) {
//         console.error(error.message);
//     }
// };

// const ALICE_ADDRESS = new libsignal.SignalProtocolAddress("xxxxxxxxx", 1);
// const BOB_ADDRESS = new libsignal.SignalProtocolAddress("yyyyyyyyyyyyy", 1);

// const aliceStore = new libsignal.SignalProtocolStore();
// const bobStore = new libsignal.SignalProtocolStore();

// const bobPreKeyId = 1337;
// const bobSignedKeyId = 1;

// const Curve = libsignal.Curve;

// Promise.all([generateIdentity(aliceStore), generateIdentity(bobStore)])
//     .then(function () {
//         return generatePreKeyBundle(bobStore, bobPreKeyId, bobSignedKeyId);
//     })
//     .then(function (preKeyBundle) {
//         const builder = new libsignal.SessionBuilder(aliceStore, BOB_ADDRESS);
//         return builder.processPreKey(preKeyBundle).then(function () {
//             const originalMessage = util.toArrayBuffer("my message ......");
//             const aliceSessionCipher = new libsignal.SessionCipher(
//                 aliceStore,
//                 BOB_ADDRESS
//             );
//             const bobSessionCipher = new libsignal.SessionCipher(
//                 bobStore,
//                 ALICE_ADDRESS
//             );

//             aliceSessionCipher
//                 .encrypt(originalMessage)
//                 .then(function (ciphertext) {
//                     // check for ciphertext.type to be 3 which includes the PREKEY_BUNDLE
//                     return bobSessionCipher.decryptPreKeyWhisperMessage(
//                         ciphertext.body,
//                         "binary"
//                     );
//                 })
//                 .then(function (plaintext) {
//                     alert(plaintext);
//                 });

//             bobSessionCipher
//                 .encrypt(originalMessage)
//                 .then(function (ciphertext) {
//                     return aliceSessionCipher.decryptWhisperMessage(
//                         ciphertext.body,
//                         "binary"
//                     );
//                 })
//                 .then(function (plaintext) {
//                     assertEqualArrayBuffers(plaintext, originalMessage);
//                 });
//         });
//     });
