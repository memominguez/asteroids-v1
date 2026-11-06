import { useState, useEffect } from "react";

import spinner from "../assets/loading-gif.gif";

export default function AsteroidRecord(props) {
  const { asteroidID, asteroidName, hideAsteroid } = props;

  const [asteroidData, setAsteroidData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function oneDecimal(value) {
    return Number(value).toFixed(1);
  }

  useEffect(() => {
    async function fetchAsteroid(asteroidID) {
      setIsLoading(true);

      try {
        const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
        const url = `https://api.nasa.gov/neo/rest/v1/neo/${asteroidID}?api_key=${NASA_KEY}`;

        const res = await fetch(url);
        const apiData = await res.json();
        setAsteroidData(apiData.close_approach_data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAsteroid(asteroidID);
  }, [asteroidID]);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <img src={spinner} alt="" className="spinner" />
      </div>
    );
  }

  return (
    <section className="historic-info">
      <h1>
        Acercamientos del asteroide: <span>{asteroidName}</span>
      </h1>
      <button className="hide-button" onClick={hideAsteroid}>
        Cerrar vista
      </button>
      <table className="second-table">
        <tr>
          <th style={{ width: "50%" }}>Fecha</th>
          <th style={{ width: "50%" }}>Distancia <br/> ( lunar = 1 )</th>
        </tr>

        {asteroidData?.map((asteroid, index) => {
          return (
            <tr key={index}>
              <td>{asteroid.close_approach_date}</td>
              <td>{oneDecimal(asteroid.miss_distance.lunar)}</td>
            </tr>
          );
        })}
      </table>
    </section>
  );
}
