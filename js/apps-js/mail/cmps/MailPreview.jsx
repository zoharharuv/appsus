export class MailPreview extends React.Component {
    render() {
        const { mail, onSelectMail } = this.props
        return (
            <article className="mail-preview"
                onClick={() => onSelectMail(mail) }
            >
                {mail.subject}
            </article>
        );
    }
}
