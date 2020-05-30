import * as React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../custom.css';
import Author from '../models/author.model';
import colors from '../models/colors.enum';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Hero() {
    return (
        <div className="row">
            <div className="jumbotron col-10 offset-1">
                <h1>Quiz: Български автори</h1>
                <p>Изберете произведение написано от показания автор</p>
            </div>
        </div>
    );
}

function Book(props: { title: string, onClick: (title: string) => void }) {
    return (<div className="answer" onClick={() => props.onClick(props.title)}>
        <h4>{props.title}</h4>
    </div>)
}

Turn.propTypes = {
    author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        books: PropTypes.arrayOf(PropTypes.string).isRequired
    }),
    books: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAwserSelected: PropTypes.func.isRequired,
    highlight: PropTypes.string.isRequired
};

function Turn(props: { author: Author, books: string[], highlight: string, onAwserSelected: (answer: string) => void }) {
    return (
        <div className="row turn" style={{ backgroundColor: colors[props.highlight as keyof typeof colors] }}>
            <div className="col-4 offset-1">
                <img src={props.author.imageUrl} className="authorimage" alt="Author" />
            </div>
            <div className="col-6">
                {props.books.map((title) => <Book title={title} key={title} onClick={props.onAwserSelected} />)}
            </div>
        </div>
    );
}

function Continue(props: { show: boolean, onContinue: () => void }) {
    return (
        <div className="row continue">
            {props.show
                ? <div className="col-11">
                    <button className="btn btn-primary btn-lg float-right continue" onClick={props.onContinue}>Продължи</button>
                </div>
                : null
            }
        </div>
    );
}

function AuthorQuiz(props: {
    turnData: { books: string[], author: Author },
    highlight: string, onAwserSelected: (answer: string) => void,
    onContinue: () => void
}) {
    return (
        <React.Fragment>
            <div className="container-fluid">
                <Hero />
                <Turn author={props.turnData.author} books={props.turnData.books} highlight={props.highlight} onAwserSelected={props.onAwserSelected} />
                <Continue show={props.highlight === 'correct'} onContinue={props.onContinue} />
                <p><Link to="/add">Добави нов автор</Link></p>
            </div>
        </React.Fragment>
    );
}

function mapStateToProps(state: {
    turnData: { books: string[], author: Author },
    highlight: string
}) {
    return {
        turnData: state.turnData,
        highlight: state.highlight
    };
}

function mapDispatchToProps(dispatch: {
    (onAwserSelected: { type: string; answer: string; }): void;
    (onContinue: { type: string; }): void;
}) {
    return {
        onAwserSelected: (answer: string) => {
            dispatch({ type: 'ANSWER_SELECTED', answer });
        },
        onContinue: () => {
            dispatch({ type: 'CONTINNUE' })
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorQuiz);