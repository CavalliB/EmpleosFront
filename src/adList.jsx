const AdList = ({ ad, filter, setSection }) => {
  const filteredAds = filter
    ? ad.filter((a) =>
        a.title.toLowerCase().includes(filter.toLowerCase())
      )
    : ad;

  return (
    <div>
      <ul>
        {filteredAds.map((a) => (
          <li key={a.id}>
            <strong>{a.title}</strong> <br />
            Descripción: {a.description} <br />
            Ubicación: {a.location} <br />
            Tipo: {a.type} ({a.time}) <br />
            Empresa: {a.company} <br />
            Fecha: {a.date}
          </li>
        ))}
      </ul>
      <button onClick={() => setSection("home")}>Volver</button>
    </div>
  );
};

export default AdList;
