import { useState } from "react";
import Card from "./Card";

function Dashboard(props) {

 
  return (
    <div className="dashboard">
        

      <div className="main-dash">
        <input
          type="text"
          placeholder="Search Amiibos..."
          onChange={(e) => props.searchItem(e.target.value)}
        />
        <form>
          <label>Type (Card/Figure/Yarn):</label>
        <input
          type="range"
          min="0"
          max="2"
          onChange={
            (e) => props.searchAttribute(e.target.value, "type")}
        />
        </form>

        <div className="list">
        <div className="item-titles">
              <h3 className="character" >Character</h3>
              <h3 className="amiibo Series">Amiibo Series</h3>
              <h3 className="type"> Type</h3>
              <h3 className="details">Details</h3>
            </div>
            <div>
              
          {props.search==""  ? ( 
          props.list.map((item, index) => (
            <div key={index} className="amiibo-item">
              <p className="character">{item.character}</p>
              <p className="amiiboSeries">{item.amiiboSeries}</p>
              <p className="type">{item.type}</p>
              <a href="Card.jsx" className="details" onClick={<Card item={item}></Card>}>Learn More</a>
            </div>
           
          ))
        ) : (
          props.filteredResults.map((item, index) => (
          <div key={index} className="amiibo-item">
              <p className="character">{item.character}</p>
              <p className="amiiboSeries">{item.amiiboSeries}</p>
            <p className="type">{item.type}</p>
            <a href="Card.jsx" className="details" onClick={<Card item={item}></Card>}>Learn More</a>
            
          </div>
         
        )))}
         
        
      </div>
          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;