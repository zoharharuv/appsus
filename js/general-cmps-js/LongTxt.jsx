export function LongTxt({ text, isLongTxtShown, readMore }) {
    return (
        <p className="long-txt">
            {text.length >= 100 && !isLongTxtShown ? text.substring(0, 100) + '...' : text}
            {text.length >= 100 && <span className="read-more" onClick={readMore}>{isLongTxtShown ? 'Read less' : 'Read more'}</span>}
        </p>
    )
}