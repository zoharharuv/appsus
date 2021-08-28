import { bookService } from './../services/book.service.js';
import { BookList } from './../cmps/BookList.jsx';
import { GoogleBooks } from './../cmps/GoogleBooks.jsx';
import { GoogleBooksList } from './../cmps/GoogleBooksList.jsx';
import { BookFilter } from './../cmps/BookFilter.jsx';
import { googleService } from './../services/google.service.js';
import { eventBusService } from './../../../general-services-js/event-bus-service.js';
import { Loader } from './../../../general-cmps-js/Loader.jsx';
export class BookApp extends React.Component {
  state = {
    books: [],
    googleBooks: [],
    filterBy: null,
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    bookService.query(this.state.filterBy).then((books) => {
      this.setState({ books });
    });
  };

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadBooks);
  };

  onSearchGoogle = (data) => {
    if (!data) return this.setState({ googleBooks: [] })
    googleService.getGoogleBooks(data.toLowerCase())
      .then(googleBooks => {
        this.setState({ googleBooks })
      })
  }

  onAddGoogleBook = (googleBook) => {
    bookService.addGoogleBook(googleBook)
      .then(txt => {
        eventBusService.emit('user-msg', { txt, type: 'success', bookId: googleBook.id })
        this.loadBooks()
      })
      .catch(txt => {
        eventBusService.emit('user-msg', { txt, type: 'danger' })
      })
  }


  render() {
    const { books, googleBooks } = this.state;
    if (!books) return <Loader />
    return (
      <section className='book-app'>
        <BookFilter onSetFilter={this.onSetFilter} />
        <GoogleBooks onSearchGoogle={this.onSearchGoogle} />
        {!googleBooks && <p>no books found</p>}
        {googleBooks.length > 0 && <GoogleBooksList gBooks={googleBooks} onAddGoogleBook={this.onAddGoogleBook} />}
        <BookList onSelectBook={this.onSelectBook} books={books} />
      </section>
    );
  }
}
