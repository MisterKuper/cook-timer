import React from "react";
import './Footer.css'
import { assets } from "../../assets/assets";

function Footer() {
  return (
    <div className="footer"
      style={{
        backgroundImage: `url(${assets.pattern_footer})`,
        backgroundRepeat: "repeat-x",
      }}
    ></div>
  );
}

export default Footer;
