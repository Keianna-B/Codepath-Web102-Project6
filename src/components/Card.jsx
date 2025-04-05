import { use } from "react";

const Card = (item) => {

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
              `https://www.amiiboapi.com/api/amiibo/?name=${name}`
            )
            const data = await response.json()
            setList(data)
            console.log(data)
            console.log(data.length)
          } 
        fetchData().catch(console.error)
      }
    , []);

    return (
      <>
        <div className="ammibo-card">
        <h1 className="card-title">Amiibo: {item.name}</h1>
        <h3>Amiibo Series: {item.amiiboSeries}</h3>
        <h3>Game Series: {item.gameSeries}</h3>
        <h1>Type: {item.type}</h1>
        <h3>Release Date: {item.releaseDate}</h3>
        <h3>Image:</h3>
        <img src={item.image} alt={item.name} className="card-image" /> 
        </div>

        
<div className="mini-card">
<img src={imageUrl} alt={title} className="mini-card-image" />
<h2 className="mini-card-title">{title}</h2>
<p className="mini-card-description">{description}</p>
</div>
    <div className="mini-card">
      <img src={imageUrl} alt={title} className="mini-card-image" />
      <h2 className="mini-card-title">{title}</h2>
      <p className="mini-card-description">{description}</p>
    </div>
    </>
    );
};
export default Card;


