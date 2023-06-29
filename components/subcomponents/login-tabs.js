"use client";

const LoginTabs = ({ activeTab, handleActiveTab }) => {
    const activeClass =
        "inline-block p-4 text-green-600 border-b-2 border-green-600 rounded-t-lg active dark:text-green-500 dark:border-green-500 hover:cursor-pointer";
    const inActiveClass =
        "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 hover:cursor-pointer";

    const handleTabOnClick = (tabName) => (event) => {
        event.preventDefault();
        handleActiveTab(tabName);
    };

    return (
        <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
                <li className="mx-2">
                    <p
                        onClick={handleTabOnClick("tab1")}
                        href="#"
                        className={
                            activeTab === "tab1" ? activeClass : inActiveClass
                        }
                    >
                        Create Room
                    </p>
                </li>
                <li>
                    <p
                        onClick={handleTabOnClick("tab2")}
                        href="#"
                        className={
                            activeTab === "tab2" ? activeClass : inActiveClass
                        }
                        aria-current="page"
                    >
                        Join Room
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default LoginTabs;
