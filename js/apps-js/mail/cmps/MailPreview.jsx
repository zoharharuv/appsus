const { Link } = ReactRouterDOM
export class MailPreview extends React.Component {
    render() {
        const { mail,
            onSelectMail,
            onToggleRead,
            onStarMail,
            onDeleteMail,
            onUndelete
        } = this.props
        return (
            <article className="mail-preview">

                <button onClick={() => onStarMail(mail)}>
                    <img src={`./img/${mail.isStarred ? 'star-full' : 'star-empty'}.svg`} />
                </button>
                <Link to={`/mail/${mail.id}`}>
                    <div className="mail-preview-content" onClick={() => onSelectMail(mail)}>
                        <h3>{mail.to.split('@')[0]} </h3>
                        <h5>{mail.subject.substring(0, 10)}</h5>
                        <p>{mail.body.substring(0, 30)}</p>
                    </div>
                </Link>
                <button onClick={() => onToggleRead(mail)}>
                    <img src={`./img/${mail.isRead ? 'read' : 'unread'}.svg`} />
                </button>

                {mail.isDeleted && <button onClick={() => onUndelete(mail)}><img src="./img/undelete.svg" /></button>}

                <button onClick={() => onDeleteMail(mail)}>
                    <img src={`./img/${mail.isDeleted ? 'delete-perm' : 'delete'}.svg`} />
                </button>

            </article>

        );
    }
}
