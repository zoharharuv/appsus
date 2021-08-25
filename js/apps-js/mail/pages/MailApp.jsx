import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailToolbar } from "../cmps/MailToolbar.jsx";
import { MailsList } from "../cmps/MailsList.jsx";
import { MailDetails } from "../cmps/MailDetails.jsx";
import { MailCompose } from "../cmps/MailCompose.jsx";

import { mailService } from "../services/mail.service.js";
import { eventBusService } from './../../../general-services-js/event-bus-service.js';

export class MailApp extends React.Component {
    state = {
        mails: [],
        filterBy: {
            display: 'all',
            txt: '',
            isRead: false,
            lables: []
        },
        selectedMail: null,
    }
    initialFilter;

    componentDidMount() {
        this.initialFilter = this.state.filterBy;
        this.loadMails();
    }

    loadMails = () => {
        console.log('state:', this.state.filterBy);
        mailService.query(this.state.filterBy).then((mails) => {
            this.setState({ mails });
            console.log('mails:', this.state.mails);
        });
    };

    // SELECT MAIL FROM PREVIEWS
    onSelectMail = (selectedMail) => {
        this.onToggleRead(selectedMail)
        this.setState({ selectedMail }, () => {
            this.onSetDisplay('details')
        })
    }

    // PREVIEW BUTTONS
    onToggleRead = (selectedMail) => {
        mailService.updateMailIsRead(selectedMail);
        this.loadMails()
    }
    onStarMail = (selectedMail) => {
        mailService.starMail(selectedMail);
        this.loadMails()
    }

    onDeleteMail = (selectedMail) => {
        mailService.deleteMail(selectedMail.id)
            .then(txt => eventBusService.emit('user-msg', { txt, type: 'success' }))
        this.loadMails()
    }
    onUndelete = (selectedMail) => {
        mailService.undeleteMail(selectedMail);
        this.loadMails()
    }

    // SET THE DISPLAY: ALL/INBOX/SEND..
    onSetDisplay = (val) => {
        this.setState({ filterBy: this.initialFilter }, () => {
            this.setState({ filterBy: { ...this.state.filterBy, display: val }, }, () => {
                this.loadMails();
            });
        })
    }
    // HANDLE SEARCH BAR INPUT
    onSearch = (val) => {
        this.setState({ filterBy: { ...this.state.filterBy, txt: val }, }, () => {
            this.loadMails();
        });
    }
    // SEND MAIL
    onSendMail = (mail) => {
        mailService.composeMail(mail)
            .then((txt) => {
                eventBusService.emit('user-msg', { txt, type: 'success' })
                this.onSetDisplay('sent')
            })
    }
    // SAVE TO DRAFTS
    onSaveDraft = (mail) => {
        mailService.composeMail(mail, true)
            .then((txt) => {
                eventBusService.emit('user-msg', { txt, type: 'success' })
                this.onSetDisplay('drafts')
            })
    }



    render() {
        const { mails, filterBy, selectedMail } = this.state;
        return (
            <section className="mail-app" >
                <MailFilter onSearch={this.onSearch}
                    onSetDisplay={this.onSetDisplay}
                    currDisplay={filterBy.display} />

                <MailToolbar onSetDisplay={this.onSetDisplay} />

                {/* NO MAILS */}
                {filterBy.display !== 'compose' && filterBy.display !== 'details' && !mails.length &&
                    <h2>no mails</h2>}

                {/* MAILS LIST */}
                {
                    filterBy.display !== 'compose' && filterBy.display !== 'details' && mails.length &&
                    <MailsList mails={mails}
                        onSelectMail={this.onSelectMail}
                        onToggleRead={this.onToggleRead}
                        onStarMail={this.onStarMail}
                        onDeleteMail={this.onDeleteMail}
                        onUndelete={this.onUndelete} />
                }

                {/* SELECTED MAIL DETAILS */}
                {
                    filterBy.display === 'details' && selectedMail &&
                    <MailDetails mail={selectedMail} />
                }

                {/* COMPOSE NEW MAIL */}
                {
                    filterBy.display === 'compose' &&
                    <MailCompose onSaveDraft={this.onSaveDraft} onSendMail={this.onSendMail} />
                }

            </section >

        );
    }
}
