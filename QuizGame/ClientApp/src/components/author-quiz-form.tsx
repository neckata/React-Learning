import * as React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../custom.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

interface Props {
    onAddAuthor: (author: State) => void;
}

export interface State {
    name: string;
    imageUrl: string;
    books: string[];
    bookTemp: string;
}

class AuthorForm extends React.Component<Props, State> {
    protected getStateName = (name: keyof State) => name;

    constructor(props: Props) {
        super(props);   
        this.state = {
            name: '',
            imageUrl: '',
            books: [],
            bookTemp: ''
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
    }

    onFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.name === 'name') {
            this.setState({
                name: event.target.value
            });
        } else if (event.target.name === 'imageUrl') {
            this.setState({
                imageUrl: event.target.value
            });
        }
        else if (event.target.name === 'bookTemp') {
            this.setState({
                bookTemp: event.target.value
            });
        }
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }

    handleAddBook() {
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="AddAuthorForm__input">
                    <label htmlFor="name">Име</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange} className="form-control" />
                </div>
                <div className="AddAuthorForm__input">
                    <label htmlFor="imageUrl">Снимка</label>
                    <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange} className="form-control" />
                </div>
                <div className="AddAuthorForm__input">
                    <label htmlFor="bookTemp">Произведения: </label>
                    {
                        this.state.books.map((book) => <p key={book}>{book}</p>)
                    }
                    <div className="display-flex">
                        <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange} className="form-control" />
                        <input type="button" className="btn btn-primary addButton" onClick={this.handleAddBook} defaultValue="+" disabled={!this.state.bookTemp}/>
                    </div>
                </div>
                <input type="submit" value="Добави автор" disabled={!this.state.name || !this.state.imageUrl || !this.state.books} />
            </form >
        );
    }
}

function mapDispatchToProps(dispatch: (onAddAuthor: { type: string; author: State; }) => void, props: { history: string[]; }) {
    return {
        onAddAuthor: (author: State) => {
            dispatch({ type: 'ADD_AUTHOR', author });
            props.history.push('/');
        }
    };
}

export default withRouter(connect(() => { }, mapDispatchToProps)(AddAuthorForm) as any);

export function AddAuthorForm(props: { onAddAuthor: (author: State) => void }) {
    return <div className="AddAuthorForm">
        <h1>Добавяне на нов автор</h1>
        <AuthorForm onAddAuthor={props.onAddAuthor} />
    </div>;
}