import React from "react";


function Apropos() {
  return (
    <section id="apropos">
      <article className="mainTexte">
        <h1>__Welcome to my portfolio!</h1>
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
      <img
        className="capture2"
        src="/assets/images/capture2.png"
        alt="capture2"
      />
      <article className="presentation">
        <h1>Pour mieux vous accompagner</h1>
        <h3>Présentation de mes compétences</h3>
      </article>
      <article className="logo">
            <img
              src="assets/images/LogoJavaScript.png"
              alt="logo javascript"
              width="150"
              height="150"
            />
            <img
              src="/assets/images/LogoSQL.png"
              alt="logo sql server"
              width="150"
              height="150"
            />
            <img
              src="/assets/images/LogoCSS.png"
              alt="logo css"
              width="150"
              height="150"
            />
            <img
              src="/assets/images/LogoNode.png"
              alt="logo js"
              width="150"
              height="150"
            />
          </article>




    </section>
  );
}

export default Apropos;
