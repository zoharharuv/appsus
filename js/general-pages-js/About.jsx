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
      <strong>Just business no pleasure!</strong>
      <p>Created with passion(and no money)!</p>

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
