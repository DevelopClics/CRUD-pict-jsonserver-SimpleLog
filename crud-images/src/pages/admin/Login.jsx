import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // ⬅️ récupère le login du contexte

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService(id, password); // appel API login
      login(user); // ⬅️ met à jour le contexte Auth
      navigate("/products"); // redirection après login
    } catch (err) {
      setError("Identifiants invalides");
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">
            Identifiant
          </label>
          <input
            id="id"
            type="text"
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Connexion
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
