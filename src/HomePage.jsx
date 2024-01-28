import "./HomePage.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Search from "./components/Search";
export default function HomePage() {
  return (
    <div id="homepage" className="container-fluid">
      <div className="row">
        <NavBar className="col-lg-12" />
      </div>

      <div className="row mb-10">
        <Search />
      </div>
      <div className="row mt-10">
        <Footer />
      </div>
    </div>
  );
}
