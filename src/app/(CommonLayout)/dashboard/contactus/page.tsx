/* eslint-disable prettier/prettier */
import Image from 'next/image';
import contactBg from '../../../../assests/about1.jpg';
import { Input } from '@nextui-org/input';




import { FaFacebookF, FaEnvelope, FaPhone } from 'react-icons/fa'; // Import icons from react-icons
import { MdLocationPin } from 'react-icons/md';

const ContactUs = () => {
    return (
        <div className="relative min-h-screen bg-gray-100 flex justify-center items-center overflow-hidden font-Peyda">
       
            <div className="absolute inset-0 z-0">
                <Image
                    src={contactBg}
                    alt="Contact Background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-30"
                />
            </div>

            <div className="relative z-10 p-6 max-w-lg w-full bg-transparent flex flex-col justify-center h-full">
                <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Contact Us</h1>
                <p className="text-gray-600 text-center mb-4">
                    We would love to hear from you! Please fill out the form below, and we will get back to you as soon as possible.
                </p>

                <form className="space-y-5 flex-grow">
                  
                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-1">
                            Your Name
                        </label>
                        <Input variant='underlined' size='sm'  />
                    </div>

                   
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-1">
                            Your Email
                        </label>
                        <Input variant='underlined' size='sm'  />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-1">
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            rows={3}
                            className="w-full p-2 border-b border-gray-400 py-1 focus:outline-none focus:border-blue-500"
                            placeholder="Write your message"
                       />
                    </div>

                    
                    <div className="text-center">
                        <button
                           
                            className="bg-[#8B4513] text-white py-2 px-6 rounded-lg shadow-lg hover:bg-[#A0522D] focus:outline-none transition-transform transform hover:scale-105"
                        >
                            Send Message
                        </button>
                    </div>
                </form>

                {/* Support Information */}
                <div className="mt-4 text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Support Information</h2>
                    <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mt-2">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md mb-1">
                                <FaPhone className="text-gray-600" />
                            </div>
                            <p className="text-gray-600">+1 234 567 890</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md mb-1">
                                <FaEnvelope className="text-gray-600" />
                            </div>
                            <p className="text-gray-600">support@example.com</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md mb-1">
                                <MdLocationPin className="text-gray-600" />
                            </div>
                            <p className="text-gray-600">32 ST Road, Dhaka</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;