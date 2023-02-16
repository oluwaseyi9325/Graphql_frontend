import { gql } from "@apollo/client";

const GET_BOOKS = gql`
query getBook{

  allBook{
  name,
  genre,
  id,
  
  }

}


`

export {GET_BOOKS};
