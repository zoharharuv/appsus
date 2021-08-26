export class MailDetails extends React.Component {
    render() {
        const { mail } = this.props;
        return (
            <article className="mail-details" >
                <h3>To: {mail.to}</h3>
                <h1>Subject: {mail.subject}</h1>
                <p>{mail.body}</p>
                <p>Sent at: {mail.sentAt.toLocaleString()}</p>
                <button onClick={() => this.props.onStarMail(mail)}>
                    <img className="mail-star" src={`./img/${mail.isStarred ? 'star-full' : 'star-empty'}.svg`} />
                </button>
                <button onClick={() => this.props.onDeleteMail(mail)}><img src={`./img/${mail.isDeleted ? 'delete-perm' : 'delete'}.svg`} /></button>
                {mail.isDeleted && <button onClick={() => this.props.onUndelete(mail)}><img src="./img/undelete.svg" /></button>}
            </article>
        )
    }
}
