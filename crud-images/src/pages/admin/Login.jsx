import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Login() {
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");

  const usenavigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  console.log("API_URL =", API_URL); // Pour tester si elle est bien lue

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("proceed");
      fetch(`${API_URL}/user/` + username)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          // console.log(resp);
          if (Object.keys(resp).length === 0) {
            toast.error("Merci d'entrer un nom d'utilisateur valide");
          } else {
            if (resp.password === password) {
              toast.success("Vous êtes bien connecté !");
              sessionStorage.setItem("username", username);
              usenavigate("/products");
            } else {
              toast.error(
                "Merci d'entrer des informations d'identification valides"
              );
            }
          }
        })
        .catch((err) => {
          toast.error("Login echoué à cause de :" + err.message);
        });
    }
  };
  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Merci de renseigner votre nom d'admin");
    }
    if (password === "" || username === null) {
      result = false;
      toast.warning("Merci de renseigner votre mot de passe");
    }
    return result;
  };
  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6">
        <form onSubmit={ProceedLogin} className="container">
          <div className="card">
            <div className="card-header">
              <h2>Log In</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>
                  Nom<span className="errmsg">*</span>
                </label>

                <input
                  className="form-control"
                  value={username}
                  onChange={(e) => usernameupdate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>
                  Mot de passe<span className="errmsg">*</span>
                </label>

                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => passwordupdate(e.target.value)}
                />
              </div>
            </div>

            <div className="card-footer" />
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
