import React from 'react'
import { useParams } from 'react-router-dom'


export default function User() {

    const {id} = useParams();
  return (
    <div>
        <h3 className='text-3xl text-red-500 '>User: {id} </h3>
    </div>
  )
}
