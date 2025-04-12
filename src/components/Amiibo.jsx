import { Component, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '/src/App.css';


function Amiibo () {
  let params = useParams();
  const [item, setItem] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
              `https://www.amiiboapi.com/api/amiibo/?id=${params.id}`
            )
            const data = await response.json()
            setItem(data.amiibo)
            console.log(data)
          } 
        fetchData().catch(console.error)
        const fetchGameSeries = async () => {
          const response = await fetch(
            `https://www.amiiboapi.com/api/amiibo/`
          )
          const data = await response.json()
          setItem(data.amiibo)
        }
      }
    , []);

    return (
      <div className="amiibo-card">
        <h1 className="card-title">Amiibo: {item.name}</h1>
        <h3>Character: {item.character}</h3>
        <h3>Amiibo Series: {item.amiiboSeries}</h3>
        <h3>Game Series: {item.gameSeries}</h3>
        <h3>Type: {item.type}</h3>
        {item.release?(
          <>
          {item.release.na ? (
            <h3>North American Release Date: {item.release.na}</h3>
          ) : (
            <>
            <h3>Not released in North America</h3>
            {item.release.jp ? (
              <h3>Japanese Release Date: {item.release.jp}</h3>
            ) : (
              <h3>Not released in Japan</h3>
            )}
            </>
          )}
          </>
          ):(
          <h3>Release Date not found</h3>
        )}
        <h3>Image:</h3>
        <img src={item.image} alt={item.name} className="card-image" /> 
        <div>
          <Link to="/" className="back-link">Back to Dashboard</Link>
        </div>
      </div>
    );
};
export default Amiibo;


