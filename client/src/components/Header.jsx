import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Importer useNavigate pour la redirection





function Header() {
  const navigate = useNavigate(); // Hook de navigation pour rediriger l'utilisateur après la déconnexion

  const pseudo = localStorage.getItem("pseudo");
    const handleLogout = async () => {
      // Supprimer le pseudo du localStorage
      localStorage.removeItem("pseudo");
      localStorage.clear();
      sessionStorage.clear();
  
      document.cookie.split(';').forEach(cookie => {
        const cookieName = cookie.split('=')[0].trim();
        // Pour être sûr de supprimer le cookie, on réinitialise pour tous les chemins et domaines
        document.cookie = `${cookieName}=; path=/; domain=${document.domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    });
      // Optionnellement, faites une requête pour détruire la session côté serveur
      try {
          await fetch("http://localhost:3000/logout", {
              method: "POST",
              credentials: "include",  // Inclure les cookies de session
          });
      } catch (error) {
          console.error("Erreur lors de la déconnexion côté serveur:", error);
      }
  
      // Rediriger l'utilisateur vers la page de connexion
      navigate("/");
  };
  

  return (
    <>
      <header>
        <nav>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 115.13 117.42"
          >
            <defs>
              <style>
                {`
                  .cls-1,.cls-4,.cls-6{fill:none;}
                  .cls-2{fill:#b3b6bb;}
                  .cls-3{clip-path:url(#clip-path);}
                  .cls-4{stroke:#1d1d1b;stroke-width:0.68px;}
                  .cls-5{fill:#e3e5e5;}
                  .cls-6{stroke:#38404a;stroke-width:1.35px;}
                  .cls-7{fill:#fff;}
                  .cls-8,.cls-9{font-size:22.95px;fill:#1d1d1b;}
                  .cls-8{font-family:Roboto-Black, Roboto;font-weight:800;}
                  .cls-9{font-family:Roboto-Thin, Roboto;font-weight:200;}
                `}
              </style>
              <clipPath id="clip-path" transform="translate(0 0)">
                <rect className="cls-1" width="115.13" height="117.42" />
              </clipPath>
            </defs>
            <title>Fichier 1</title>
            <g id="Calque_2" data-name="Calque 2">
              <g id="Calque_1-2" data-name="Calque 1">
                <rect
                  className="cls-2"
                  x="16.43"
                  y="20.25"
                  width="82.26"
                  height="79.2"
                  transform="translate(-25.46 58.23) rotate(-45)"
                />
                <g className="cls-3">
                  <rect
                    className="cls-4"
                    x="16.43"
                    y="20.25"
                    width="82.26"
                    height="79.2"
                    transform="translate(-25.46 58.23) rotate(-45)"
                  />
                </g>
                <rect
                  className="cls-5"
                  x="23.63"
                  y="14.91"
                  width="70.68"
                  height="75.37"
                  transform="translate(-19.92 57.1) rotate(-45)"
                />
                <g className="cls-3">
                  <rect
                    className="cls-6"
                    x="23.63"
                    y="14.91"
                    width="70.68"
                    height="75.37"
                    transform="translate(-19.92 57.1) rotate(-45)"
                  />
                </g>
                <rect
                  className="cls-7"
                  x="25.6"
                  y="25.76"
                  width="68.3"
                  height="72.1"
                  transform="translate(-26.21 60.35) rotate(-45)"
                />
                <rect
                  className="cls-6"
                  x="25.6"
                  y="25.76"
                  width="68.3"
                  height="72.1"
                  transform="translate(-26.21 60.35) rotate(-45)"
                />
                <text className="cls-8" transform="translate(49.1 61.69)">
                  N
                </text>
                <text className="cls-9" transform="translate(65.21 61.69)">
                  _
                </text>
              </g>
            </g>
          </svg>

          <ul>
            <li>
              <Link to="/apropos">A propos</Link>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/CV">CV</Link>
            </li>
            <li>
              <Link to="/article">Article</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              {/* Si l'utilisateur est connecté, afficher le pseudo et le bouton de déconnexion */}
              {pseudo ? (
                <>
                  <span className="pseudo-log">Bonjour, {pseudo}</span>
                  <button onClick={handleLogout}>Se déconnecter</button>
                </>
              ) : (
                
                <Link to="/login">login
                  <svg
                    className="icon-login"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
                  </svg>
                </Link>
              )}
            </li>
          </ul>

          <div className="search-barre">
            <input
              type="text"
              placeholder="Rechercher d'Articles..."
              className="search-input"
            />
            <button className="search-button">
              <svg
                width="10"
                height="10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;