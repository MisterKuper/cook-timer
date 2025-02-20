import React from "react";
import Header from "../../components/Header/Header.js";
import Category from "../../components/Category/Category.js";
import { assets } from "../../assets/assets.js";
import Footer from "../../components/Footer/Footer.js";

function Home() {
  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${assets.pattern_sky})`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="wrapper">
        <Header />
        <Category />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
