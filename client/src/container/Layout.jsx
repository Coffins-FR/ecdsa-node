import { Outlet, Link } from "react-router-dom";
import "./Layout.scss";

const Layout = () => {
  return (
    <>
      <ul className="c-navBar">
        <li className="c-navBar__element">
          <Link to="/">Wallet</Link>
        </li>
        <li className="c-navBar__element">
          <Link to="/transfer">Transfer</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default Layout;
