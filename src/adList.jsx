const AdList = ({ ad, filter,filter2, setSection }) => {
  const filteredAds = filter 
    ? ad.filter((a) =>
        a.title.toLowerCase().includes(filter.toLowerCase())
      )
    : ad;

  const filteredAds2 = filter2 
    ? ad.filter((a) =>
        a.location.toLowerCase().includes(filter2.toLowerCase())
      )
    : ad;

  const interseccion = filteredAds.filter(x => filteredAds2.includes(x));


  return (
    <div>
      <ul>
        {interseccion.map((a) => (
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
