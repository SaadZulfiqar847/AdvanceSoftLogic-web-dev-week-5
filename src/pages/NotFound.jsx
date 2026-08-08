import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found-page">
      <span className="not-found-icon">🌫️</span>
      <h1>404</h1>
      <p>This forecast doesn't exist. The page you're looking for drifted off somewhere.</p>
      <Link to="/" className="not-found-link">Back to Home</Link>
    </div>
  );
}

export default NotFound;