import { storageService } from './../../../general-services-js/storage.service.js';
import { utilService } from './../../../general-services-js/util.service.js';

export const mailService = {
    query,
    getMailById,
    getNextMailId,
    getPrevMailId,
    composeMail,
    deleteMail,
    undeleteMail,
    starMail,
    checkUnreads,
    readMail,
    toggleReadMail,
    getLoggedinUser,
    setLabel,
    removeLabel
}


// GLOBAL VARS
const rndMails = ['jemarch@icloud.com', ' wildixon@live.com', ' ournews@att.net',
    'heckerman@yahoo.ca', 'koudas@aol.com', 'brainless@yahoo.com',
    'mbalazin@me.com', ' hager@verizon.net', 'rupak@mac.com', 'amimojo@live.com']

const rndSubject = ['are some goals you have failed to accomplish?',
    'is the strangest themed restaurant you have heard of?',
    'Which recent news story is the most interesting?',
    'smell brings back great memories?',
    'Are you a saver or a spender?',
    'kinds of food do you usually eat on your favorite holiday?',
    'do you do when youre bored?',
    'best way to discover new music?',
    'worst fast food restaurant?',
    'should success be measured? And by that measurement, who is the most successful person you know?'
]

const rndBody = ['Particular unaffected projection sentiments no my. Music marry as at cause party worth weeks. Saw how marianne graceful dissuade new outlived prospect followed. Uneasy no settle whence nature narrow in afraid. At could merit by keeps child. While dried maids on he of linen in. ',
    'No opinions answered oh felicity is resolved hastened. Produced it friendly my if opinions humoured. Enjoy is wrong folly no taken. It sufficient instrument insipidity simplicity at interested. Law pleasure attended differed mrs fat and formerly. Merely thrown garret her law danger him son better excuse. Effect extent narrow in up chatty. Small are his chief offer happy had. ',
    'Her old collecting she considered discovered. So at parties he warrant oh staying. Square new horses and put better end. Sincerity collected happiness do is contented. Sigh ever way now many. Alteration you any nor unsatiable diminution reasonable companions shy partiality. Leaf by left deal mile oh if easy. Added woman first get led joy not early jokes. ',
    'His followed carriage proposal entrance directly had elegance. Greater for cottage gay parties natural. Remaining he furniture on he discourse suspected perpetual. Power dried her taken place day ought the. Four and our ham west miss. Education shameless who middleton agreement how. We in found world chief is at means weeks smile.', 'Attachment apartments in delightful by motionless it no. And now she burst sir learn total. Hearing hearted shewing own ask. Solicitude uncommonly use her motionless not collecting age. The properly servants required mistaken outlived bed and. Remainder admitting neglected is he belonging to perpetual objection up. Has widen too you decay begin which asked equal any',
    'Piqued favour stairs it enable exeter as seeing. Remainder met improving but engrossed sincerity age. Better but length gay denied abroad are. Attachment astonished to on appearance imprudence so collecting in excellence. Tiled way blind lived whose new. The for fully had she there leave merit enjoy forth. ',
    'At distant inhabit amongst by. Appetite welcomed interest the goodness boy not. Estimable education for disposing pronounce her. John size good gay plan sent old roof own. Inquietude saw understood his friendship frequently yet. Nature his marked ham wished. ',
    'Whole wound wrote at whose to style in. Figure ye innate former do so we. Shutters but sir yourself provided you required his. So neither related he am do believe. Nothing but you hundred had use regular. Fat sportsmen arranging preferred can. Busy paid like is oh. Dinner our ask talent her age hardly. Neglected collected an attention listening do abilities. ',
    'Boisterous he on understood attachment as entreaties ye devonshire. In mile an form snug were been sell. Hastened admitted joy nor absolute gay its. Extremely ham any his departure for contained curiosity defective. Way now instrument had eat diminution melancholy expression sentiments stimulated. One built fat you out manor books. Mrs interested now his affronting inquietude contrasted cultivated. Lasting showing expense greater on colonel no.',
    'Do am he horrible distance marriage so although. Afraid assure square so happen mr an before. His many same been well can high that. Forfeited did law eagerness allowance improving assurance bed. Had saw put seven joy short first. Pronounce so enjoyment my resembled in forfeited sportsman. Which vexed did began son abode short may. Interested astonished he at cultivated or me. Nor brought one invited she produce her.',
    'It as announcing it me stimulated frequently continuing. Least their she you now above going stand forth. He pretty future afraid should genius spirit on. Set property addition building put likewise get. Of will at sell well at as. Too want but tall nay like old. Removing yourself be in answered he. Consider occasion get improved him she eat. Letter by lively oh denote an.']

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
const KEY = 'mailsDB';
var gMails;

// RUNNING FUNCS
loadMails();

// FUNCS
function getLoggedinUser() {
    return loggedinUser;
}
function setLabel(mail, label) {
    getMailById(mail.id)
        .then(mail => {
            if (!mail.labels.includes(label)) {
                mail.labels.push(label)
                _saveMailsToStorage();
                return mail;
            }
        })
    return Promise.resolve(mail);
}
function removeLabel(mail, label) {
    getMailById(mail.id)
        .then(mail => {
            if (mail.labels.includes(label)) {
                const idx = mail.labels.findIndex(target => target === label);
                mail.labels.splice(idx, 1);
                _saveMailsToStorage();
                return mail;
            }
        })
    return Promise.resolve(mail);
}

function query(filterBy) {
    if (!gMails || !gMails.length) loadMails()
    if (filterBy) {
        let mailsToShow;
        const { display, txt, lables } = filterBy;
        if (display === 'details' || display === 'compose')
            return Promise.resolve([]);
        // DISPLAY
        if (display === 'all') {
            mailsToShow = gMails.slice();
        }
        if (display === 'inbox') {
            mailsToShow = gMails.filter(mail => {
                return mail.to === loggedinUser.email
            })
        }
        if (display === 'sent') {
            mailsToShow = gMails.filter(mail => {
                return (mail.to !== loggedinUser.email && !mail.isDraft)
            })
        }
        if (display === 'starred') {
            mailsToShow = gMails.filter(mail => {
                return mail.isStarred
            })
        }
        if (display === 'drafts') {
            mailsToShow = gMails.filter(mail => {
                return mail.isDraft
            })
        }
        if (display === 'unread') {
            mailsToShow = gMails.filter(mail => {
                return !mail.isRead
            })
        }
        if (display === 'read') {
            mailsToShow = gMails.filter(mail => {
                return mail.isRead && !mail.isDeleted
            })
        }
        if (display === 'title') {
            mailsToShow = gMails.slice();
            mailsToShow.sort((a, b) => a.subject.toLowerCase().localeCompare(b.subject.toLowerCase()));
        }
        if (display === 'date') {
            mailsToShow = gMails.slice();
            mailsToShow.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
        }
        // FILTER THE DELETED MAILS
        if (display !== 'trash') {
            let beforeFilter = mailsToShow.slice();
            mailsToShow = beforeFilter.filter(mail => {
                return !mail.isDeleted
            })
        }
        if (display === 'trash') {
            mailsToShow = gMails.filter(mail => {
                return mail.isDeleted
            })
        }

        // TEXT
        if (txt) {
            let beforeFilter = mailsToShow.slice();
            mailsToShow = beforeFilter.filter(mail => {
                return (
                    mail.subject && mail.subject.toLowerCase().includes(txt.toLowerCase())
                    || mail.from && mail.from.toLowerCase().includes(txt.toLowerCase())
                    || mail.to && mail.to.toLowerCase().includes(txt.toLowerCase())
                    || mail.body && mail.body.toLowerCase().includes(txt.toLowerCase())
                )
            })
        }
        // LABELS
        if (lables && lables.length) {
            console.log('labels');
        }
        if (!mailsToShow.length) mailsToShow = [];
        return Promise.resolve(mailsToShow);
    }
    return Promise.resolve(gMails);
}

function getMailById(mailId) {
    var mail = gMails.find(mail => {
        return mailId === mail.id;
    })
    return Promise.resolve(mail);
}

function getNextMailId(mailId) {
    const mailIdx = gMails.findIndex(mail => mail.id === mailId);
    let nextMailIdx = mailIdx + 1;
    if (nextMailIdx === gMails.length) nextMailIdx = 0;
    return gMails[nextMailIdx].id;
}

function getPrevMailId(mailId) {
    const mailIdx = gMails.findIndex(mail => mail.id === mailId);
    let prevMailIdx = mailIdx - 1;
    if (prevMailIdx < 0) prevMailIdx = gMails.length - 1;
    return gMails[prevMailIdx].id;
}


function loadMails() {
    gMails = storageService.loadFromStorage(KEY);
    if (!gMails || !gMails.length) {
        gMails = [];
        _createMails();
        _saveMailsToStorage();
    }
}

function composeMail(mail, isDraft = false) {
    const id = utilService.makeId();
    const sentAt = new Date(Date.now());
    const newMail = {
        id,
        subject: mail.subject,
        body: mail.body,
        isRead: true,
        sentAt,
        from: loggedinUser.email,
        to: mail.to,
        isStarred: false,
        isDraft,
        isDeleted: false,
        labels: []
    }
    gMails.push(newMail);
    _saveMailsToStorage();
    return Promise.resolve(isDraft ? 'Saved to Drafts!' : 'Mail was sent!')
}

// PREVIEW BUTTONS
function deleteMail(mailId) {
    var mailIdx = gMails.findIndex(function (mail) {
        return mailId === mail.id;
    })
    if (gMails[mailIdx].isDeleted) {
        gMails.splice(mailIdx, 1);
        _saveMailsToStorage();
        return Promise.resolve(`Deleted Forever`)
    }
    gMails[mailIdx].isRead = true;
    gMails[mailIdx].isDeleted = true;
    _saveMailsToStorage();
    return Promise.resolve(`Moved to trash!`)
}

function undeleteMail(mail) {
    mail.isDeleted = false;
    _saveMailsToStorage();
}

function readMail(mail) {
    mail.isRead = true;
    _saveMailsToStorage();
}

function toggleReadMail(mail) {
    mail.isRead = !mail.isRead;
    _saveMailsToStorage();
}
function starMail(mail) {
    mail.isStarred = !mail.isStarred;
    _saveMailsToStorage();
}

function checkUnreads() {
    var count = 0;
    gMails.forEach(mail => !mail.isRead ? count++ : '')
    return Promise.resolve((count / gMails.length) * 100);
}

// PRIVATE FUNCS
function _createMails() {
    for (let i = 0; i < 10; i++) {
        let mail = _createMail(i);
        gMails.push(mail);
    }
}

function _createMail(idx) {
    const id = utilService.makeId();
    const newMail = {
        id,
        subject: rndSubject[idx],
        body: rndBody[idx],
        isRead: false,
        sentAt: new Date(Date.now()),
        from: rndMails[idx],
        to: loggedinUser.email,
        isStarred: false,
        isDraft: false,
        isDeleted: false,
        labels: []
    }
    return newMail;
}

function _saveMailsToStorage() {
    storageService.saveToStorage(KEY, gMails);
}