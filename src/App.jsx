import { useState } from "react";
import { useEffect } from "react";
import adService from "./services/ad";
import companyService from "./services/company";
import "./App.css";

function App() {
  const [ad, setAd] = useState([]);
  const [company, setCompany] = useState([]);
  const [formAd, setFormAd] = useState({
    title: "",
    description: "",
    location: "",
    type: "On-Site",
    time: "Full-time",
    company: "",
    date: "",
  });

  useEffect(() => {
    adService.getAll().then((data) => {
      setAd(data);
    });
  }, []);

  useEffect(() => {
    companyService.getAll().then((data) => {
      setCompany(data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormAd((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formAd);
    const newAd = {
      title: formAd.title,
      description: formAd.description,
      location: formAd.location,
      type: formAd.type,
      time: formAd.time,
      company: formAd.company,
      date: new Date().toLocaleDateString(),
    };

    adService.create(newAd).then((returnedAd) => {
      setAd(ad.concat(returnedAd));
      setFormAd({
        title: "",
        description: "",
        location: "",
        type: "On-Site",
        time: "Full-time",
        company: "",
        date: "",
      });
    });
  };

  return (
    <>
      <div>
        <h1>Lista de empleos</h1>
        <ul>
          {ad.map((e) => (
            <li key={e.id}>
              <strong>{e.title}</strong>
              <br />
              Descripción: {e.description}
              <br />
              Ubicación: {e.location}
              <br />
              Tipo: {e.type} ({e.time})
              <br />
              Empresa: {e.company}
              <br />
              Fecha: {e.date}
            </li>
          ))}
        </ul>

        <h1>Lista de empresas</h1>
        <ul>
          {company.map((c) => (
            <li key={c.id}>{c.name}</li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <h1>Bienvenido a BuscaTuChambeador!</h1>

        <label>
          Titulo del trabajo asignado:
          <input name="title" value={formAd.title} onChange={handleChange} />
        </label>
        <br />
        <label>
          Descripcion del laburo:
          <input
            name="description"
            value={formAd.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Ubicacion:
          <input
            name="location"
            value={formAd.location}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Tipo de modalidad:
          <select name="type" value={formAd.type} onChange={handleChange}>
            <option value="On-Site">On-Site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </label>
        <br />
        <label>
          Tipo de empleo:
          <select name="type" value={formAd.type} onChange={handleChange}>
            <option value="fulltime">Full time</option>
            <option value="parttime">Part time</option>
            <option value="freelance">Freelance</option>
          </select>
        </label>
        <br />
        <label>
          Empresa que ofrece el empleo:
          <input
            list="companies"
            name="company"
            value={formAd.company}
            onChange={handleChange}
            placeholder="Escribe o selecciona una empresa"
          />
          <datalist id="companies">
            {company.map((c) => (
              <option key={c.id} value={c.name} />
            ))}
          </datalist>
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
