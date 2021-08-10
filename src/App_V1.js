import Footer from "./components/Footer";
import Header from "./components/Header";
import Loga from "./components/Logo";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Menu from "./components/Menu";

function App_V1() {
  return (
    <div className="logo">
      <div style={ { marginLeft: 50, marginTop: 25, borderColor: 'red', borderWidth: 2, borderStyle: 'solid' } } >
        <Loga />

        <Header />

        <Footer
          title="facebook"
          website="www.facebook.com"
          postcode={11000}
          isOpen
        />

        <hr />

        <Sidebar />

        <hr />

        <Menu />
      </div>
    </div>
  );
}

export default App_V1;
