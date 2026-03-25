import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
/* IMPORTANTE: Importar os componentes de rota */
import { Routes, Route, useParams, Link } from 'react-router-dom';

// 1. SEU HOOK CUSTOMIZADO (Mantido)
function useDiasCultivo() {
  const [dias, setDias] = useState(0);
  useEffect(() => {
    const intervalo = setInterval(() => setDias((d) => d + 1), 2000);
    return () => clearInterval(intervalo);
  }, []);
  return dias;
}

// 2. O COMPONENTE DINÂMICO (Ele reage à URL)
function DetalhesMuda() {
  const { tipoMaracuja } = useParams(); // Pega o nome na URL: /muda/:tipoMaracuja
  const diasPassados = useDiasCultivo();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const aoSalvarMuda = (dados) => {
    alert(`Lote de Maracujá ${tipoMaracuja} registrado!`);
  };

  return (
    <main style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '100%', maxWidth: '450px' }}>
      <h2 style={{ color: '#1b5e20', textAlign: 'center' }}>
        Cultivo: <span style={{ textTransform: 'capitalize' }}>{tipoMaracuja}</span>
      </h2>

      <div style={{ backgroundColor: '#fff9c4', padding: '10px', borderRadius: '4px', textAlign: 'center', marginBottom: '20px' }}>
        <p>🌱 Germinação em curso: {diasPassados} dias</p>
      </div>

      <form onSubmit={handleSubmit(aoSalvarMuda)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>Responsável pelo Lote:</label>
        <input {...register("responsavel", { required: "Nome obrigatório" })} style={{ padding: '10px' }} />
        {errors.responsavel && <span style={{ color: 'red' }}>{errors.responsavel.message}</span>}

        <button type="submit" style={{ padding: '15px', backgroundColor: '#2e7d32', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Confirmar Plantio de {tipoMaracuja}
        </button>
      </form>
    </main>
  );
}

// 3. O COMPONENTE APP (Gerencia as Rotas)
function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e8f5e9', minHeight: '100vh', padding: '20px' }}>

      <header style={{ backgroundColor: '#2e7d32', color: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', width: '100%', maxWidth: '600px', marginBottom: '20px' }}>
        <h1>Sistema Dinâmico de Mudas</h1>
        {/* LINKS PARA TESTAR AS ROTAS */}
        <nav style={{ marginTop: '10px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Link to="/muda/azedo" style={{ color: 'yellow' }}>Azedo</Link> |
          <Link to="/muda/doce" style={{ color: 'yellow' }}>Doce</Link> |
          <Link to="/muda/roxo" style={{ color: 'yellow' }}>Roxo</Link>
        </nav>
      </header>

      <Routes>
        {/* ROTA DINÂMICA: O ":tipoMaracuja" é a variável que o useParams lê */}
        <Route path="/muda/:tipoMaracuja" element={<DetalhesMuda />} />
        <Route path="/" element={<p>Escolha uma variedade acima para começar.</p>} />
      </Routes>

    </div>
  );
}

export default App;