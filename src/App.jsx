import { useState, useEffect } from "react";
import Header from "./components/Header";
import MainTable from "./components/MainTable";
import spinner from "./assets/loading-gif.gif"
// import DUMMY from "./dummyData.js"


function getYesterday() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const yy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const yesterday = getYesterday();

    async function fetchAPIData() {
      setIsLoading(true);

      try {
        const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
        const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${yesterday}&end_date=${yesterday}&api_key=${NASA_KEY}`;

        const res = await fetch(url);
        const apiData = await res.json();
        setData(apiData.near_earth_objects[yesterday]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAPIData();
  }, []);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <img src={spinner} alt="" className="spinner"/>
      </div>
    )
  }

  return (
    <main>
      <Header date={getYesterday()} />
      <MainTable data={data} />
    </main>
  );
}

export default App;
