const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
// GENERAL PAGES
import { Home } from './js/Home.jsx'
// GENERAL CMPS
import { AppHeader } from './js/general-cmps-js/AppHeader.jsx';
import { AppFooter } from './js/general-cmps-js/AppFooter.jsx';
import { UserMsg } from './js/general-cmps-js/UserMsg.jsx';

// BOOK PAGES
import { BookApp } from './js/apps-js/book/pages/BookApp.jsx';
import { BookDetails } from './js/apps-js/book/pages/BookDetails.jsx';

// MAIL PAGES
import { MailApp } from './js/apps-js/mail/pages/MailApp.jsx';

// NOTE PAGES
import { NoteApp } from './js/apps-js/note/pages/NoteApp.jsx';

export function App() {
  return (
    <Router>
      <header>
        <AppHeader />
      </header>
      <main className="main-layout">
        <Switch>
          {/* NOTE */}
          <Route path="/note/:mailId" component={NoteApp} />
          <Route path="/note" component={NoteApp} />
          {/* MAIL */}
          <Route path="/mail/compose/:noteId" component={MailApp} />
          <Route path="/mail/:mailId" component={MailApp} />
          <Route path="/mail/compose" component={MailApp} />
          <Route path="/mail/inbox" component={MailApp} />
          <Route path="/mail/sent" component={MailApp} />
          <Route path="/mail/drafts" component={MailApp} />
          <Route path="/mail/trash" component={MailApp} />
          <Route path="/mail/starred" component={MailApp} />
          <Route path="/mail" component={MailApp} />
          {/* BOOK */}
          <Route path="/book/:bookId" component={BookDetails} />
          <Route path="/book" component={BookApp} />
          {/* HOME */}
          <Route path="/" component={Home} />
        </Switch>
      </main>
      <footer>
        <AppFooter />
      </footer>
      <UserMsg />
    </Router>
  );
}
