import { gql } from '@apollo/client';


const GET_AUTHORS = gql`
    query getAuthor{
        allAuthor{
            name,
            age,
            id
        }
    }
`

const getSignleAuthor = gql`
    query getSingleAuthor($id:ID!){
        getSingleAuthor(id:$id){
            name,
            age,
            id,
           book_own{
            name,
            genre
           }

        }
    }
`
export {GET_AUTHORS,getSignleAuthor};