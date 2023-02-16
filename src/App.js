import { ApolloProvider ,ApolloClient,InMemoryCache} from '@apollo/client'
import React from 'react'
import Books from './Component/Books'
import { Route,Routes } from 'react-router-dom';
import Authors from './Component/Authors';
import ViewAuthors from './Component/ViewAuthors';
const cache=  new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allBook: {
          merge(existing , incoming) {
            return incoming;
          }
        },
        allAuthor: {
          merge(existing , incoming) {
            return incoming;
          },
        
      },
      getSingleAuthor: {
        merge(existing , incoming) {
          return incoming;
        }
    }}
    }
  }
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  // cache: new InMemoryCache()
  cache
})

function App() {
  return (
   <ApolloProvider client={client}>
    {/* <Books/> */}
    <Routes>
  
    <Route path="/authors" element={<Authors/>}/>
    <Route path="/viewAuthor/:id" element={<ViewAuthors/>}/>
    <Route path="/books" element={<Books/>}/>
    </Routes>
   </ApolloProvider>
  )
}

export default App
