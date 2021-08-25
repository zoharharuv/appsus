import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailToolbar } from "../cmps/MailToolbar.jsx";
import { MailsList } from "../cmps/MailsList.jsx";
import { MailDetails } from "../cmps/MailDetails.jsx";
import { MailCompose } from "../cmps/MailCompose.jsx";

import { mailService } from "../services/mail.service.js";

export class MailApp extends React.Component {
    state = {
        mails: [],
        filterBy: {
            display: 'all',
            txt: '',
            lables: []
        },
        selectedMail: null,
    }
    componentDidMount() {
        this.loadMails();
    }

    loadMails = () => {
        console.log('state:',this.state.filterBy);
        mailService.query(this.state.filterBy).then((mails) => {
            this.setState({ mails });
            console.log('mails:', this.state.mails);
        });
    };

    onSelectMail = (selectedMail) => {
        this.setState({ selectedMail }, () => {
            this.onSetDisplay('details')
        })
    }

    onSetDisplay = (val) => {
        this.setState({ filterBy: { ...this.state.filterBy, display: val }, }, () => {
            this.loadMails();
        });
    }

    onSearch = (val) => {
        this.setState({ filterBy: { ...this.state.filterBy, txt: val }, }, () => {
            this.loadMails();
        });
    }


    render() {
        const { mails, filterBy , selectedMail} = this.state;
        return (
            <section className="mail-app" >
                <MailFilter onSearch={this.onSearch} />
                <MailToolbar onSetDisplay={this.onSetDisplay} />

                {/* NO MAILS */}
                {filterBy.display !== 'compose' && filterBy.display !== 'details' && !mails.length &&
                    <h2>no mails</h2>}

                {/* MAILS LIST */}
                {
                    filterBy.display !== 'compose' && filterBy.display !== 'details' && mails.length &&
                    <MailsList onSetDisplay={this.onSetDisplay} onSelectMail={this.onSelectMail} mails={mails} />
                }

                {/* SELECTED MAIL DETAILS */}
                {
                    filterBy.display === 'details' && selectedMail &&
                    <MailDetails mail={selectedMail} />
                }

                {/* COMPOSE NEW MAIL */}
                {
                    filterBy.display === 'compose' &&
                    <MailCompose />
                }

            </section >

        );
    }
}
