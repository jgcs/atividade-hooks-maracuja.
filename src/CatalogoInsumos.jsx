import { useState, useEffect } from 'react';

function CatalogoInsumos() {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        // Trocamos para 'fragrances' que traz itens que lembram fertilizantes/insumos líquidos
        fetch('https://dummyjson.com/products/category/fragrances?limit=4')
            .then(res => res.json())
            .then(data => {
                setProdutos(data.products);
                setCarregando(false);
            })
            .catch(err => console.error("Erro na API:", err));
    }, []);

    return (
        <section style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            width: '100%',
            border: '1px dashed #4caf50'
        }}>
            <h3 style={{ textAlign: 'center', marginBottom: '15px', color: '#81c784' }}>
                🧪 Sugestões de Insumos (via API)
            </h3>

            {carregando ? (
                <p style={{ textAlign: 'center' }}>Consultando base de dados...</p>
            ) : (
                <div style={{ display: 'grid', gap: '10px' }}>
                    {produtos.map(item => (
                        <div key={item.id} style={{
                            padding: '10px',
                            borderBottom: '1px solid #555',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.9rem'
                        }}>
                            <span>💧 {item.title}</span>
                            <strong style={{ color: '#ffeb3b' }}>U$ {item.price}</strong>
                        </div>
                    ))}
                </div>
            )}
            <p style={{ fontSize: '0.7rem', marginTop: '10px', textAlign: 'center', opacity: 0.6 }}>
                Dados integrados em tempo real da DummyJSON API
            </p>
        </section>
    );
}

export default CatalogoInsumos;