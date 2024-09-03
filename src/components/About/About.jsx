import React from "react";
import image from "../images/aboutPageImg.png";


export default function About() {
  return (
    <>
      <div className="py-16 bg-white">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-16">
            <div className=" md:5/12 lg:w-4/12">
              <img src={image} alt="image" className="rounded-md" />
            </div>
            <div className="md:7/12 lg:w-6/12">
              <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
              ProfilePro is a web application designed to profile management.
              </h2>
              <p className="mt-6 text-gray-600">
              ProfilePro is a sleek and intuitive web application designed to streamline profile management.
               Developed as part of my internship, ProfilePro offers a user-friendly platform for creating,
                updating, and organizing professional profiles.
              </p>
              <p className="mt-4 text-gray-600">
                Your contact information is stored securely and can be accessed
                from any device, anytime, anywhere. Provides features like seamless registration, login authentication and advanced search options to find specific contacts.
              </p>
            </div>
          </div>
        </div>
        
      </div>

    </>
  );
}
