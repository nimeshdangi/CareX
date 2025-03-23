import SideBar from "@/components/sidebar"
import Image from "next/image"

const ContactUs = () => {
    return (
        <SideBar>
            <div className="relative w-full h-screen">
                {/* Background Image Container */}
                <div className="relative w-full h-1/2">
                    <Image
                    src="/register.jpeg"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className="z-0"
                    priority
                    />
                </div>

                {/* Centered Content */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full">
                    {/* Content */}
                    <h1 className="text-4xl font-bold mb-2">Get in Touch</h1>
                    <p className="mb-8">Get in touch with us for your health related questions</p>
                    <div className="flex text-left gap-5">
                        <div className="flex-1">
                        <label htmlFor="first-name">First Name</label>
                        <input
                            className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                            type="text"
                            placeholder="Jane"
                            aria-label="First name"
                        />
                        </div>
                        <div className="flex-1">
                        <label htmlFor="last-name">Last Name</label>
                        <input
                            className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                            type="text"
                            placeholder="Doe"
                            aria-label="Last name"
                        />
                        </div>
                    </div>
                    <label htmlFor="email">Email</label>
                    <input
                        className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                        type="text"
                        placeholder="jane.doe@example.com"
                        aria-label="Email"
                    />
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Phone Number"
                    />
                    <label htmlFor="phone">Message</label>
                    <textarea
                        rows={3}
                        className="bg-gray-100 border-b border-gray-600 w-full text-gray-700 my-3 py-3 px-3 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Your Message for us"
                    />
                    <button
                        className="bg-blue-600 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Contact Us
                    </button>
                    {/* <p className="mt-2 text-sm text-center">Already have an account?</p> */}
                    </div>
                </div>
            </div>
        </SideBar>
    )
}

export default ContactUs