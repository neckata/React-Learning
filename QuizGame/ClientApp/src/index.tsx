import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';
import ReactDOM from 'react-dom';
import React from 'react';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import AuthorQuiz from './components/author-quiz';
import AuthorForm from './components/author-quiz-form';
import { shuffle, sample } from 'underscore';
import { BrowserRouter, Route } from 'react-router-dom';
import Author from './models/author.model';

const authors: Author[] = [
    {
        name: "Иван Вазов",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/da/BASA-937K-1-410-7-Ivan_Vazov_%28cropped%29.JPG",
        books: [
            'Под Игото',
            'Опълченците на шипка',
            'Новото гробище над Сливница'
        ]
    },
    {
        name: "Алеко Константинов",
        imageUrl: "https://actualnosvishtov.com/img/blog/1200x700/554006941.jpg",
        books: [
            'Бай Ганьо',
            'До Чикаго и назад'
        ]
    },
    {
        name: "Христо Ботев",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/79/BASA-1271K-1-161-2-Hristo_Botev%2C_1875.JPG",
        books: [
            'На прощаване',
            'Елегия',
            'Борба'
        ]
    },
    {
        name: "Йордан Йовков",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/92/BASA-2128K-1-251-2-Yordan_Yovkov.jpg",
        books: [
            'Звено',
            'Земляци'
        ]
    }
];

function reducer(
    state = { authors, turnData: getTurnData(authors), highlight: '' },
    action: any) {
    switch (action.type) {
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
            return Object.assign({}, state, {
                highlight: isCorrect ? 'correct' : 'wrong'
            });
        case 'CONTINNUE':
            return Object.assign({}, state, {
                highlight: '',
                turnData: getTurnData(state.authors)
            });
        case 'ADD_AUTHOR':
            return Object.assign({}, state, {
                authors: state.authors.concat([action.author])
            });
        default: return state;
    }
}

let store = Redux.createStore(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

function getTurnData(authors: Author[]) {
    const allBooks = authors.reduce(function (p: string[], c, i) {
        return p.concat(c.books);
    }, []);

    const fourRandomBooks = shuffle(allBooks).slice(0, 4) as string[];
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) =>
            author.books.some((title) =>
                title === answer)) as Author
    };
}

ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <React.Fragment>
                <Route exact path="/" component={AuthorQuiz} />
                <Route exact path="/add" component={AuthorForm} />
            </React.Fragment>
        </ReactRedux.Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
