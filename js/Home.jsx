const { NavLink, Route, Link } = ReactRouterDOM
function Team() {
  return (
    <ul>
      <li>Zohar Haruv</li>
      <li>Guy Kamin</li>
    </ul>
  )
}

function Vision() {
  return (
    <ul>
      <li>Make Zohar do the dirty work</li>
      <li>Let Guy do the buissness</li>
    </ul>
  )
}

export function Home() {
  return (
    <section className="home">
      <img src="img/hero.png" alt="appsus" className="hero" />
      <h1>Welcome to Appsus </h1>
      <h3>Make your life easier and much more productive with Appsus: Books, Mails and Notes services!</h3>
      <p>Made with love by Zohar and Guy</p>

      <section className="about">
        <strong>You don't replace a winning horse!</strong>

        <div className="about-comps">
          <ul>
            <Link className="book-link"to="/mail"><h3>Books</h3></Link>
            <li> Manage your favourite books!</li>
            <li>Supports Google books.</li>
          </ul>
          <ul>
            <Link className="mail-link"to="/mail"><h3>Mails</h3></Link>
            <li>Fast and qualified Email-Services these days!</li>
            <li>Easier for you to manage your emails.</li>
          </ul>

          <ul>
            <Link className="note-link"to="/note"><h3>Notes</h3></Link>
            <li> Manage your thoughts!</li>
            <li>Supports videos and pictures to be kept.</li>
          </ul>

        </div>
        <hr />
        <nav>
          <NavLink to="/team" >Team</NavLink>
          <NavLink to="/vision">Vision</NavLink>
        </nav>

        <section >
          <Route path="/team" component={Team} />
          <Route path="/vision" component={Vision} />
        </section>

      </section>
    </section>
  )
}


