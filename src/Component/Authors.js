import React from 'react'
import {useQuery} from '@apollo/client'
import {GET_AUTHORS} from './Queries/authorQueries'
import { useNavigate } from 'react-router-dom';
function Authors() {
    const {loading,error,data}=useQuery(GET_AUTHORS);
    console.log(data);
    const nav= useNavigate()
    const navBtn=(id)=>{
        console.log(id);
        nav(`/viewAuthor/${id}`)

    }
  return (
    <div>
        <h1>Authors</h1>
        <hr></hr>
        {loading && <p>Loading...</p>}
        {error && <p>Error :(</p>}
        {data &&
        data.allAuthor.map((author,index)=>(
            <div key={index}>
                <p>{index+1}</p>
                <p>{author.name}</p>
                <p>{author.age}</p>
                <button onClick={()=>navBtn(author.id)} className="text-red">View</button>
                <hr/>
                </div>
        ))}
    </div>
  )
}

export default Authors
