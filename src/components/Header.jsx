export default function Header({ date }) {
  return (
    <header>
      <h1>ASTEROIDES CERCANOS</h1>
      <h3>Algunos con riesgo de colisión</h3>
      <h3>
        Actualización diaria: <span>{date}</span>
      </h3>
      <p>Página web por:&nbsp; Guillermo E. Domínguez</p>
      <p>Fuente:&nbsp; Base de datos de la NASA</p>
      <p>(Marcador rojizo si el asteroide es peligroso)</p>
    </header>
  );
}
