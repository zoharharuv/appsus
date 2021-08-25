const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
// GENERAL PAGES
import { Home } from './js/general-pages-js/Home.jsx'
import { About } from './js/general-pages-js/About.jsx'
// GENERAL CMPS
import { AppHeader } from './js/general-cmps-js/AppHeader.jsx';
import { AppFooter } from './js/general-cmps-js/AppFooter.jsx';
import { UserMsg } from './js/general-cmps-js/UserMsg.jsx';

// BOOK PAGES
import { BookApp } from './js/apps-js/book/pages/BookApp.jsx';
import { BookDetails } from './js/apps-js/book/pages/BookDetails.jsx';

// MAIL PAGES
import { MailApp } from './js/apps-js/mail/pages/MailApp.jsx';
import { MailDetails } from './js/apps-js/mail/cmps/MailDetails.jsx';

// NOTE PAGES
import { NoteApp } from './js/apps-js/note/pages/NoteApp.jsx';
import { NoteDetails } from './js/apps-js/note/cmps/NoteDetails.jsx';

export function App() {
  return (
    <Router>
      <header>
        <AppHeader />
      </header>
      <main className="main-layout">
        <Switch>
          {/* NOTE */}
          <Route path="/note/:noteId" component={NoteDetails} />
          <Route path="/note" component={NoteApp} />
          {/* MAIL */}
          <Route path="/mail/:mailId" component={MailDetails} />
          <Route path="/mail" component={MailApp} />
          {/* BOOK */}
          <Route path="/book/:bookId" component={BookDetails} />
          <Route path="/book" component={BookApp} />
          {/* GENERAL */}
          <Route path="/about" component={About} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
      <footer>
        <AppFooter/>
      </footer>
      <UserMsg/>
    </Router>
  );
}
