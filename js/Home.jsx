const { Link } = ReactRouterDOM

export function Home() {
  return (
    <section className="home">
      <img src="./img/hero.png" alt="appsus" className="hero" />
      <h1 className="main-title">Welcome to <span>Appsus</span> </h1>
      <h3>Make your life easier and much more productive with Appsus: Books, Mails and Notes services!</h3>

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

      <div className="about-team">
        <article className="social-container">
          <img className="social-img" src="./img/zohar.jpg" />
          <h3 className="social-header">Zohar Haruv</h3>
          <p className="social-info">Hey I am Zohar, 24 years old, a fullstack developer from Dekel, southern Israel.</p>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/zohar-haruv-a6690b210/">
              <img className="social-icon linkedin" src="./img/linkedin-brands.svg" alt="linkedin" />
            </a>
            <a href="https://github.com/zoharharuv/">
              <img className="social-icon git" src="./img/git-brands.svg" alt="git" />
            </a>
            <a href="https://www.instagram.com/muzic_by_z/">
              <img className="social-icon instagram" src="./img/instagram-brands.svg" alt="linkedin" />
            </a>
          </div>
        </article>

        <article className="social-container">
          <img className="social-img" src="./img/guy.jpg" />
          <h3 className="social-header">Guy Kamin</h3>
          <p className="social-info">And I am Guy, 25 years old, a fullstack developer from Dafna, northen Israel.</p>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/guy-kamin-499565182/">
              <img className="social-icon linkedin" src="./img/linkedin-brands.svg" alt="linkedin" />
            </a>
            <a href="https://github.com/guykamin1/">
              <img className="social-icon git" src="./img/git-brands.svg" alt="git" />
            </a>
            <a href="https://www.instagram.com/guykaminn/">
              <img className="social-icon instagram" src="./img/instagram-brands.svg" alt="linkedin" />
            </a>
          </div>
        </article>

      </div>

    </section>
  )
}


