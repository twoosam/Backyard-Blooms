import { Link, Outlet } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <nav>
        <div>
          <h1 className="text-4xl">Backyard Blooms</h1>
          <ul>
            <li>
              <Link to="/" className="title">
                Home
              </Link>
            </li>
            <li>
              <Link to="/catalog" className="title">
                Catalog
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
