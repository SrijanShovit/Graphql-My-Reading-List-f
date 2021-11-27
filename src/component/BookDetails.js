import React,{Component} from 'react'

import {graphql} from 'react-apollo'
import {getBookQuery} from '../queries/Queries'

class BookDetails extends Component {
    
    // console.log(this.props)
    displayBookDetails  (){
        const {book} = this.props.data;
        //if such book exists display its details
        if (book){
            return (
                <div>
                    <h2>{book.name}</h2>
                   
                    <p>Author : {book.author.name}</p>
                    <p>All books by this author</p>
                    <ul className="other-books">
                        {
                            book.author.books.map(book=>{
                                return <li key={book.id}>{book.name}</li> 
                            })
                        }
                    </ul>
                </div>
            )
        }
        else{
            return (
                <div>No book selected...</div>
            )
        }
    }


    render() {
    return (
        <div id="book-details">
            <p>Book details go here</p>
            {this.displayBookDetails()}
        </div>
    )
    }
}

export default graphql(getBookQuery,{
    //option function will re-run everytime props are updated
    //and reset the variables
    options:(props) => {
        return {
            variables: {
                id :props.bookId
            }
        }
    }
})(BookDetails);