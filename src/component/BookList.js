import React,{Component} from 'react'

import {graphql} from 'react-apollo'

import {getBooksQuery} from '../queries/Queries'
import BookDetails from './BookDetails';

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //selected will keep track of id of selected item
            selected: null
        }
    
    }

    displayBooks(){
        var data = this.props.data;
        if (data.loading){
            return (<div>Loading books...</div>)
        }
        else{
            return data.books.map(book =>{
                return(
                    <li key={book.id}
                    onClick={(e) => {this.setState({selected:book.id})}}
                    >{book.name}</li>

                )
            })
        
    }
}
render() {
    return (
        <div>
            <ul id="book-list">
                {this.displayBooks()}
            </ul>
            <BookDetails bookId={this.state.selected}/>
        </div>
    )
    }
}

export default graphql(getBooksQuery)(BookList)  //using this we have all the data coming from this query in component props

  