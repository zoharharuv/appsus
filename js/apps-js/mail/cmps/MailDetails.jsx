export class MailDetails extends React.Component {
    render() {
        const { mail } = this.props;
        return (
            <article className="mail-details">
                <h1>{mail.subject}</h1>
                <h3>{mail.to}</h3>
                <pre>{mail.body}</pre>
                <p>{mail.sentAt}</p>
            </article>
        );
    }
}
