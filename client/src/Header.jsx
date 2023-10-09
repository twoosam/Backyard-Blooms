import { Link, Outlet } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <nav>
        <div>
          <div className="flex flex-row flex-nowrap items-center text-black bg-white space-x-96">
            <h1 className="text-4xl my-1.5 pl-10 pr-96 font-carter">
              Backyard Blooms
            </h1>
            <ul className="flex justify-end flex-row gap-x-5 pl-24 font-serif">
              <li>
                <Link to="/signIn" className="">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signUp" className="">
                  <button className=" text-white transition ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 hover:scale-110 px-0.5">
                    Sign Up
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/cart" className="">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div className="bg-black w-screen font-serif py-1">
            <ul className="flex flex-row justify-center gap-x-10 text-xl">
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
            </ul>
          </div>
          <hr />
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
