import React, { useEffect, useState } from 'react';
import { getUsers } from '../../../api/userService';

export const Home = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        getUsers()
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Erro ao carregar usuários');
                setLoading(false);
            });
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Lista de Usuários</h2>
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <>
                    {users.length === 0 ? (
                        <p>Nenhum usuário cadastrado.</p>
                    ) : (
                        <ul>
                            {users.map((user) => (
                                <li key={user.id}>
                                    <strong>{user.username}</strong> —{' '}
                                    {user.email}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
};
