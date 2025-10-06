import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

export default function BookForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      try {
        const { data } = await api.get(`/books/${id}`);
        setTitle(data.title);
        setAuthor(data.author);
        setPublishedYear(data.publishedYear || '');
      } catch (err) {
        setError(err.response?.data?.message || 'Erro ao carregar livro');
      } finally {
        setLoading(false);
      }
    }
    if (isEdit) fetchBook();
  }, [id, isEdit]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = { title, author, publishedYear: publishedYear ? Number(publishedYear) : undefined };
      if (isEdit) {
        await api.put(`/books/${id}`, payload);
      } else {
        await api.post('/books', payload);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold mb-4">{isEdit ? 'Editar Livro' : 'Adicionar Livro'}</h1>
      {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Título do livro" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Autor</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Nome do autor" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ano de publicação (opcional)</label>
          <input type="number" value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="2020" />
        </div>
        <button disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-60">
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
