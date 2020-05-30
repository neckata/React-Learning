"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("bootstrap/dist/css/bootstrap.css");
require("../custom.css");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var AuthorForm = /** @class */ (function (_super) {
    __extends(AuthorForm, _super);
    function AuthorForm(props) {
        var _this = _super.call(this, props) || this;
        _this.getStateName = function (name) { return name; };
        _this.state = {
            name: '',
            imageUrl: '',
            books: [],
            bookTemp: ''
        };
        _this.onFieldChange = _this.onFieldChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleAddBook = _this.handleAddBook.bind(_this);
        return _this;
    }
    AuthorForm.prototype.onFieldChange = function (event) {
        if (event.target.name === 'name') {
            this.setState({
                name: event.target.value
            });
        }
        else if (event.target.name === 'imageUrl') {
            this.setState({
                imageUrl: event.target.value
            });
        }
        else if (event.target.name === 'bookTemp') {
            this.setState({
                bookTemp: event.target.value
            });
        }
    };
    AuthorForm.prototype.handleSubmit = function (event) {
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    };
    AuthorForm.prototype.handleAddBook = function () {
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: ''
        });
    };
    AuthorForm.prototype.render = function () {
        return (React.createElement("form", { onSubmit: this.handleSubmit },
            React.createElement("div", { className: "AddAuthorForm__input" },
                React.createElement("label", { htmlFor: "name" }, "\u0418\u043C\u0435"),
                React.createElement("input", { type: "text", name: "name", value: this.state.name, onChange: this.onFieldChange, className: "form-control" })),
            React.createElement("div", { className: "AddAuthorForm__input" },
                React.createElement("label", { htmlFor: "imageUrl" }, "\u0421\u043D\u0438\u043C\u043A\u0430"),
                React.createElement("input", { type: "text", name: "imageUrl", value: this.state.imageUrl, onChange: this.onFieldChange, className: "form-control" })),
            React.createElement("div", { className: "AddAuthorForm__input" },
                React.createElement("label", { htmlFor: "bookTemp" }, "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F: "),
                this.state.books.map(function (book) { return React.createElement("p", { key: book }, book); }),
                React.createElement("div", { className: "display-flex" },
                    React.createElement("input", { type: "text", name: "bookTemp", value: this.state.bookTemp, onChange: this.onFieldChange, className: "form-control" }),
                    React.createElement("input", { type: "button", className: "btn btn-primary addButton", onClick: this.handleAddBook, defaultValue: "+", disabled: !this.state.bookTemp }))),
            React.createElement("input", { type: "submit", value: "\u0414\u043E\u0431\u0430\u0432\u0438 \u0430\u0432\u0442\u043E\u0440", disabled: !this.state.name || !this.state.imageUrl || !this.state.books })));
    };
    return AuthorForm;
}(React.Component));
function mapDispatchToProps(dispatch, props) {
    return {
        onAddAuthor: function (author) {
            dispatch({ type: 'ADD_AUTHOR', author: author });
            props.history.push('/');
        }
    };
}
exports.default = react_router_dom_1.withRouter(react_redux_1.connect(function () { }, mapDispatchToProps)(AddAuthorForm));
function AddAuthorForm(props) {
    return React.createElement("div", { className: "AddAuthorForm" },
        React.createElement("h1", null, "\u0414\u043E\u0431\u0430\u0432\u044F\u043D\u0435 \u043D\u0430 \u043D\u043E\u0432 \u0430\u0432\u0442\u043E\u0440"),
        React.createElement(AuthorForm, { onAddAuthor: props.onAddAuthor }));
}
exports.AddAuthorForm = AddAuthorForm;
//# sourceMappingURL=author-quiz-form.js.map