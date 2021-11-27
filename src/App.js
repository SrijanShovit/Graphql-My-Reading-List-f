import BookList from './component/BookList'
import AddBook from './component/AddBook'
import  ApolloClient from 'apollo-boost';
import { ApolloProvider  } from 'react-apollo';

//apollo client setup
const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
})

function App() {
  return (
    //wrapping entire app in apollo provider
    //to get data from given endpoint and inject it inside the react app 
    <ApolloProvider client={client} >

    <div id="main">
      <h1>My Reading List</h1>
      <BookList/>
      <AddBook/>
    </div>
    </ApolloProvider>
  );
}

export default App;
