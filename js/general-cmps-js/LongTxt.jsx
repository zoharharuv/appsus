export function LongTxt(props) {
    let { maxLength, text } = props
    if(!maxLength) maxLength = 100;
    return (
        <span className="long-txt">
            {text.length >= maxLength && !props.isLongTxtShown ? text.substring(0, maxLength) + '..' : text}
            {props.isReadMore &&  <span className="read-more"
                onClick={props.readMore}>
                {props.isLongTxtShown ? 'Read less' : 'Read more'}
            </span>}
        </span>
    )
}