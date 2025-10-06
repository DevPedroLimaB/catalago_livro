import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function BooksListPage() {
  const [data, setData] = useState({ items: [], page: 1, limit: 10, total: 0, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchBooks = async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(`/books?page=${page}&limit=10`);
      setData(data);
    } catch (err) {
      const msg = err.response?.data?.message || 'Erro ao carregar livros';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(1);
  }, []);

  const onDelete = async (id) => {
    if (!confirm('Deseja realmente excluir este livro?')) return;
    try {
      await api.delete(`/books/${id}`);
      fetchBooks(data.page);
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao excluir');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Meus Livros</h1>
        <Link to="/add-book" className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Adicionar Livro</Link>
      </div>

      {loading && <div>Carregando...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && (
        <div className="bg-white rounded shadow">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="p-3">Título</th>
                <th className="p-3">Autor</th>
                <th className="p-3">Ano</th>
                <th className="p-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((b) => (
                <tr key={b._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{b.title}</td>
                  <td className="p-3">{b.author}</td>
                  <td className="p-3">{b.publishedYear || '-'}</td>
                  <td className="p-3 space-x-2">
                    <button onClick={() => navigate(`/edit-book/${b._id}`)} className="px-2 py-1 text-sm bg-amber-500 text-white rounded">Editar</button>
                    <button onClick={() => onDelete(b._id)} className="px-2 py-1 text-sm bg-red-600 text-white rounded">Excluir</button>
                  </td>
                </tr>
              ))}
              {data.items.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">Nenhum livro cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {data.pages > 1 && (
        <div className="flex items-center gap-2">
          <button
            disabled={data.page <= 1}
            onClick={() => fetchBooks(data.page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >Anterior</button>
          <span className="text-sm text-gray-600">Página {data.page} de {data.pages}</span>
          <button
            disabled={data.page >= data.pages}
            onClick={() => fetchBooks(data.page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >Próxima</button>
        </div>
      )}
    </div>
  );
}
