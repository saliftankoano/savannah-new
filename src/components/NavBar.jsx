import "./NavBar.css";
import logo from "../assets/sv-uv.png";
import xlogo from "../assets/x.svg";
import linkedinlogo from "../assets/linkedin.svg";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
          <img className="img-fluid" src={logo} />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-5 col-12 d-flex align-items-center justify-content-lg-end justify-content-md-end justify-content-end pe-lg-5 pe-md-5">
          <div className="tr-elements">
            <div className="socials">
              <a href="https://twitter.com/home">
                <img src={xlogo} id="x-logo" />
              </a>
              <a href="https://www.linkedin.com/">
                <img src={linkedinlogo} id="linkedin-logo" />
              </a>
            </div>
            <div className="links d-block">
              <a className="about-link" href="https://www.lehman.edu/about/">
                ABOUT
              </a>
              <a
                className="admission-link"
                href="https://www.lehman.edu/admissions/"
              >
                ADMISSIONS
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
