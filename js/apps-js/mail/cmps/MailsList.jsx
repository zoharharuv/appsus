import { MailPreview } from "./MailPreview.jsx";
export class MailsList extends React.Component {

    render() {
        const { mails, onSelectMail, onToggleRead, onStarMail, onDeleteMail } = this.props
        return (
            <div className="mails-list">
                {mails.map(mail => {
                    return <MailPreview key={mail.id}
                        mail={mail}
                        onSelectMail={onSelectMail}
                        onToggleRead={onToggleRead}
                        onStarMail={onStarMail}
                        onDeleteMail={onDeleteMail} />
                })}
            </div>

        );
    }
}
