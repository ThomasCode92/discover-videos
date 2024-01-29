export default function Navbar({ username }) {
  return (
    <nav>
      <ul>
        <li>Home</li>
        <li>My List</li>
      </ul>

      <div>
        <button>{username}</button>
        <a>Sign Out</a>
      </div>
    </nav>
  );
}
