import Link from 'next/link';

const Sidebar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <Link href="/dashboard">
        <a className="block py-2">Dashboard</a>
      </Link>
      <Link href="/profile">
        <a className="block py-2">Profile</a>
      </Link>
    </nav>
  );
};

export default Sidebar;
