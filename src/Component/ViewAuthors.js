import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleAuthor } from "./Queries/authorQueries";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BOOK, DEL_BOOK } from "./Mutations/BookMuations";

function ViewAuthors() {
  const [bookName, setBookName] = useState("");
  const [genre, setGenre] = useState("");
  const [addBook] = useMutation(ADD_BOOK);
  const { id } = useParams();
  
  // get the id from the url
  // console.log(id);
  // get single author from the server
  const { loading, error, data, refetch } = useQuery(getSingleAuthor, {
    variables: {
      id,
    },
  });

  const addBtn = () => {
  
    addBook({
      variables: {
        name: bookName,
        genre: genre,
        authorId: id,
      },
  
                

    //  onCompleted: () => {
    //   setBookName("");
    //   setGenre("");
    //     refetch();
        
    //  },
    //  onError: (err) => {
    //     console.log(err);
    //  },
    },

    
    
    );

    console.log(data.getSingleAuthor.authorBook)
    
  };

  const [delBook] = useMutation(DEL_BOOK);
   const delBtn= (id) => {
    //  console.log(id);
     delBook({
        variables: {
          id,
        },

      update: (cache) => {
        cache.modify({
          fields: {
            allBook(existingBookRefs, { readField }) {
              return existingBookRefs.filter(
                (bookRef) => id !== readField("id", bookRef)
              );
            },
          },
        });
      }})

   }







  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h2>Single Authors Page</h2>
      <p>
        <h2>Name: {data?.getSingleAuthor.name}</h2>
        <h2>Age: {data?.getSingleAuthor.age}</h2>
      </p>
      <div>
        <hr />
        <h4>BOOKS OWNED</h4>
        <div>
          <div>
            <label>Book Name:</label>
            <input
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              type="text"
              className=" border-4"
              placeholder="Book_name"
            />
          </div>
          <div>
            <label>Genre:</label>
            <input
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              type="text"
              className="border-4"
              placeholder="Genre"
            />
          </div>
          <div>
            <button
              onClick={addBtn}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Book
            </button>
          </div>
        </div>
      </div>
      <div>
        <hr />
        <h4>BOOKS WRITTEN</h4>
        {data?.getSingleAuthor.authorBook.map((book, index) => (
          <div key={index}>
            <p>{index + 1}</p>
            <p>{book.name}</p>
            <p>{book.genre}</p>
            <button onClick={()=>delBtn(book.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold  px-2 rounded">DEl</button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewAuthors;
