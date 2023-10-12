import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

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
      const response = await fetch('/api/user/sign-up', req);
      if (!response.ok) {
        throw new Error(`fetch Error ${response.status}`);
      }
      const user = await response.json();
      console.log('Registered', user);
    } catch (err) {
      alert(`Error registering user: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="text-black">
      <div>
        <div>
          <h1 className="text-2xl font-serif">Sign Up</h1>
          <hr />
        </div>
      </div>
      <h2 className="mt-10 text-center text-2xl font-bold ">
        Sign up to create your account
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <div className="mt-2">
              <input
                required
                name="username"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div>
              <button
                disabled={isLoading}
                className="text-white transition ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 hover:scale-110 px-1">
                Sign Up
              </button>
            </div>
            <Link to="/signIn">Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
