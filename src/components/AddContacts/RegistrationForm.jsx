import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import contactIcon from '../icons/address-book-regular.svg';

export default function RegistrationForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldEmail: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    designation: '',
    image: null,
  });

  console.log("here is location: ",location);
  useEffect(() => {
    console.log("here is location state: ",location.state);
    
    if (location.state && location.state.contact) {
      setFormData({
        oldEmail: location.state.contact.email,
        name: location.state.contact.name,
        phone: location.state.contact.phone,
        email: location.state.contact.email,
        address: location.state.contact.address,
        designation: location.state.contact.designation,
        image: null,
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataObj = new FormData();
    formDataObj.append('oldEmail', formData.oldEmail);
    formDataObj.append('name', formData.name);
    formDataObj.append('phone', formData.phone);
    formDataObj.append('email', formData.email);
    formDataObj.append('address', formData.address);
    formDataObj.append('designation', formData.designation);
    if (formData.image) {
      formDataObj.append('image', formData.image);
    }
  
    try {
      const url = 'http://localhost:8081/data/saveData';
  
      const res = await axios.post(url, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      if (res) {
        console.log("Response received:", res);
      } else {
        console.error("No response received from the server.");
      }
  
      console.log(res);
      if (res.data.Message === 'Contact saved successfully') {
        window.location.reload();
        alert('Contact saved');
        
      } else {
        navigate('/ViewContact');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {    // add feature on 28/08/2024 
        // Handle 400 error (e.g., email already exists)
        alert( 'Entered Email already exists in your contacts');

        setFormData((prevData) => ({  
          ...prevData,
          email: "",
        }));
        console.log(error.response.data.Error);
      } else {
        // Handle other errors
        console.error('Error saving contact data: ', error);
        alert('An error occurred while saving contact data.');
      }
    }
  };

  return (
    <div className="max-w-md border-2 mx-auto my-5 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-700">
        {location.state && location.state.contact ? 'Update Contact' : 'Add Contact'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone No.</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows="2"
            placeholder="Enter your address"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Designation</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your designation"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Button Container */}
        <div className="flex justify-center gap-3 items-center">
          <button
            type="submit"
            className="px-4 w-32 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {location.state && location.state.contact ? 'Update' : 'Submit'}
          </button>

          <Link
            to="/ViewContact"
            className="inline-flex items-center w-32 px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 transition duration-200"
          >
            <img src={contactIcon} className="w-6 h-6 mr-2" alt="View contact icon" />
            Contacts
          </Link>
        </div>
      </form>
    </div>
  );
}
