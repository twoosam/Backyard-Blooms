import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Header() {
  const isAuthenticated = localStorage.getItem('token');
  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
    console.log('Successfully signed out');
  };
  const navigate = useNavigate();

  return (
    <div>
      <nav>
        <div className="flex flex-col lg:flex-row flex-wrap lg:flex-nowrap items-center text-black bg-white">
          <div className="lg:basis-1/2 flex justify-start lg:pl-10 my-0.5 lg:my-1.5">
            <h1 className=" text-3xl lg:text-4xl font-carter">
              Backyard Blooms
            </h1>
          </div>
          <div className="lg:basis-1/2 flex justify-end lg:pr-10 flex-row pb-0.5 gap-x-2 lg:gap-x-5 font-serif text-md lg:text-xl">
            {isAuthenticated ? (
              <button onClick={handleSignOut} className="text-red-500">
                Sign Out
              </button>
            ) : (
              <div className="">
                <button className="text-white transition ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 hover:scale-110 px-1">
                  <Link to="/signIn">Sign In</Link>
                </button>
              </div>
            )}
            <div>
              <Link to="/cart" className="">
                Cart
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-black w-screen font-serif py-1">
          <ul className="flex flex-row justify-center gap-x-10 text-md lg:text-xl">
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
      </nav>
      <Outlet />
    </div>
  );
}
