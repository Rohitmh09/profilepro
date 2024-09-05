import React, { useState, useEffect } from 'react';
import ContactCard from './ContactCard';
import axios from 'axios';

export default function ViewContacts() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/data/fetchData', { withCredentials: true });
        console.log('Fetched contacts:', response.data[0]);
        if (Array.isArray(response.data[0])) {
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

  const handleDeleteContact = (deletedContactId) => {
    setContacts((prevContacts) => prevContacts.filter(contact => contact.contact_id !== deletedContactId));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        className='text-white px-4 bg-slate-400 rounded-lg hover:bg-slate-500 transition-colors ml-4'>
           Add
        </button>
      </div>
      <div className="grid gap-6"
     style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact, index) => (
            <ContactCard key={index} contact={contact} onDelete={handleDeleteContact} />
          ))
        ) : (
          <p className="text-center">No contacts found.</p>
        )}
      </div>
    </div>
  );
}
