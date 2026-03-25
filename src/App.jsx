import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Routes, Route, useParams, Link } from 'react-router-dom';

/* --- NOVOS IMPORTS DO REDUX --- */
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from './themeSlice';

// 1. SEU HOOK DE CULTIVO (Mantido firme e forte)
function useDiasCultivo() {
  const [dias, setDias] = useState(0);
  useEffect(() => {
    const intervalo = setInterval(() => setDias((d) => d + 1), 2000);
    return () => clearInterval(intervalo);
  }, []);
  return dias;
}

// 2. COMPONENTE DE DETALHES (Reage à URL e ao Redux)
function DetalhesMuda() {
  const { tipoMaracuja } = useParams();
  const diasPassados = useDiasCultivo();
  const { register, handleSubmit } = useForm();

  // Lendo o tema do Redux
  const themeMode = useSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  return (
    <main style={{
      backgroundColor: isDark ? '#333' : 'white',
      color: isDark ? '#f0f0f0' : '#333',
      padding: '30px',
      borderRadius: '10px',
      width: '100%',
      maxWidth: '450px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      transition: 'all 0.3s'
    }}>
      <h2 style={{ textAlign: 'center', color: isDark ? '#81c784' : '#1b5e20' }}>
        Cultivo: <span style={{ textTransform: 'capitalize' }}>{tipoMaracuja}</span>
      </h2>

      <div style={{ backgroundColor: isDark ? '#444' : '#fff9c4', padding: '10px', borderRadius: '4px', textAlign: 'center', marginBottom: '20px' }}>
        <p>🌱 Germinação em curso: {diasPassados} dias</p>
      </div>

      <form onSubmit={handleSubmit((d) => alert('Salvo!'))} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label style={{ fontWeight: 'bold' }}>Responsável:</label>
        <input {...register("responsavel")} style={{
          padding: '10px',
          backgroundColor: isDark ? '#555' : '#fff',
          color: isDark ? '#fff' : '#000',
          border: `1px solid ${isDark ? '#666' : '#ccc'}`
        }} />
        <button type="submit" style={{ padding: '15px', backgroundColor: '#2e7d32', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Registrar no Sistema
        </button>
      </form>
    </main>
  );
}

// 3. COMPONENTE PRINCIPAL (Onde o botão de tema fica)
function App() {
  const themeMode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const isDark = themeMode === 'dark';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: isDark ? '#121212' : '#e8f5e9',
      color: isDark ? '#e0e0e0' : '#000',
      minHeight: '100vh',
      padding: '20px',
      transition: 'background-color 0.3s'
    }}>

      <header style={{
        backgroundColor: isDark ? '#1b5e20' : '#2e7d32',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        width: '100%',
        maxWidth: '600px',
        marginBottom: '20px',
        position: 'relative'
      }}>
        <h1>Viveiro de Maracujá Pro</h1>

        {/* BOTÃO QUE DISPARA O REDUX */}
        <button
          onClick={() => dispatch(toggleTheme())}
          style={{
            position: 'absolute', top: '10px', right: '10px',
            padding: '8px 12px', cursor: 'pointer',
            backgroundColor: isDark ? '#fdd835' : '#333',
            color: isDark ? '#000' : '#fff',
            border: 'none', borderRadius: '20px', fontWeight: 'bold'
          }}
        >
          {isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
        </button>

        <nav style={{ marginTop: '10px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <Link to="/muda/azedo" style={{ color: isDark ? '#81c784' : 'yellow', fontWeight: 'bold' }}>Azedo</Link>
          <Link to="/muda/doce" style={{ color: isDark ? '#81c784' : 'yellow', fontWeight: 'bold' }}>Doce</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/muda/:tipoMaracuja" element={<DetalhesMuda />} />
        <Route path="/" element={
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Bem-vindo, Gabriel!</h2>
            <p>Selecione uma variedade acima para gerenciar o plantio.</p>
          </div>
        } />
      </Routes>

    </div>
  );
}

export default App;