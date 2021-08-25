export class GoogleBooksList extends React.Component {

    render() {
        const { gBooks, onAddGoogleBook } = this.props;
        return (
            <ul className="google-books-list">
                {gBooks.map(book =>
                    <li key={book.id}>
                        {book.volumeInfo.title}
                        <button onClick={()=>{
                            onAddGoogleBook(book)
                        }}>+</button>
                    </li>
                )}
            </ul>
        )
    }
}