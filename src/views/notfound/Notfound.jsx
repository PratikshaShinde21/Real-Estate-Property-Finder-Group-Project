import { Link } from "react-router-dom";
import "./Notfound.css";

function NotFound() {
  return (
    <div className="notfound container">
      <h1>404</h1>
      <p>Sorry, the page you requested could not be found.</p>
      <Link to="/" className="notfound-link">Go back home</Link>
    </div>
  );
}

export default NotFound;
