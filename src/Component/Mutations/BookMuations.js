import {gql} from "@apollo/client";


const DEL_BOOK = gql`
   mutation del_Book($id:ID!){
       delBook(id:$id){
     message
     status
     success
       }
   }
`

const ADD_BOOK = gql`
    mutation add_Book($name:String!,$genre:String!,$authorId:ID!){
        addBook(name:$name,genre:$genre,authorId:$authorId){
            name,
            genre,
            id
        }
    }
`
export {DEL_BOOK, ADD_BOOK};