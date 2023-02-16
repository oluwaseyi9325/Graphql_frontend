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

const getSingleAuthor = gql`
    query getSingleAuthor($id:ID!){
        getSingleAuthor(id:$id){
            name,
            age,
            id,
            authorBook{
                name,
                genre,
                id
                }
        }
    }
`
export {GET_AUTHORS,getSingleAuthor};