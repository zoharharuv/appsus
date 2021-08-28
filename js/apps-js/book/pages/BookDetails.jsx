const { Link } = ReactRouterDOM
import { eventBusService } from '../../../general-services-js/event-bus-service.js';
import { BookCurrency } from '../cmps/BookCurrency.jsx';
import { LongTxt } from './../../../general-cmps-js/LongTxt.jsx';
import { ReviewAdd } from './../cmps/ReviewAdd.jsx';
import { BookReview } from './../cmps/BookReview.jsx';
import { Loader } from '../../../general-cmps-js/Loader.jsx';
import { bookService } from './../services/book.service.js';
export class BookDetails extends React.Component {

  state = {
    book: null,
    isLongTxtShown: false,
    showReviews: false
  }
  componentDidMount() {
    this.loadBook()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
      this.setState({ isLongTxtShown: false })
      this.setState({ showReviews: false }, () => {
        this.loadBook()
      })
    }
  }


  loadBook = () => {
    const id = this.props.match.params.bookId
    bookService.getBookById(id)
      .then(book => {
        if (!book) this.props.history.push('/')
        this.setState({ book })
      })
  }

  onAddReview = (review) => {
    bookService.addBookReview(this.state.book.id, review)
      .then(this.loadBook)
  }
  onDeleteReview = (reviewId) => {
    bookService.deleteBookReview(this.state.book.id, reviewId)
      .then(this.loadBook)
  }

  onDeleteBook = () => {
    bookService.deleteBook(this.state.book.id)
      .then((txt) => {
        eventBusService.emit('user-msg', { txt, type: 'success' })
        this.onBack()
      })
  }

  onBack = () => {
    this.props.history.push('/book')
  }
  readMore = () => {
    this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
  }
  onShowReviews = () => {
    this.setState({ showReviews: !this.state.showReviews })
  }

  render() {
    const { book, showReviews } = this.state;

    const currYear = new Date().getFullYear();
    let yearsDiff
    let priceColor;

    if (book) {
      yearsDiff = currYear - book.publishedDate;
      if (book.listPrice.amount < 20) priceColor = 'low-price';
      if (book.listPrice.amount > 150) priceColor = 'high-price';
      if (book.listPrice.amount > 150) priceColor = 'high-price';
    }

    if(!book) return <Loader />
    return (
      <section className='book-details'>
        {book.thumbnail && <img src={book.thumbnail} alt='book-img' />}
        <h2>{book.title}</h2>
        <h4>{book.subtitle}</h4>

        {book.authors && <h4>Written by: {book.authors.map(name => name).join(', ')}</h4>}

        {book.categories && <h5>Categories: {book.categories.map(category => category).join(', ')}</h5>}

        {yearsDiff >= 10 && <h5 className="veteran-book">Veteran Book</h5>}
        {yearsDiff <= 1 && <h5 className="new-book">New!</h5>}
        {!book.pageCount && ''}
        {book.pageCount < 100 && <h5 className="page-count-light">Light reading</h5>}
        {book.pageCount > 200 && book.pageCount < 500
          && <h5 className="page-count-decent">Decent reading</h5>}
        {book.pageCount > 500 && <h5 className="page-count-long">Long reading</h5>}

        {book.listPrice.amount && <h4>Price:<span className={priceColor}> {book.listPrice.amount}
          <BookCurrency code={book.listPrice.currencyCode} /></span></h4>}

        {book.listPrice.isOnSale && <span className="sale">On sale!</span>}

        {book.description && <p><LongTxt text={book.description} isLongTxtShown={this.state.isLongTxtShown} isReadMore={true} readMore={this.readMore} /></p>}

        <button className="reviews-toggle" onClick={this.onShowReviews}>{!showReviews ? 'Show reviews' : 'Hide reviews'}</button>
        {showReviews && <div className="reviews">
          <h2>{book.reviews && book.reviews.length ? 'The book reviews' : 'No reviews yet!'}</h2>
          {book.reviews && book.reviews.length && book.reviews.map((review) =>
            <BookReview key={review.id} review={review} onDeleteReview={this.onDeleteReview} />)}
          <ReviewAdd onAddReview={this.onAddReview} />
        </div>}


        <div className="actions">
          <Link to={`/book/${bookService.getPrevBookId(book.id)}`}> <button className="back-btn">Previous Book</button></Link>
          <button className="delete-btn" onClick={this.onDeleteBook}>
            Delete Book
          </button>
          <Link to={`/book/${bookService.getNextBookId(book.id)}`}> <button className="next-btn">Next Book</button></Link>

        </div>
      </section>
    )
  }
}
