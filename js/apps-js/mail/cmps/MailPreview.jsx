export class MailPreview extends React.Component {
    render() {
        const { mail, onSelectMail, onToggleRead, onStarMail, onDeleteMail } = this.props
        return (
            <article className="mail-preview">
                <button onClick={() => onStarMail(mail)}>
                    <img src={`./img/${mail.isStarred ? 'star-full' : 'star-empty'}.svg`} />
                </button>
                <button onClick={() => onDeleteMail(mail)}><img src="./img/delete.svg" /></button>
                <div className="mail-preview-content" onClick={() => onSelectMail(mail)}>
                    <h2>{mail.to.split('@')[0]} </h2>
                    <h2>{mail.subject.substring(0, 50)}</h2>
                </div>
                <button onClick={() => onToggleRead(mail)}>
                    <img src={`./img/${mail.isRead ? 'read' : 'unread'}.svg`} />
                </button>
            </article>
        );
    }
}
