import React from 'react'
import {Link} from "react-router-dom"
import "./Footer.scss"
const Footer = () => {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const locale = 'en';
    const today = new Date();
    
    const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });
  return (
    <>
     <div className="footer">
<div className="footer-wrapper">
  <div className="logo">
  <Link to="/" className="logo">
           
            <h1 className="logo-text ">
              Ani
              <span className="span">Web</span>
            </h1>
          </Link>
  </div>
  <div className="footer-info ">
    <h5 className="info" >AniWeb is a Free Anime streaming site with zero ads. We let you watch anime online without having to register or paying, with over 10000+ movies and Anime. You can also Download full episodes from AniWeb and watch it later if you want.</h5>
    <div className=" btn-links">

    <Link
    to="/terms-condition"
    className="redirect"
    >
      <h3>

    Terms & Condition
      </h3>
    </Link>
    <Link
    to="/privacy-policy"
    className="redirect"
    >
      <h3>

    Privacy & Policy
      </h3>
    </Link>
    <Link
    to="/contact"
    className="redirect"
    >
      <h3>

    Contact
      </h3>
    </Link>
    </div>
  </div>
  <div className="footer-notice">
  <span className="animate  "></span>
  <span className="  animate-ping "></span>
    <p>AniWeb does not store any files on our server, we only linked to the media which is hosted on "<span className="pulse-notice">3rd party services</span>".</p>
  </div>
</div>

      <p className=" copyright">
        <span>&copy;Copyright by Ani <span className="text-primary">Web</span> </span>
        <br />
        <span className="block"> &copy; {date} and {time}  </span>
      </p>
      
    </div>
    </>
  )
}

export default Footer