import React from "react";



function Apropos() {
  return (
    <section id="apropos" aria-labelledby="apropos-title">
      <article className="mainTexte" aria-labelledby="main-texte-title">
        <h1 id="apropos-title">Welcome to my portfolio!</h1>
        <p>
          I’m a junior web developer full stack passionate about coding and
          technology.
          <br />
          Explore my projects and dive into articles that cover the latest in
          web development, tech trends,
          <br />
          and innovations in the digital world. Join me on a journey!
          <br />
          <br />
          <span>Nabil Achouri</span>
        </p>
      </article>
      
      <article className="presentation" aria-labelledby="presentation-title">
        <h1 id="presentation-title">Pour mieux vous accompagner</h1>
        <h3>Présentation de mes compétences</h3>
      </article>
      <article className="logo" aria-label="Logos des technologies maîtrisées">
        <img
          src="assets/images/LogoJavaScript.png"
          alt="Logo de JavaScript"
          width="150"
          height="150"
        />
        <img
          src="/assets/images/LogoSQL.png"
          alt="Logo de SQL Server"
          width="150"
          height="150"
        />
        <img
          src="/assets/images/LogoCSS.png"
          alt="Logo de CSS"
          width="150"
          height="150"
        />
        <img
          src="/assets/images/LogoNode.png"
          alt="Logo de Node.js"
          width="150"
          height="150"
        />
      </article>
    </section>
  );
}

export default Apropos;
