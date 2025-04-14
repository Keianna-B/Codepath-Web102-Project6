import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar';
import Amiibo from './components/Amiibo';
//import DataVisualization from './components/DataVisualization';
import {Link} from "react-router-dom";
import {useRoutes} from "react-router-dom";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar
} from 'recharts';



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

  const countReleaseYear = list.reduce((acc, item) => {
    let year;
    if(item.release.na){
      year = item.release.na.split("-")[0];
    }
    else if(item.release.jp){
      year = item.release.jp?.split("-")[0];
    }
    //const month = item.release.jp.split("-")[1];
    //const day = item.release.jp.split("-")[2];
    if (year) {
      acc[year] = (acc[year] || 0) + 1;

    }
    return acc;
  }, {});
 
  const formattedReleaseYearCount = Object.entries(countReleaseYear).map(([key, value]) => ({
    year: key,
    count: value,
  }));
  

  const countAmiiboSeries = list.reduce((acc, item) => {
      acc[item.amiiboSeries] = (acc[item.amiiboSeries] || 0) + 1;
      return acc;
  }, {});
    
  const formattedAmiiboSeriesCount = Object.entries(countAmiiboSeries).map(([key, value]) => ({
  amiiboSeries: key,
  count: value,
}));

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
      switch (attribute.toLowerCase()) {
        case "name":
          amiibos = amiibos.filter((item)=>item.name.toLowerCase().includes(searchValue.toLowerCase()));
          break;
        case "gameseries":
          amiibos = amiibos.filter((item)=>item.gameSeries.toLowerCase().includes(searchValue.toLowerCase()));
          break;
        case "amiiboseries":
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

      <div className="graphs">
        <h2>Bar chart of # amiibos in each amiibo series</h2>
        <BarChart width={600} height={300} data={formattedAmiiboSeriesCount}>
          <XAxis dataKey="amiiboSeries" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="5 5" />
          <Bar dataKey="count" fill="#FF0016" />
        </BarChart>

        <h2>Line graph of # amiibos released by year</h2>
        <LineChart width={600} height={300} data={formattedReleaseYearCount}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#FF0016" />
        </LineChart>
      </div>

      <div className="header">
        <h2>Search</h2>
        <h4>Find an amiibo by its name. Or filter any attribute in the format:</h4>
        <p>attribute:attributeName/attribute2:attribute2Name/...</p>
      </div>
      <div className="search-bar">
        <input
            type="text"
            placeholder="Search Amiibos..."
            onChange={(inputString) => searchItem(inputString.target.value, "name")}
          />
          <select className="select" onChange={(e) => searchItem(e.target.value, "type")}>
            <option value="">All Types</option>
            <option value="Card">Card</option>
            <option value="Figure">Figure</option>
            <option value="Yarn">Yarn</option>
          </select>
        </div>

        <br></br>

        <table className="amiibo-table">
          <thead>
            <tr className="table-header">
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
  )
}

export default App
