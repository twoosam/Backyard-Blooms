import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData.entries());
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const response = await fetch('/api/user/sign-in', req);
      if (!response.ok) {
        throw new Error(`fetch Error ${response.status}`);
      }
      const { user, token } = await response.json();
      localStorage.setItem('token', token);
      navigate('/');
      console.log('Signed In', user, '; received token:', token);
    } catch (err) {
      alert(`Error signing in: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function guestLogin() {
    try {
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'guest', password: 'blooms' }),
      };
      const response = await fetch('/api/user/sign-in', req);
      if (!response.ok) {
        throw new Error(`fetch Error ${response.status}`);
      }
      const { user, token } = await response.json();
      localStorage.setItem('token', token);
      navigate('/');
      console.log('Signed In', user, '; received token:', token);
    } catch (err) {
      alert(`Error signing in: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="text-black">
      <div>
        <h1 className="text-2xl font-serif">Sign In</h1>
        <hr />
      </div>
      <div>
        <h2 className="mt-10 text-center text-2xl font-bold ">
          Sign in to your account
        </h2>
        <div className="mt-10">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 flex flex-col justify-center items-center">
            <div>
              <label className="block text-sm font-medium">Username</label>
              <div className="mt-2">
                <input
                  required
                  name="username"
                  type="text"
                  className="block w-80 lg:w-96 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <div className="mt-2">
                <input
                  required
                  name="password"
                  type="password"
                  className="block w-80 lg:w-96 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 bg-white"
                />
              </div>
            </div>
            <div>
              <div>
                <button
                  disabled={isLoading}
                  className="text-white transition ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 hover:scale-110 px-1">
                  Sign In
                </button>
              </div>
              <div className="pt-12">
                <button className="text-white transition ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 hover:scale-110 px-1">
                  <Link to="/signUp">Create an account</Link>
                </button>
              </div>
            </div>
          </form>
          <div className="pt-5">
            <button
              onClick={guestLogin}
              className="text-white transition ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 hover:scale-110 px-1">
              Sign in with guest account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
