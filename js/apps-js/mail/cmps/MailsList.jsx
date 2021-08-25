import { MailPreview } from "./MailPreview.jsx";
export class MailsList extends React.Component {

    render() {
        const { mails, onSelectMail } = this.props
        return (
            <div className="mails-list">
                {mails.map(mail => {
                    return <MailPreview key={mail.id}
                        mail={mail}
                        onSelectMail={onSelectMail}
                        onToggleRead={this.props.onToggleRead}
                        onStarMail={this.props.onStarMail}
                        onDeleteMail={this.props.onDeleteMail}
                        onUndelete={this.props.onUndelete} />
                })}
            </div>

        );
    }
}
