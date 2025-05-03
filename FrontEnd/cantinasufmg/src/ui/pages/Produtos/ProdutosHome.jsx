import React, { Fragment, useEffect, useState } from 'react';
import { getProdutos } from '../../../api/produtoService';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
// import { getUser } from '../../../api/userService';
import { CommonHeader } from '../../components/common/CommonHeader';
import { ROUTES } from '../../../routes/Routes';

export const ProdutosHome = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const user = getUser();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        getProdutos()
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Erro ao carregar produtos');
                setLoading(false);
            });
    };

    return (
        <Fragment>
            <CommonHeader />

            <div style={{ padding: '2rem' }}>
                <h2>Lista de Produtos</h2>
                {loading && <p>Carregando...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && (
                    <>
                        {products.length === 0 ? (
                            <p>Nenhum produto disponível.</p>
                        ) : (
                            <ul>
                                {products.map((product) => (
                                    <li key={product.id}>
                                        <strong>{product.nome}</strong> -{' '}
                                        {product.descricao}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>

            <Button
                sx={{
                    width: '1000px',
                    mx: 'auto',
                    borderRadius: '999px',
                    fontWeight: 'bold',
                    paddingX: 3,
                    paddingY: 1,
                    backgroundColor: '#8E1616',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#a31e1e',
                    },
                }}
                variant="contained"
                onClick={() =>
                    navigate(`${ROUTES.PRODUTOS}${ROUTES.PRODUTOS_CADASTRAR}`)
                }
            >
                Adicionar produto
            </Button>
        </Fragment>
    );
};
