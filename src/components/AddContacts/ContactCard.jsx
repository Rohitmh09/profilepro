import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ContactCard = ({ contact }) => {
  const navigate = useNavigate();
  //  console.log("from contact card",contact);
   
  const handleUpdate = () => {
    navigate('/AddContacts', { state: { contact } }); // it will pass state to AddContact form to run useEffect and set data to update
  };

  const handleDelete = async () => {
    try {
      // When making a DELETE request with Axios, the payload should typically be
      //  sent as part of the request config, specifically under the data property, not directly as an argument like a POST request.
     
      const response = await axios.delete('http://localhost:8081/data/deleteContact',{data: { contact_id : contact.contact_id}});
  
      if (response.status === 200) {
        alert('Contact deleted successfully');
        window.location.reload();
      }
    } catch (error) {
      console.log("Error deleting contact", error.response.data);
      alert('Failed to delete contact');
    }
  };
  

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 w-full max-w-sm mx-auto mb-6">
      {/* Image Section */}
      <img
        src={contact.image && `http://localhost:8081${contact.image}`} 
               
        alt={contact.name} 
        className="w-full h-40 object-cover mb-4 rounded-md"
      />
      
      {/* Contact Details Section */}
      <div className="flex-grow ">
        <h3 className="text-lg font-bold text-gray-800 truncate">{contact.name}</h3>
        <p className="text-sm font-medium text-gray-600 truncate mb-1">{contact.designation}</p>
        <p className="text-sm text-gray-600 truncate mb-1"> <span className='font-medium'> Email:</span>  <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">{contact.email}</a></p>
        <p className="text-sm text-gray-600 truncate mb-1"><span className='font-medium'> Phone:</span> {contact.phone}</p>
        <p className="text-sm text-gray-600 truncate mb-1"><span className='font-medium'>Address:</span> {contact.address}</p>
        
        {/* Action Buttons */}
        <div className="flex justify-center mt-4 space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button 
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
           onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
