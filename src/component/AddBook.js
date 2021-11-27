import React,{Component} from 'react'
import {graphql} from 'react-apollo'
import * as compose from 'lodash.flowright';
import {getAuthorsQuery,addBookMutation,getBooksQuery} from '../queries/Queries'


class AddBook extends Component {

    //state
    constructor(props) {
        super(props);
            this.state = {
                //initial state
                name:'',
                genre:'',
                authorId:'',
            }
        
    }
    displayAuthors(){
        // var data = this.props.data //useful for single query
        //when multiple queries or mutations bound they are returned in props not data
        console.log(this.props)
        var data = this.props.getAuthorsQuery
        if (data.loading){
            return (<option disabled>Loading Authors...</option>)
        }else{
            return data.authors.map(author => {
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }

    submitForm(e){
        e.preventDefault()
        //here this will refer to the componenet with which the function has been bind

        // console.log(this.state)
        this.props.addBookMutation({
            //passing variables to mutation
            variables:{
                name:this.state.name,
                genre:this.state.genre,
                authorId:this.state.authorId
            },
            //as soon as data is entered bu user refetch the query to update book list
            refetchQueries:[{
                query:getBooksQuery

            }]
        })
    }

render() {
    return (
        //bind is used to bind the this component's context with the submitForm funtcion
        <form id="add-book" onSubmit={this.submitForm.bind(this)}>

            <div className="field">
                <label>Book name:</label>
                <input type="text"
                onChange={(e)=> this.setState({name: e.target.value})}
                />

            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text"
                 onChange={(e)=> this.setState({genre: e.target.value})}
                />

            </div>

            <div className="field">
                <label>Author:</label>
                <select  onChange={(e)=> this.setState({authorId: e.target.value})}>
                    <option>Select option</option>
                    {/* this is used bcz it's attached to this component  */}
                    {this.displayAuthors()}
                </select>

            </div>

            <button>+</button>

        </form>
    )
    }
}

//a query and a mutation are being composed together to be exported 

export default compose(
    graphql(getAuthorsQuery,{name: "getAuthorsQuery"}),
    graphql(addBookMutation,{name: "addBookMutation"})
)(AddBook) 