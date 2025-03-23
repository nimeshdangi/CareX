import Image from "next/image";
import Link from "next/link";

const Login = () => {
    return (
        <div className="flex">
            <div className="w-1/2">
                <div className="flex items-center h-full">
                    <div className="my-auto px-16 w-full">
                        <h1 className="text-3xl mb-8">Login</h1>
                        <label htmlFor="email">Email</label>
                        <input
                            className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                            type="text"
                            placeholder="Jane Doe"
                            aria-label="Full name"
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 mt-3 py-3 px-3 leading-tight focus:outline-none"
                            type="password"
                            placeholder="Password"
                            aria-label="Full name"
                        />
                        <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">It must be a combination of minimum 8 letters, numbers, and symbols.</p>
                        <div className="flex justify-between my-4">
                            <div class="flex items-center">
                                <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="default-checkbox" class="ms-2 mt-1 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
                            </div>
                            <p className="text-blue-900 text-sm mt-1">Forgot Password?</p>
                        </div>
                        <button
                            className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Login
                        </button>
                        <p className="mt-2 text-sm"><Link href={"/register"}>No Account Yet? Sign Up</Link></p>
                    </div>
                </div>
            </div>
            <div className="w-1/2">
                <Image
                    src="/login.webp"
                    alt="Login image"
                    width={1000}
                    height={1000}
                    priority
                    className="object-cover w-full h-screen"
                />
            </div>
        </div>
    );
}

export default Login;