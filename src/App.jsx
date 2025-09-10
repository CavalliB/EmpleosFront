import { useState } from "react";
import "./App.css";

function App() {
  const [Empresa, setEmpresa] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
    company: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresa((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Empresa);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Bienvenido a BuscaTuChambeador!</h1>

        <label>
          Titulo del trabajo asignado:
          <input name="title" value={Empresa.title} onChange={handleChange} />
        </label>
        <br />
        <label>
          Descripcion del laburo:
          <input
            name="description"
            value={Empresa.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Ubicacion:
          <input
            name="location"
            value={Empresa.location}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Tipo de empleo:
          <select name="type" value={Empresa.type} onChange={handleChange}>
            <option value="fulltime">Full time</option>
            <option value="parttime">Part time</option>
            <option value="freelance">Freelance</option>
          </select>
        </label>
        <br />
        <label>
          Empresa que ofrece el empleo:
          <input
            name="company"
            value={Empresa.company}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>Fecha de publicacion:</label>
        <p>{new Date().toLocaleDateString()}</p>

        <button type="submit">Buscar mi Chambeador!</button>
      </form>
    </>
  );
}

export default App;
