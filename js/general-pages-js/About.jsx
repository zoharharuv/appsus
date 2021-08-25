const { NavLink, Route } = ReactRouterDOM

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
      <li>Sells expensive books</li>
      <li>Trick the customers</li>
    </ul>
  )
}

export function About() {
  return (
    <section className="about">
      <strong>You don't replace a winning horse!</strong>

      <div className="about-comps">
        <ul>
        <h3>Mails</h3>
          <li>Fast and qualified Email-Services these days!</li>
          <li>Easier for you to manage your emails.</li>
        </ul>

        <ul>
        <h3>Notes</h3>
          <li> Manage your thoughts!</li>
          <li>Supports videos and pictures to be kept.</li>
        </ul>
        <ul>
        <h3>Books</h3>
          <li> Manage your favourite books!</li>
          <li>Supports Google books.</li>
        </ul>
      </div>
      <hr />
      <nav>
        <NavLink to="/about/team" >Team</NavLink>
        <NavLink to="/about/vision">Vision</NavLink>
      </nav>

      <section >
        <Route path="/about/team" component={Team} />
        <Route path="/about/vision" component={Vision} />
      </section>

    </section>
  )
}
