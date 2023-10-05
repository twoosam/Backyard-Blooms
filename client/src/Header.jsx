import { Link, Outlet } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <nav>
        <div>
          <h1 className="text-4xl mb-5">Backyard Blooms</h1>
          <ul className="flex flex-row justify-center gap-x-5">
            <li>
              <Link to="/" className="">
                Home
              </Link>
            </li>
            <li>
              <Link to="/catalog" className="">
                Catalog
              </Link>
            </li>
            <li>
              <Link to="/signIn" className="">
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/signUp" className="">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/cart" className="">
                Cart
              </Link>
            </li>
          </ul>
          <hr />
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
