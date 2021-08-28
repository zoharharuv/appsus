import { MailPreview } from "./MailPreview.jsx";
export function MailsList(props) {
    return (
        <div className="mails-list">
            {props.mails.map(mail => {
                return <MailPreview key={mail.id}
                    mail={mail}
                    onSelectMail={props.onSelectMail}
                    onToggleRead={props.onToggleRead}
                    onStarMail={props.onStarMail}
                    onDeleteMail={props.onDeleteMail}
                    onUndelete={props.onUndelete} />
            })}
        </div>

    );

}
