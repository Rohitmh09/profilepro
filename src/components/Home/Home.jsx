import { Link } from "react-router-dom";
import contactIcon from '../icons/address-book-regular.svg';
import personImg from '../images/person1.jpeg';
import personImg2 from '../images/person2.jpeg';

export default function Home() {
    return (
        <div className=" mx-auto w-full max-w-7xl">
            {/* Hero Section */}
            <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-4 sm:py-16 py-10 shadow-lg bg-gradient-to-r from-blue-50 to-white">
                <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-8">
                        <div className="max-w-xl space-y-8 text-center sm:text-left sm:flex-1">
                            <h2 className="text-5xl font-extrabold sm:text-6xl leading-tight text-blue-900">
                                Organize Your Network
                            </h2>
                            <p className="text-lg sm:text-xl text-gray-700">
                                Keep all your essential contact details in one place. Manage phone numbers, 
                                emails, addresses, and more with ease.
                                <span className="block mt-4">
                                    Efficient tools designed for handling large volumes of contacts effortlessly.
                                </span>
                            </p>
                            <Link
                                className="inline-flex items-center px-6 py-3 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 shadow-lg"
                                to="ViewContact"
                            >
                                <img src={contactIcon} className="w-6 h-6 mr-2" alt="View contact icon" />
                                View Contacts
                            </Link>
                        </div>
                        <div className="mt-8 sm:mt-0 sm:flex-1 flex justify-center sm:justify-end">
                            <img className="sm:w-96 w-64 rounded-lg transform hover:scale-105 transition duration-300" src={personImg} alt="Organize illustration" />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Secondary Section */}
            <div className="grid place-items-center sm:mt-20 mt-10">
                <img className="sm:w-96 w-64 rounded-lg" src={personImg2} alt="Communication illustration" />
            </div>

            <h1 className="text-center text-3xl sm:text-5xl py-10 font-extrabold text-gray-800">
                Stay Connected, Stay Organized
            </h1>

            {/* Content Section */}
            <div className="text-center px-6 sm:px-0 mb-10">
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Our platform ensures that you never lose track of important contacts again. Whether it's for business or personal use, 
                    ProfilePro helps you keep everything in one place with easy access, so you can stay connected effortlessly.
                </p>
                <p className="text-lg sm:text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
                    Embrace the simplicity of organized contact management and focus on what truly matters - building strong relationships.
                </p>
                
            </div>
        </div>
    );
}
