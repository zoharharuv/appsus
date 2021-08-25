const { Link } = ReactRouterDOM
import { BookCurrency } from './BookCurrency.jsx'
export function BookPreview({ book }) {
    return (
        <Link to={`/book/${book.id}`} > <article className="book-preview">
            {book.thumbnail && <img src={book.thumbnail} />}
            <h4>{book.title}</h4>
            {book.listPrice.amount && <h4>{book.listPrice.amount}<BookCurrency code={book.listPrice.currencyCode} /></h4>}
        </article></Link>
    )
}