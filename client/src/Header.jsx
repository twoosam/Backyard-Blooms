import { Link, Outlet } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <nav>
        <div>
          <h1>Backyard Blooms</h1>
          <ul>
            <li>
              <Link to="/" className="title">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="title">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/" className="title">
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/" className="title">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
