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

// NOTE PAGES

export function App() {
  return (
    <Router>
      <header>
        <AppHeader />
      </header>
      <main className="main-layout">
        <Switch>
          {/* NOTE */}
          {/* MAIL */}
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
