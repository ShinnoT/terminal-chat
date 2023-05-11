import Link from "next/link";

const NotFound = () => {
    return (
        <main className="flex h-screen flex-col items-center justify-center p-3 md:p-12">
            <h1 className="text-2xl mb-6">
                The page you are looking for does not exist. It&apos;s time to
                wake up Neo...
            </h1>
            <Link
                className="bg-transparent text-xl hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                href="/"
            >
                Back to the Matrix
            </Link>
        </main>
    );
};

export default NotFound;
