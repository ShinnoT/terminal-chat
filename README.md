# Paranoia

<p align="center">
  <strong>Paranoia is a web-based, end-to-end encrypted, database-less, anonymous chat application.</strong>
</p>

<p align="center">
  
</p>

<div align="center" style="margin-bottom:10px;margin-top:10px;">
    <img src="https://img.shields.io/badge/Made%20with-Next.js-black" />
    <img src="https://img.shields.io/badge/Powered%20by-Socket.io-purple" />
    <img src="https://img.shields.io/badge/Styled%20with-Tailwindcss-orange" />
</div>

![Paranoia-card](https://github.com/ShinnoT/portfoliov1/assets/26269548/3ce971aa-2f7a-4fb5-97cf-88e868bcfb75)

---

## Features 🔐

-   **End-to-End Encryption** - Using Elliptical Curve Diffie Hellman (ECDH) encryption, your messages are secure from the moment they're sent to the moment they're received.
-   **Database-less** - With no central database, your conversations aren't stored. Once they're gone, they're gone for good.
-   **Anonymous** - No sign-ups, no log-ins, no personal information. Just start chatting.
-   **Beautiful UI** - Thanks to TailwindCSS, Paranoia provides an intuitive, clean, and visually appealing user experience.

---

## Quick Start 🚀

### Prerequisites

-   Node.js >= 12.x
-   npm >= 6.x

### Installation

1. Clone the repository
    ```sh
    git clone https://github.com/ShinnoT/terminal-chat.git
    ```
2. Navigate to the project directory
    ```sh
    cd terminal-chat
    ```
3. Install the dependencies
    ```sh
    npm install
    ```
4. Start the development server
    ```sh
    npm run dev
    ```

Visit `http://localhost:3000` to start using Paranoia locally!

---

## How It Works ⚙️

At its core, Paranoia uses the power of Next.js, tailwindcss, and Socket.io to deliver an unparalleled chatting experience.

1. **Next.js** - A versatile framework that helps us manage the server-side rendering and generate static websites for each new chat room.
2. **TailwindCSS** - A utility-first CSS framework packed with classes such as `flex`, `pt-4`, `text-center` and `rotate-90` that can be composed to build any design, directly in your markup.
3. **Socket.io** - Enables real-time, bidirectional and event-based communication between the browser and the server. It consists of:
    - A Node.js (in my case Express.js) [server](https://github.com/ShinnoT/terminal-chat-backend)
    - A JavaScript client library for the browser (which can be also run from Node.js)

All messages are encrypted and decrypted using the Elliptic-curve Diffie–Hellman (ECDH) key agreement protocol. This ensures that even if someone is able to intercept the messages, they won't be able to decipher them without the key.

---

## Support 💖

If you like this project, please consider giving it a ⭐ on [Github](https://github.com/ShinnoT/terminal-chat)!

---

## License 📄

This project is licensed under the MIT License.
