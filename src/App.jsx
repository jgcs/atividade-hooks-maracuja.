import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// 1. NOSSO HOOK CUSTOMIZADO (Lógica de contagem de dias de cultivo)
function useDiasCultivo() {
  const [dias, setDias] = useState(0);

  useEffect(() => {
    // Simula o passar dos dias para a germinação do maracujá
    const intervalo = setInterval(() => {
      setDias((d) => d + 1);
    }, 2000); // A cada 2 segundos "passa um dia"
    return () => clearInterval(intervalo);
  }, []);

  return dias;
}

function App() {
  const diasPassados = useDiasCultivo();

  // 2. IMPLEMENTAÇÃO DO REACT HOOK FORM
  const { register, handleSubmit, formState: { errors } } = useForm();

  const aoSalvarMuda = (dados) => {
    console.log("Muda Registrada:", dados);
    alert(`Muda de Maracujá ${dados.variedade} registrada com sucesso!`);
  };

  return (
    // ESTILO DO BODY (Fundo e centralização total)
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Centraliza na horizontal
      justifyContent: 'center', // Centraliza na vertical (se o conteúdo for pequeno)
      padding: '20px',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: '#e8f5e9', // Verde bem clarinho de fundo
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>

      {/* CABEÇALHO CENTRALIZADO */}
      <header style={{
        backgroundColor: '#2e7d32', // Verde Maracujá
        color: 'white',
        padding: '20px 40px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center',
        marginBottom: '20px',
        width: '100%',
        maxWidth: '600px' // Limita a largura para não espalhar muito
      }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Viveiro de Maracujá - Gestão de Mudas</h1>
        <p style={{ margin: '0', fontSize: '16px' }}>Desenvolvedor: <strong>Gabriel Santos</strong></p>
      </header>

      {/* STATUS DO LOTE (Onde o Hook Customizado aparece) */}
      <div style={{
        marginBottom: '20px',
        padding: '15px 30px',
        backgroundColor: '#fff9c4', // Amarelo Polpa
        borderLeft: '5px solid #fbc02d',
        borderRadius: '4px',
        textAlign: 'center',
        width: '100%',
        maxWidth: '600px',
        boxSizing: 'border-box'
      }}>
        <p style={{ margin: '0', fontSize: '16px' }}>🌱 <strong>Status do Lote:</strong> Simulação de germinação em {diasPassados} dias.</p>
      </div>

      {/* ÁREA DO FORMULÁRIO (Cartão branco centralizado) */}
      <main style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        width: '100%',
        maxWidth: '450px', // Largura ideal para formulários
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center' // Centraliza o título e o form dentro do card
      }}>
        <h2 style={{ color: '#1b5e20', marginTop: '0', marginBottom: '10px' }}>Cadastro de Nova Muda</h2>
        <p style={{ color: '#666', textAlign: 'center', marginBottom: '30px' }}>Preencha os dados abaixo para registrar no sistema.</p>

        {/* O FORMULÁRIO EM SI */}
        <form onSubmit={handleSubmit(aoSalvarMuda)} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px', // Espaço entre as perguntas
          width: '100%' // Ocupa todo o espaço do cartão
        }}>

          {/* CAMPO 1 */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>Variedade do Maracujá:</label>
            <select
              {...register("variedade", { required: "Selecione a variedade" })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '16px',
                backgroundColor: '#fafafa'
              }}
            >
              <option value="">Selecione...</option>
              <option value="Amarelo (Azedo)">Amarelo (Azedo)</option>
              <option value="Doce">Doce</option>
              <option value="Roxo">Roxo</option>
            </select>
            {errors.variedade && <p style={{ color: '#d32f2f', fontSize: '12px', margin: '5px 0 0 5px' }}>{errors.variedade.message}</p>}
          </div>

          {/* CAMPO 2 */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>Quantidade de Sementes:</label>
            <input
              type="number"
              {...register("quantidade", {
                required: "Informe a quantidade",
                min: { value: 1, message: "Mínimo de 1 semente" }
              })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '16px',
                backgroundColor: '#fafafa',
                boxSizing: 'border-box'
              }}
              placeholder="Ex: 50"
            />
            {errors.quantidade && <p style={{ color: '#d32f2f', fontSize: '12px', margin: '5px 0 0 5px' }}>{errors.quantidade.message}</p>}
          </div>

          {/* CAMPO 3 */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>E-mail do Responsável:</label>
            <input
              {...register("email", {
                required: "E-mail obrigatório",
                pattern: { value: /^\S+@\S+$/i, message: "E-mail inválido" }
              })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '16px',
                backgroundColor: '#fafafa',
                boxSizing: 'border-box'
              }}
              placeholder="seuemail@teste.com"
            />
            {errors.email && <p style={{ color: '#d32f2f', fontSize: '12px', margin: '5px 0 0 5px' }}>{errors.email.message}</p>}
          </div>

          {/* BOTAO ENVIAR */}
          <button type="submit" style={{
            padding: '15px',
            backgroundColor: '#2e7d32',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '18px',
            marginTop: '10px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
            transition: 'background-color 0.3s'
          }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1b5e20'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2e7d32'}
          >
            Registrar Plantio
          </button>
        </form>
      </main>

      {/* RODAPÉ */}
      <footer style={{ marginTop: '40px', textAlign: 'center', color: '#888', fontSize: '12px', width: '100%' }}>
        <p>Atividade Acadêmica - Uso de Hooks Customizados e React Hook Form</p>
      </footer>
    </div>
  );
}

export default App;