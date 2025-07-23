import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">My Blog</Link>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/create" className="hover:text-gray-300">Create Post</Link>
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/login" className="hover:text-gray-300">Login</Link>
          <Link to="/register" className="hover:text-gray-300">Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
