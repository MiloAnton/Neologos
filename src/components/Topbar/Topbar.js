import logo from "../../assets/logo.png";
import "./Topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">
      <img src={logo} alt="Neologos Logo" />
      <h1>Neologos</h1>
    </div>
  );
};

export default Topbar;
