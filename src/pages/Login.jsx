import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    if (!email || !password) {
      alert("Preencha o e-mail e a senha.");
      return;
    }

    try {
      const response = await api.post("/users/login", {
        email,
        password
      });

      const token = response.data.token;

      if (!token) {
        alert("O servidor não retornou o token.");
        return;
      }

      localStorage.setItem("token", token);

      alert("Login realizado com sucesso!");
      navigate("/home");

    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(
          error.response.data?.mensagem ||
          error.response.data?.message ||
          "E-mail ou senha inválidos."
        );
      } else {
        alert("Não foi possível conectar ao servidor.");
      }
    }
  }
  return (
    <div className="container">
      <div className="login-box">
        <h1>Login</h1>
        <p>Entre na sua conta</p>

        <form onSubmit={handleLogin}>
          <input type="email"
            placeholder="Digite seu e-mail"
            id="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <input type="password"
            placeholder="Digite sua senha"
            id="senha"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          <button type="submit">Entrar</button>
        </form>

        <p className="cadastro-link">
            Já possui uma conta?

            <Link to="/cadastro">
              Entrar
            </Link>

        </p>
      </div>
    </div>
  );
}

export default Login;