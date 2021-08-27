const { Link } = ReactRouterDOM

export function Home() {
  return (
    <section className="home">
      <img src="img/hero.png" alt="appsus" className="hero" />
      <h1>Welcome to Appsus </h1>
      <h3>Make your life easier and much more productive with Appsus: Books, Mails and Notes services!</h3>
      <p>Made with love by Zohar and Guy</p>

      <div className="about">
        <strong>You don't replace a winning horse!</strong>
        <article className="about-comps">

          <aside className="about-book">
            <ul>
              <Link className="book-link" to="/book"><h3>Books</h3></Link>
              <li> Manage your favourite books!</li>
              <li>Supports Google books.</li>
            </ul>
          </aside>

          <aside className="about-mail">
            <ul>
              <Link className="mail-link" to="/mail"><h3>Mails</h3></Link>
              <li>Fast and qualified Email-Services these days!</li>
              <li>Easier for you to manage your emails.</li>
            </ul>
          </aside>

          <aside className="about-link">
            <ul>
              <Link className="note-link" to="/note"><h3>Notes</h3></Link>
              <li> Manage your thoughts!</li>
              <li>Supports videos and pictures to be kept.</li>
            </ul>
          </aside>

        </article>
      </div>

      <h2 className="team-header">Our team members</h2>
      <div className="social-links">
        <article className="social-container">
          <img className="social-img" src="img/zohar.jpg"/>
          <h3>Zohar Haruv</h3>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum a at id ab eos! Blanditiis odio quae repudiandae earum eum!</p>
        </article>
        <article className="social-container">
          <img className="social-img" src="img/guy.jpg"/>
          <h3>Guy Kamin</h3>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum a at id ab eos! Blanditiis odio quae repudiandae earum eum!</p>
        </article>

      </div>

    </section>
  )
}


