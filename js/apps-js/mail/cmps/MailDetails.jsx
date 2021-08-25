export class MailDetails extends React.Component {
    render() {
        const { mail } = this.props;
        return (
            <article className="mail-details">
                <h3>To: {mail.to}</h3>
                <h1>Subject: {mail.subject}</h1>
                <pre>{mail.body}</pre>
                <p>Sent at: {mail.sentAt.toLocaleString()}</p>
            </article>
        );
    }
}
