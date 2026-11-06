import { useState } from "react";
import AsteroidRecord from "./AsteroidRecord";

export default function MainTable(props) {
  const { data } = props;

  const [showRecord, setShowRecord] = useState(false);
  const [asteroidID, setAsteroidID] = useState("");
  const [asteroidName, setAsteroidName] = useState("");

  function redString(str) {
    const match = str.match(/\((.*?)\)/);
    const result = match ? match[1] : "";
    return result;
  }

  function oneDecimal(value) {
    return Number(value).toFixed(1);
  }

  function showAsteroid(idStr, name) {
    setAsteroidID(idStr);
    setAsteroidName(redString(name));
    setShowRecord(true);
  }

  function hideAsteroid() {
    setShowRecord(false);
  }
 
  return (
    <>
      <section className="main-info">
        <table className="main-table">
          <tr>
            <th style={{ width: "30%" }}>Nombre</th>
            <th style={{ width: "20%" }}>Distancia</th>
            <th colSpan="2" style={{ width: "30%" }}>
              Diámetro, metros
            </th>
            <th style={{ width: "20%" }}>Velocidad</th>
          </tr>
          <tr>
            <th></th>
            <th>( lunar = 1 )</th>
            <th>Min</th>
            <th>Max</th>
            <th>Km/h</th>
          </tr>

          {data?.map((item) => {
            return (
              <tr key={item.id}>
                <td>              
                  <div
                    className={
                      item.is_potentially_hazardous_asteroid
                        ? "name-cell danger"
                        : "name-cell"
                    }
                  >
                    {redString(item.name)}
                    <button
                      className="see-button"
                      onClick={() => showAsteroid(item.id, item.name)}
                    >
                      Ver
                    </button>
                  </div>
                </td>

                <td>
                  {oneDecimal(item.close_approach_data[0].miss_distance.lunar)}
                </td>
                <td>
                  {oneDecimal(
                    item.estimated_diameter.meters.estimated_diameter_min,
                  )}
                </td>
                <td>
                  {oneDecimal(
                    item.estimated_diameter.meters.estimated_diameter_max,
                  )}
                </td>
                <td>
                  {Math.round(
                    Number(
                      item.close_approach_data[0].relative_velocity
                        .kilometers_per_hour,
                    ),
                  )}
                </td>
              </tr>
            );
          })}
        </table>
      </section>

      {showRecord && (
        <AsteroidRecord
          asteroidName={asteroidName}
          asteroidID={asteroidID}
          hideAsteroid={hideAsteroid}
        />
      )}
    </>
  );
}
