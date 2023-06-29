"use client";

import { useState } from "react";
import LoginTabs from "./subcomponents/login-tabs";
import JoinRoom from "./subcomponents/join-room";
import CreateRoom from "./subcomponents/create-room";

const LoginForm = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    const handleActiveTab = (tabName) => setActiveTab(tabName);

    return (
        <>
            <LoginTabs
                activeTab={activeTab}
                handleActiveTab={handleActiveTab}
            />
            {activeTab === "tab1" ? <CreateRoom /> : <JoinRoom />}
        </>
    );
};

export default LoginForm;
