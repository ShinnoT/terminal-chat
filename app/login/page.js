import LoginForm from "@/components/login";

const Page = () => {
    return (
        <main className="flex h-screen flex-col items-center justify-center p-3 md:p-12">
            <div className="w-full max-w-xs">
                <LoginForm />
                <p className="text-center text-gray-500 text-xs">
                    &copy;{new Date().getFullYear()} Terminal Chat. All rights
                    reserved.
                </p>
            </div>
        </main>
    );
};

export default Page;
