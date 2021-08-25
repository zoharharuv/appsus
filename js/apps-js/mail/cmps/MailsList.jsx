import { MailPreview } from "./MailPreview.jsx";
export class MailsList extends React.Component {

    render() {
        const { mails, onSelectMail } = this.props
        return (
            <div className="mails-list">
                {mails.map(mail => {
                    return <MailPreview key={mail.id} onSelectMail={onSelectMail} mail={mail} />
                })}
            </div>

        );
    }
}
