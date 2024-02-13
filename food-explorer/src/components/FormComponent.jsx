import React, { useState } from 'react';

function FormComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para o login
        console.log('Usuário:', username);
        console.log('Senha:', password);
        // Limpar os campos de entrada após o envio do formulário
        setUsername('');
        setPassword('');
    };

    return (
        <div className="right">
            <div className="login-container">
                <form onSubmit={handleLogin}>
                    <h2>Faça Login</h2>
                    <div>
                    <label htmlFor="email">Email</label>
                    <br />
                        <input
                            type="text"
                            placeholder="Exemplo: exemplo@exemplo.com.br"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                    <label htmlFor="senha">Senha</label><br />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default FormComponent;
