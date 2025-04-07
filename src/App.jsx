import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Amiibo from './components/Amiibo';
import {Link} from "react-router-dom";
import {useRoutes} from "react-router-dom";



function App() {
  const [list, setList] = useState([]);
  const [filteredResults, setFilteredResults] = useState(list);
  const [search, setSearch] = useState(""  );
  const [attribute, setAttribute] = useState('');
  const [amiiboSeries, setAmiiboSeries] = useState([]);
  const [gameSeries, setGameSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(
          'https://www.amiiboapi.com/api/amiibo/'
        )
        const data = await response.json()
        setList(data.amiibo)
      } 
    fetchData().catch(console.error)

    const fetchGameSeries = async () => {
      const response = await fetch(
        `https://www.amiiboapi.com/api/gameseries/`
      )
      const data = await response.json()
      setGameSeries(data.amiibo)
    }
    fetchGameSeries().catch(console.error)

    const fetchAmiiboSeries = async () => {
      const response = await fetch(
        `https://www.amiiboapi.com/api/amiiboseries/`
      )
      const data = await response.json()
      setAmiiboSeries(data.amiibo)
    }
    fetchAmiiboSeries().catch(console.error)


  }, [])




 const getAmiiboSeries = async () => {
  for(let i = 0; i < amiiboSeries.length; i++) {
    if(mostCommonAmiiboSeriesCount !== 0) {
      list.contain(amiiboSeries[i].name);
    }
  }
 }

  const searchItem = (searchValue, attribute) => {
    if (searchValue !== "") {
      if(attribute === "name") {
        setSearch(searchValue);
        const amiibos = list.filter((item)=>item.name.toLowerCase().includes(searchValue.toLowerCase()));
        setFilteredResults(amiibos);
      }
      else if(attribute === "type") {
        const amiibos = list.filter((item)=>item.type.toLowerCase().includes(searchValue.toLowerCase()));
        setFilteredResults(amiibos);
      }
    } 
    else {
      setFilteredResults(list);
    }

  };

  const filterType = (attributeValue) => {
    if(attributeValue === "0") {
      attributeValue = "Card";
    }
    else if(attributeValue === "1") {
      attributeValue = "Figure";
    }
    else if(attributeValue === "2") {
      attributeValue = "Yarn";
    }
    else {
      attributeValue = "";
    }
    setAttribute(attributeValue);
    if (attributeValue !== "") {
      searchItem(attributeValue, "type");
      /*
      if(filteredResults.length > 0) {

        searchItem(search, attribute);
        //const amiibos = filteredResults.filter((item)=>item.type.toLowerCase().includes(attributeValue.toLowerCase()));
      }
      else{

        //const amiibos = list.filter((item)=>item.type.toLowerCase().includes(attributeValue.toLowerCase()));
      }*/
      setFilteredResults(amiibos);
    } 
  }


  return (
    <>
      <div className="whole-page">
      <NavBar />
      <div className="sub-dash">
        <div className="sub-section">
          <h1>{list.length}</h1>
          <h3>Amiibos</h3>
          </div>
          <div className="sub-section">
          <h1>{gameSeries.length}</h1>
          <h3>Game Series</h3>
          </div>
          <div className="sub-section">
          <h1>{amiiboSeries.length}</h1>
          <h3>Amiibo Series: </h3>
        </div>
      </div>

        <div className="header">
          <h1>Amiibo Search</h1>
          <h4>Find an amiibo by its name.</h4>
        
          <input
              type="text"
              placeholder="Search Amiibos..."
              onChange={(inputString) => searchItem(inputString.target.value, "name")}
            />
          <form>
            <label>Type (Card/Figure/Yarn/All):</label>
            <input
              type="range"
              min="0"
              max="3"
              onChange={
                (e) => props.filterType(e.target.value)}
            />
          </form>
        </div>

        <br></br>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Game Series</th>
              <th>Amiibo Series</th>
              <th>Type</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
           {filteredResults.length > 0
                ?(filteredResults.map((item) => (
                  <tr key={item.head+item.tail}>
                    <td>{item.name}</td>
                    <td>{item.gameSeries}</td>
                    <td>{item.amiiboSeries}</td>
                    <td>{item.type}</td>
                    <td>
                      <Link 
                      to={`/amiibo/${item.head+item.tail}`}
                      key={`${item.head+item.tail}`}>
                        More Info
                      </Link>
                    </td>
                </tr>
              )))
              :(list && list.map((item) => (
                <tr key={item.head+item.tail}>
                        <td>{item.name}</td>
                        <td>{item.gameSeries}</td>
                        <td>{item.amiiboSeries}</td>
                        <td>{item.type}</td>
                        <td>
                        <Link 
                        to={`/amiibo/${item.head+item.tail}`}
                        key={`${item.head+item.tail}`}>
                        
                        More Info
                      </Link>
                        </td>
                    </tr>
              )))
              }
          </tbody>
         
        </table>

      </div>
    </>
  )
}

export default App
