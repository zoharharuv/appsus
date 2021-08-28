const { Link } = ReactRouterDOM
export function MailDetails({ mail, onStarMail, onUndelete, onDeleteMail, onReplyMail }) {
    return (
        <article className="mail-details" >

            <div className="mail-info">
                <button className="mail-reply-btn" onClick={() => onReplyMail(mail)}>
                    <img className="mail-reply" src="./img/reply.svg" />
                </button>
                <h3>From: {mail.from} 
                </h3>
                <h1>Subject: {mail.subject}</h1>
                <p>{mail.body}</p>
                <p>Sent at: {mail.sentAt.toLocaleString()}</p>
            </div>

            <div className="mail-actions">
                <button onClick={() => onStarMail(mail)}>
                    <img className="mail-star" src={`./img/${mail.isStarred ? 'star-full' : 'star-empty'}.svg`} />
                </button>
                <button><Link to={`/note/${mail.id}`}><img src="./img/note-nav.svg" /></Link></button>
                {mail.isDeleted && <button onClick={() => onUndelete(mail)}><img src="./img/undelete.svg" /></button>}
                <button onClick={() => onDeleteMail(mail)}><img src={`./img/${mail.isDeleted ? 'delete-perm' : 'delete'}.svg`} /></button>
            </div>
        </article>
    )
}
