import {gql} from 'apollo-boost'

const getBooksQuery = gql`
{
    books{
        name
        id
    }
} 
`

const getAuthorsQuery = gql`
{
    authors{
        name
        id
    }
} 
`


//name and id have been requested
const addBookMutation = gql`
mutation($name:String!,$genre:String!,$authorId:ID!) {
    addBook(name:$name,genre:$genre,authorId:$authorId){
        name
        id
    }
}
`

const getBookQuery = gql`
 query($id : ID) {
     book(id: $id){
         id
         name
         genre
         author{
             id
             name
             age
             books{
                 name
                 id
             }
         }
     }
 }
`

export {getAuthorsQuery,getBooksQuery,addBookMutation,getBookQuery}