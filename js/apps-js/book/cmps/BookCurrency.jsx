export function BookCurrency({ code }) {
    return (
        <span className="book-currency-code">
                {
                    {
                        'ILS': '₪',
                        'USD': '$',
                        'EUR': '€',
                    }[code]
                }
        </span>
    )
}