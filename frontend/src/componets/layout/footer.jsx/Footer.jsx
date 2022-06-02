import React from 'react';
import appStore from "../../../images/Appstore.png"
import playStore from "../../../images/playstore.png"
import "./footer.css"
import About from './About';
import { Link } from "react-router-dom";
function Footer(props) {
    return (
      <footer id="footer">
        <div className="leftFooter">
          <h4>Download our app</h4>
          <p>Download app from Android and IOS Phone</p>
          <img src={playStore} alt="playstore" />
          <img src={appStore} alt="appStore" />
        </div>

        <div className="midFooter">
          <h1>Ecommerce</h1>
          <p>High Quality is our First Priority</p>
          <p>Copyright 2022 &copy; Sunil Sarsande</p>
        </div>

        <div className="rightFooter">
          <h4>Follow us on </h4>
          <a href="linkedin.com/in/sunil-sarsande-5b8486195">Likedin</a>
          <a href="https://github.com/Sarsande-Sunil">Github</a>
          <Link to={"/about"}>About</Link>
          <Link to={"/contact"}>Contact</Link>
        </div>
      </footer>
    );
}

export default Footer;