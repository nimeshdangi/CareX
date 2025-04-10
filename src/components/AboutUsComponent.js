"use client"
import Image from "next/image";
import useInView from "../utils/useInView";

const AboutUsComponent = () => {
    const [whyChooseUsRef, whyChooseUsInView] = useInView();
    const [ourValuesRef, ourValuesInView] = useInView();
    const [howItWorksRef, howItWorksInView] = useInView();
    const [testimonialRef, testimonialInView] = useInView();

    return (
        <>
            <Image
                src={"/logo.png"}
                alt="logo"
                width={1000}
                height={1000}
                className="w-1/3 mx-auto my-4 animate-slideDown"
            />
            <div className="container mx-auto px-6 py-4">
                <h1 className="text-3xl text-center animate-slideDown">About Us</h1>
                <p className="text-center animate-slideUp">Connecting Patients with Healthcare Professionals Seamlessly</p>
            </div>
            <div className="container mx-auto px-32 py-4">
                <h1 className="text-3xl text-center animate-slideDown">Our Mission</h1>
                {/* <div className="animate-slideUp"> */}
                    <Image
                        src="/mission.svg"
                        alt="mission"
                        width={1000}
                        height={1000}
                        className="w-32 mx-auto my-4 animate-slideUp"
                    />
                {/* </div> */}
                <p className="text-center animate-slideUp">
                    Our mission is to improve access to mental health care and specialized support for autism and other conditions by using technology to connect patients with expert healthcare providers. We believe that everyone deserves timely and compassionate healthcare, no matter where they are or what challenges they face.
                </p>
            </div>
            <div className="container mx-auto px-16 py-4">
                <h1 className="text-3xl text-center animate-slideRight">What We Do</h1>
                <p className="text-center animate-slideLeft">
                    CareX provides a seamless, easy-to-use platform where patients can book virtual appointments with qualified doctors and therapists. We focus on areas where in-person visits might not be necessary, but professional guidance and regular check-ins are crucial, such as mental health counseling, autism support, and more. With CareX, receiving care is just a few clicks away.
                </p>
            </div>
            <div className="container mx-auto px-16 py-4 overflow-hidden" ref={whyChooseUsRef}>
                <h1 className={`text-3xl text-center ${whyChooseUsInView ? "animate-slideRight" : "opacity-0"}`}>Why Choose Us?</h1>
                <p className={`text-center ${whyChooseUsInView ? "animate-slideLeft" : "opacity-0"}`}>
                    CareX is more than an appointment platform; it&apos;s a partner in your health journey. We understand the complexities of mental health and autism care, and we&apos;ve designed CareX with compassion and security at its core. Here&apos;s why people choose us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
                    <div className={`flex flex-col items-center justify-center bg-blue-100 rounded-xl px-4 py-6 ${whyChooseUsInView ? "animate-slideUp" : "opacity-0"}`}>
                        <h2 className="text-2xl text-center">Specialized Support</h2>
                        <Image
                            src="/support.svg"
                            alt="support"
                            width={1000}
                            height={1000}
                            className="w-32 mx-auto my-4"
                        />
                        <p className="text-center">We connect you with doctors who specialize in mental health, autism, and similar conditions.</p>
                    </div>
                    <div className={`flex flex-col items-center justify-center bg-blue-100 rounded-xl px-4 py-6 ${whyChooseUsInView ? "animate-slideDown" : "opacity-0"}`}>
                        <h2 className="text-2xl text-center">Convenience</h2>
                        <Image
                            src="/convenience.svg"
                            alt="convenience"
                            width={1000}
                            height={1000}
                            className="w-32 mx-auto my-4"
                        />
                        <p className="text-center">Schedule appointments that fit your schedule and access care from the comfort of your home.</p>
                    </div>
                    <div className={`flex flex-col items-center justify-center bg-blue-100 rounded-xl px-4 py-6 ${whyChooseUsInView ? "animate-slideUp" : "opacity-0"}`}>
                        <h2 className="text-2xl text-center">Confidentiality</h2>
                        <Image
                            src="/confidential.svg"
                            alt="confidential"
                            width={1000}
                            height={1000}
                            className="w-32 mx-auto my-4"
                        />
                        <p className="text-center">Your privacy and security are our top priorities. We use secure video call technology to ensure safe and private consultations.</p>
                    </div>
                    <div className={`flex flex-col items-center justify-center bg-blue-100 rounded-xl px-4 py-6 ${whyChooseUsInView ? "animate-slideDown" : "opacity-0"}`}>
                        <h2 className="text-2xl text-center">Empathy and Understanding</h2>
                        <Image
                            src="/empathy.svg"
                            alt="empathy"
                            width={1000}
                            height={1000}
                            className="w-32 mx-auto my-4"
                        />
                        <p className="text-center">CareX was created with empathy for those seeking support for mental health and developmental conditions, and we work with healthcare providers who share that commitment.</p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-16 py-4 overflow-hidden" ref={ourValuesRef}>
                <h1 className={`text-3xl text-center ${ourValuesInView ? "animate-slideDown" : "opacity-0"}`}>Our Values</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
                    <div className={`flex flex-col items-center justify-center bg-slate-100 rounded-xl px-4 py-6 ${ourValuesInView ? "animate-slideDown" : "opacity-0"}`}>
                        <h2 className="text-2xl text-center">Accessibility</h2>
                        <Image
                            src="/accessibility.svg"
                            alt="accessibility"
                            width={1000}
                            height={1000}
                            className="w-32 mx-auto my-4"
                        />
                        <p className="text-center">We&apos;re dedicated to making care reachable and affordable for all.</p>
                    </div>
                    <div className={`flex flex-col items-center justify-center bg-slate-100 rounded-xl px-4 py-6 ${ourValuesInView ? "animate-slideUp" : "opacity-0"}`}>
                        <h2 className="text-2xl text-center">Innovation</h2>
                        <Image
                            src="/innovation.svg"
                            alt="innovation"
                            width={1000}
                            height={1000}
                            className="w-32 mx-auto my-4"
                        />
                        <p className="text-center">Our team uses the latest technology to connect patients with the care they need in new and effective ways.</p>
                    </div>
                    <div className={`flex flex-col items-center justify-center bg-slate-100 rounded-xl px-4 py-6 ${ourValuesInView ? "animate-slideDown" : "opacity-0"}`}>
                        <h2 className="text-2xl text-center">Empathy</h2>
                        <Image
                            src="/empathy.svg"
                            alt="empathy"
                            width={1000}
                            height={1000}
                            className="w-32 mx-auto my-4"
                        />
                        <p className="text-center">Understanding each patient&apos;s unique situation and providing compassionate care is at the heart of what we do.</p>
                    </div>
                    <div className={`flex flex-col items-center justify-center bg-slate-100 rounded-xl px-4 py-6 ${ourValuesInView ? "animate-slideUp" : "opacity-0"}`}>
                        <h2 className="text-2xl text-center">Integrity</h2>
                        <Image
                            src="/integrity.svg"
                            alt="integrity"
                            width={1000}
                            height={1000}
                            className="w-32 mx-auto my-4"
                        />
                        <p className="text-center">We value honesty, transparency, and reliability in all aspects of our platform and interactions.</p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-16 py-4 overflow-hidden" ref={howItWorksRef}>
                <h1 className={`text-3xl text-center ${howItWorksInView ? "animate-slideRight" : "opacity-0"}`}>How It Works</h1>
                <p className={`text-center ${howItWorksInView ? "animate-slideLeft" : "opacity-0"}`}>
                    Getting started with CareX is simple:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
                    <div className={`flex flex-col items-center justify-center bg-gray-100 rounded-xl px-4 py-6 ${howItWorksInView ? "animate-slideUp" : "opacity-0"}`}>
                        <h2 className="text-2xl text-center">Sign Up</h2>
                        <Image
                            src="/sign-up.svg"
                            alt="Sign Up"
                            width={1000}
                            height={1000}
                            className="w-32 mx-auto my-4"
                        />
                        <p className="text-center">Create an account on our secure platform.</p>
                    </div>
                    <div className={`flex flex-col items-center justify-center bg-gray-100 rounded-xl px-4 py-6 ${howItWorksInView ? "animate-slideDown" : "opacity-0"}`}>
                        <h2 className="text-2xl text-center">Browse Specialists</h2>
                        <Image
                            src="/browse.svg"
                            alt="browse"
                            width={1000}
                            height={1000}
                            className="w-32 mx-auto my-4"
                        />
                        <p className="text-center">View profiles of healthcare providers specializing in mental health and autism care.</p>
                    </div>
                    <div className={`flex flex-col items-center justify-center bg-gray-100 rounded-xl px-4 py-6 ${howItWorksInView ? "animate-slideUp" : "opacity-0"}`}>
                        <h2 className="text-2xl text-center">Book an Appointment</h2>
                        <Image
                            src="/book.svg"
                            alt="book"
                            width={1000}
                            height={1000}
                            className="w-32 mx-auto my-4"
                        />
                        <p className="text-center">Choose a time slot that works for you.</p>
                    </div>
                    <div className={`flex flex-col items-center justify-center bg-gray-100 rounded-xl px-4 py-6 ${howItWorksInView ? "animate-slideDown" : "opacity-0"}`}>
                        <h2 className="text-2xl text-center">Join the Video Call</h2>
                        <Image
                            src="/video-call.svg"
                            alt="video-call"
                            width={1000}
                            height={1000}
                            className="w-32 mx-auto my-4"
                        />
                        <p className="text-center">Receive expert care from the comfort and privacy of your own home.</p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-16 py-4 overflow-hidden" ref={testimonialRef}>
                <h1 className={`text-3xl text-center ${testimonialInView ? "animate-slideDown" : "opacity-0"}`}>Testimonials</h1>
                {/* <p className="text-center">
                    Getting started with CareX is simple:
                </p> */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2">
                    <div className={`bg-neutral-200 rounded-xl px-7 pb-3 pt-5 ${testimonialInView ? "animate-slideRight" : "opacity-0"}`}>
                        <p className="text-left italic">
                            "CareX has been a lifeline for me during tough times. I can schedule appointments around my busy schedule and get the mental health support I need from a dedicated professional."
                        </p>
                        <p className="text-right flex items-center justify-end space-x-4">
                            <span>— Nirvana Bhattarai, CareX User</span>
                            <Image
                                src="/doctor.jpg"
                                width={100}
                                height={100}
                                alt="Doctor"
                                className="w-10 h-10 rounded-full"
                            />
                        </p>
                    </div>
                    <div className={`bg-neutral-200 rounded-xl px-7 pb-3 pt-5 ${testimonialInView ? "animate-slideLeft" : "opacity-0"}`} >
                        <p className="text-left italic">
                            "As a specialist, CareX allows me to connect with patients who may not have the means to access in-person care. The platform is simple and effective, enabling me to focus on what matters: helping my patients."
                        </p>
                        <p className="text-right flex items-center justify-end space-x-4">
                            <span>— Dr. Anu Neupane, CareX Specialist</span>
                            <Image
                                src="/doctor.jpg"
                                width={100}
                                height={100}
                                alt="Doctor"
                                className="w-10 h-10 rounded-full"
                            />
                        </p>
                    </div>
                </div>
            </div>
            <p className="py-7 px-32 text-center">We&apos;re here to provide the support and resources you need, whenever you need them. Join us on this journey towards better, more accessible healthcare with CareX.</p>
        </>
    );
}

export default AboutUsComponent;