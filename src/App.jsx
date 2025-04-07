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
  ///const [attribute, setAttribute] = useState('');
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
    const searchArray = searchValue.split("/");
    let amiibos = list;
    for (let i = 0; i < searchArray.length; i++) {
      const searchInput = searchArray[i].split(":");
      if (searchInput.length == 1) {
        attribute = "name";
        searchValue = searchInput[0];
      }
      else{
        attribute = searchInput[0];
        searchValue = searchInput[1];
      }
      setSearch(searchValue);
      switch (attribute) {
        case "name":
          amiibos = amiibos.filter((item)=>item.name.toLowerCase().includes(searchValue.toLowerCase()));
          break;
        case "gameSeries":
          amiibos = amiibos.filter((item)=>item.gameSeries.toLowerCase().includes(searchValue.toLowerCase()));
          break;
        case "amiiboSeries":
          amiibos = amiibos.filter((item)=>item.amiiboSeries.toLowerCase().includes(searchValue.toLowerCase()));
          break;
        case "character":
          amiibos = amiibos.filter((item)=>item.character.toLowerCase().includes(searchValue.toLowerCase()));
          break;
        case "type":
          amiibos = amiibos.filter((item)=>item.type.toLowerCase().includes(searchValue.toLowerCase()));
          break;
        default:
          amiibos = amiibos.filter((item)=>item.name.toLowerCase().includes(searchValue.toLowerCase()));
          break;
      }
      setFilteredResults(amiibos);
  }

  };


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
          <h4>Find an amiibo by its name. Or search any attribute in the format:</h4>
          <p>attribute:attributeName/attribute2:attribute2Name/...</p>
          </div>
        <div className="search-bar">
          <input
              type="text"
              placeholder="Search Amiibos..."
              onChange={(inputString) => searchItem(inputString.target.value, "name")}
            />
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
