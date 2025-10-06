import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-indigo-600">Catálogo de Livros</Link>
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-gray-600">Olá, <span className="font-medium">{user.username}</span></span>
          )}
          <button onClick={onLogout} className="px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700">Logout</button>
        </div>
      </div>
    </nav>
  );
}
