import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOKS } from "./Queries/bookQueries";
import { DEL_BOOK } from "./Mutations/BookMuations";

function Books() {
  const { loading, error, data, refetch } = useQuery(GET_BOOKS);

  const [delBook] = useMutation(DEL_BOOK);
  const delBtn = (delIndex) => {
    delBook({
      variables: {
        id: delIndex,
      },
//  refetchQueries: [{ query: GET_BOOKS }],
update(cache, { data: { delBook } }) {
    console.log(delBook);
    const { allBook } = cache.readQuery({ query: GET_BOOKS });
    console.log(allBook);
    cache.writeQuery({
        query: GET_BOOKS,
        data: { allBook: allBook.filter((book) => book.id !== delIndex) },
    });
},

    }).then(res=>{
       console.log(res[0]);
    }).catch(err=>{
        console.log(err);
    }
    );
  };
  return (
    <div>
      <h1>Books</h1>
      <hr></hr>
      {loading && <p>Loading...</p>}
      {error && <p>Error :(</p>}
      {data &&
        data.allBook.map((book, index) => (
          <div key={index}>
            <p>{index+1}</p>
            <p>{book.name}" "{book.id}</p>
            <p>{book.genre}</p>
            <button className="text-red" onClick={() => delBtn(book.id)}>
              Delete
            </button>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default Books;
