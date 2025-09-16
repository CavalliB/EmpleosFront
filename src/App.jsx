import { useState, useEffect } from "react";
import adService from "./services/ad";
import companyService from "./services/company";
import "./App.css";

function App() {
  const [section, setSection] = useState("home");
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
    adService.getAll().then((data) => setAd(data));
  }, []);

  useEffect(() => {
    companyService.getAll().then((data) => setCompany(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormAd((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAd = {
      ...formAd,
      date: new Date().toLocaleDateString(),
    };

    adService.create(newAd).then((returnedAd) => {
      setAd(ad.concat(returnedAd));
      
      if (!company.some((c) => c.name === formAd.company)) {
        const newCompany = { name: formAd.company };
        companyService.create(newCompany).then((returnedCompany) => {
          setCompany(company.concat(returnedCompany));
        });
      }

      setFormAd({
        title: "",
        description: "",
        location: "",
        type: "On-Site",
        time: "Full-time",
        company: "",
        date: "",
      });
      setSection("anuncios"); 
    });
  };

  return (
    <div>
      {/* Página principal */}
      <section style={{ display: section === "home" ? "block" : "none" }}>
        <h1>Bienvenido a BuscaTuChambeador!</h1>
        <button onClick={() => setSection("anuncios")}>Ver Anuncios</button>
        <button onClick={() => setSection("empresas")}>Ver Empresas</button>
        <button onClick={() => setSection("publicar")}>Publicar Anuncio</button>
      </section>

      {/* Sección Anuncios */}
      <section style={{ display: section === "anuncios" ? "block" : "none" }}>
        <h1>Lista de empleos</h1>
        <ul>
          {ad.map((e) => (
            <li key={e.id}>
              <strong>{e.title}</strong> <br />
              Descripción: {e.description} <br />
              Ubicación: {e.location} <br />
              Tipo: {e.type} ({e.time}) <br />
              Empresa: {e.company} <br />
              Fecha: {e.date}
            </li>
          ))}
        </ul>
        <button onClick={() => setSection("home")}>Volver</button>
      </section>

      {/* Sección Empresas */}
      <section style={{ display: section === "empresas" ? "block" : "none" }}>
        <h1>Lista de empresas</h1>
        <ul>
          {company.map((c) => (
            <li key={c.id}>{c.name}</li>
          ))}
        </ul>
        <button onClick={() => setSection("home")}>Volver</button>
      </section>

      {/* Sección Publicar */}
      <section style={{ display: section === "publicar" ? "block" : "none" }}>
        <h1>Publicar nuevo empleo</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Título del puesto:
            <input
              name="title"
              value={formAd.title}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Descripción:
            <input
              name="description"
              value={formAd.description}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Ubicación:
            <input
              name="location"
              value={formAd.location}
              onChange={handleChange}
              required
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
            <select name="time" value={formAd.time} onChange={handleChange}>
              <option value="Full-time">Full time</option>
              <option value="Part-time">Part time</option>
              <option value="Freelance">Freelance</option>
            </select>
          </label>
          <br />
          <label>
            Empresa:
            <input
              list="companies"
              name="company"
              value={formAd.company}
              onChange={handleChange}
              placeholder="Escribe o selecciona una empresa"
              required
            />
            <datalist id="companies">
              {company.map((c) => (
                <option key={c.id} value={c.name} />
              ))}
            </datalist>
          </label>
          <br />
          <p>Fecha de publicación: {new Date().toLocaleDateString()}</p>

          <button type="submit">Publicar</button>
        </form>
        <button onClick={() => setSection("home")}>Volver</button>
      </section>
    </div>
  );
}

export default App;
