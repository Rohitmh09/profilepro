import React, { useState, useEffect } from 'react';
import ContactCard from './ContactCard';
import axios from 'axios';

export default function ViewContacts() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
   
    // console.log('Fetching contacts');
    
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/data/fetchData', { withCredentials: true });
        console.log('Fetched contacts:', response.data[0]); // we write this because store procedure data returns in this formate [[our data ],[extra data]]
        if (Array.isArray(response.data[0])) {              // our data present at index 0 in response.data array
          setContacts(response.data[0]);
        } else {
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  // Filtering contacts based on search query
  const filteredContacts = contacts.filter((contact) =>
     contact.name.toLowerCase().includes(searchQuery.toLowerCase()));  //We get data from useState and filter it

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      <h1 className="text-2xl font-bold text-center my-6">My Contacts</h1>
      <div className="flex h-12 justify-center mb-6">
        <input
          type="text"
          placeholder="Search contacts..."
          className="border-2 rounded-l-full p-2 w-full md:w-1/2 lg:w-1/3 focus:outline-gray-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="bg-orange-500 text-white p-2 px-4 rounded-r-full hover:bg-orange-600 transition-colors">
          Search
        </button>

        <button onClick={() => window.location.href = '/AddContacts'}  
        className='text-white px-4 bg-slate-400  rounded-lg hover:bg-slate-500 transition-colors ml-4'>
        
           Add
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact, index) => (
            <ContactCard key={index} contact={contact} />
          ))
        ) : (
          <p className="text-center">No contacts found.</p>
        )}
      </div>
    </div>
  );
}
