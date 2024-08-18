import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';

export default function GitHub() {
      const data = useLoaderData();    
      console.log(data);

      // using useEffect


    //  const [data,setData] = useState();
    //  useEffect(() => {

    //     fetch('https://api.github.com/users/rohitmh09')
    //     .then((response) => response.json())
    //     .then((data) =>{ 
    //         
            
    //         setData(data);
    //     })
    //   },[]);

  return (
    <div className="bg-orange-600 w-3/6 h-48 flex justify-between items-center align-middle m-auto rounded-lg my-3">
      
         <div className=' w-1/3 h-full flex justify-center items-center' >
            <img 
            src={data.avatar_url} 
            alt=""  
            className=' border h-36 w-36 object-contain rounded-full'/>

         </div>
         <div className=' text-left text-white text-2xl w-full h-4/5 mx-1 py-1 box-border p-2 flex justify-start flex-col gap-1 ' >
              <div > <strong>Id Name :</strong> {data.login} </div>
              <div ><strong>Name :</strong> {data.name} </div>
              <div><strong>Bio :</strong>{data.bio} </div>
         </div>
    </div>
  )
}


export const GitHubInfo = async ()=>
{
  const response = await fetch("https://api.github.com/users/rohitmh09");
  return response.json();
}