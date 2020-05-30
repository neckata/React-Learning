"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("bootstrap/dist/css/bootstrap.css");
require("../custom.css");
var colors_enum_1 = require("../models/colors.enum");
var PropTypes = require("prop-types");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
function Hero() {
    return (React.createElement("div", { className: "row" },
        React.createElement("div", { className: "jumbotron col-10 offset-1" },
            React.createElement("h1", null, "Quiz: \u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438 \u0430\u0432\u0442\u043E\u0440\u0438"),
            React.createElement("p", null, "\u0418\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u043D\u0430\u043F\u0438\u0441\u0430\u043D\u043E \u043E\u0442 \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u0438\u044F \u0430\u0432\u0442\u043E\u0440"))));
}
function Book(props) {
    return (React.createElement("div", { className: "answer", onClick: function () { return props.onClick(props.title); } },
        React.createElement("h4", null, props.title)));
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
function Turn(props) {
    return (React.createElement("div", { className: "row turn", style: { backgroundColor: colors_enum_1.default[props.highlight] } },
        React.createElement("div", { className: "col-4 offset-1" },
            React.createElement("img", { src: props.author.imageUrl, className: "authorimage", alt: "Author" })),
        React.createElement("div", { className: "col-6" }, props.books.map(function (title) { return React.createElement(Book, { title: title, key: title, onClick: props.onAwserSelected }); }))));
}
function Continue(props) {
    return (React.createElement("div", { className: "row continue" }, props.show
        ? React.createElement("div", { className: "col-11" },
            React.createElement("button", { className: "btn btn-primary btn-lg float-right continue", onClick: props.onContinue }, "\u041F\u0440\u043E\u0434\u044A\u043B\u0436\u0438"))
        : null));
}
function AuthorQuiz(props) {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "container-fluid" },
            React.createElement(Hero, null),
            React.createElement(Turn, { author: props.turnData.author, books: props.turnData.books, highlight: props.highlight, onAwserSelected: props.onAwserSelected }),
            React.createElement(Continue, { show: props.highlight === 'correct', onContinue: props.onContinue }),
            React.createElement("p", null,
                React.createElement(react_router_dom_1.Link, { to: "/add" }, "\u0414\u043E\u0431\u0430\u0432\u0438 \u043D\u043E\u0432 \u0430\u0432\u0442\u043E\u0440")))));
}
function mapStateToProps(state) {
    return {
        turnData: state.turnData,
        highlight: state.highlight
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAwserSelected: function (answer) {
            dispatch({ type: 'ANSWER_SELECTED', answer: answer });
        },
        onContinue: function () {
            dispatch({ type: 'CONTINNUE' });
        }
    };
}
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AuthorQuiz);
//# sourceMappingURL=author-quiz.js.map