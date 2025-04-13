import React, { useEffect, useState } from 'react';
import { getUsers, createUser } from '../../../api/userService';

export const Home = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(formData)
            .then(() => {
                setFormData({ username: '', email: '', password: '' });
                fetchUsers();
            })
            .catch(() => {
                setError('Erro ao cadastrar usuário');
            });
    };

    return (
        <div style={{ padding: '2rem' }}>
            <section style={{ marginBottom: '3rem' }}>
                <h2>Cadastro de Usuário</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username: </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Senha: </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Cadastrar</button>
                </form>
            </section>
            <section>
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
            </section>
        </div>
    );
};
