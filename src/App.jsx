import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [Empresa, setEmpresa] = useState({title: '', description: '', location: '', type:'', company:'', date:''});

  return (
    <>
<form>
      <h1>Bienvenido a BuscaTuChambeador!</h1>

      <label>Titulo del trabajo asignado: 
      <input name='title' value = {Empresa.title} />
      </label>
<br />
      <label>Descripcion del laburo: 
      <input name='description' value = {Empresa.description} />
      </label>
<br />
      <label>Ubicacion: 
      <input name='location' value = {Empresa.location} />
      </label>
<br />
      <label>Tipo de empleo: 
      <select name='type' value={Empresa.type}>
        <option value="fulltime">Full time</option>
        <option value="parttime">Part time</option>   
        <option value="freelance">Freelance</option>
      </select>
      </label>
<br />      
      <label>Empresa que ofrece el empleo: 
      <input name='company' value = {Empresa.company} />
      </label>
<br />
    <label >Fecha de publicacion: 
    </label>
    <p>{new Date().toLocaleDateString()}</p>

      <button type="submit">Buscar mi Chambeador!</button>
</form>
    </>
  )
}

export default App
