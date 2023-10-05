import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div>
      <h1 className="text-2xl">
        Uh oh, we could not find the page you were looking for!
      </h1>
      <Link to="/">Return to home</Link>
    </div>
  );
}
