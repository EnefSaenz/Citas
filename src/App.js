import React, { Fragment, useState, useEffect } from "react";
import Cita from "./components/Cita";

// Importando Componentes
import Formulario from "./components/Formulario";

function App() {
  // Citas en sessionStorage
  let citasIniciales = JSON.parse(sessionStorage.getItem("citas"));
  if (!citasIniciales) citasIniciales = [];

  // Arreglo de citas
  const [citas, saveCitas] = useState(citasIniciales);

  // Use Effect para
  useEffect(() => {
    citasIniciales
      ? sessionStorage.setItem("citas", JSON.stringify(citas))
      : sessionStorage.setItem("citas", JSON.stringify([]));
  }, [citas, citasIniciales]);

  // Función que tome las citas actuales
  const createCita = (cita) => {
    saveCitas([...citas, cita]);
  };

  // Función que elimina la cita
  const deleteCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    saveCitas(nuevasCitas);
  };

  // Mensaje Condicional
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario createCita={createCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} deleteCita={deleteCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
