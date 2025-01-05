import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';


const ContactPage = () => {
    return (
        <div className="mt-9 flex flex-col gap-9 px-5 md:px-20">
            {/* Header Section */}
            <section className="flex flex-col gap-5">
                <h1 className="text-3xl font-bold text-white text-gray-100">Contact Us</h1>
                <p className="text-base text-gray-300">
                    Have questions, feedback, or want to get in touch? We'd love to hear from you! Reach out through any of the methods below.
                </p>
            </section>

            {/* Contact Information */}
            <section className="flex flex-col gap-5">
                <h2 className="text-xl font-semibold text-white text-gray-100">Our Contact Information</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col bg-gray-800 p-5 rounded-md">
                        <h3 className="text-lg font-medium text-teal text-gray-100">Email</h3>
                        <p className="text-gray-300">podpilothelp@gmail.com.com</p>
                    </div>
                    <div className="flex flex-col bg-gray-800 p-5 rounded-md">
                        <h3 className="text-lg font-medium text-teal text-gray-100">Phone</h3>
                        <p className="text-gray-300">+1 (123) 456-7890</p>
                    </div>
                    <div className="flex flex-col bg-gray-800 p-5 rounded-md">
                        <h3 className="text-lg font-medium text-teal text-gray-100">Address</h3>
                        <p className="text-gray-300">1234 Your Street, City, Country</p>
                    </div>
                    <div className="flex flex-col bg-gray-800 p-5 rounded-md">
                        <h3 className="text-lg font-medium text-teal text-gray-100">Business Hours</h3>
                        <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p className="text-gray-300">Saturday: 10:00 AM - 2:00 PM</p>
                        <p className="text-gray-300">Sunday: Closed</p>
                    </div>
                </div>
            </section>

            {/* Contact Form
            <section className="flex flex-col gap-5">
                <h2 className="text-xl font-semibold text-white text-gray-100">Send Us a Message</h2>
                <form className="flex flex-col gap-5">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="bg-gray-900 text-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="bg-gray-900 text-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal"
                    />
                    <textarea
                        placeholder="Your Message"
                        rows={5}
                        className="bg-gray-900 text-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal"
                    />
                    <button
                        type="submit"
                        className="bg-teal text-white px-6 py-3 rounded-md bg-gray-900 hover:bg-teal-700 transition-all duration-300 text-gray-100"
                    >
                        Send Message
                    </button>
                </form>
            </section> */}

            {/* Social Media Links */}
            <section className="flex flex-col gap-5">
                <h2 className="text-xl font-semibold text-gray-100">Follow Us</h2>
                <div className="flex gap-5">
                    <a
                        href="https://facebook.com/yourpage"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-teal hover:underline text-gray-100"
                    >
                        <FaFacebook size={20} />
                        Facebook
                    </a>
                    <a
                        href="https://twitter.com/yourhandle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-teal hover:underline text-gray-100"
                    >
                        <FaTwitter size={20} />
                        Twitter
                    </a>
                    <a
                        href="https://linkedin.com/company/yourcompany"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-teal hover:underline text-gray-100"
                    >
                        <FaLinkedin size={20} />
                        LinkedIn
                    </a>
                    <a
                        href="https://instagram.com/yourhandle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-teal hover:underline text-gray-100"
                    >
                        <FaInstagram size={20} />
                        Instagram
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;