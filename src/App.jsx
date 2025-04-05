import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';

function App() {
  const [list, setList] = useState([]);
  const [filteredResults, setFilteredResults] = useState(list);
  const [search, setSearch] = useState(""  );
  const [attribute, searchAttribute] = useState('');
  const [amiiboSeries, setAmiiboSeries] = useState([]);
  let mostComonAmiiboSeries = "";
  let mostCommonAmiiboSeriesCount = 0;

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(
          'https://www.amiiboapi.com/api/amiibo/'
        )
        const data = await response.json()
        setList(data.amiibo)
      } 
    fetchData().catch(console.error)
  }, [])

  const fetchAmiiboSeries = async () => {
    const response = await fetch(
      `https://www.amiiboapi.com/api/amiiboSeries/`
    )
    const data = await response.json()
    setAmiiboSeries(data.amiibo)
  }
 const getAmiiboSeries = async () => {
  for(let i = 0; i < amiiboSeries.length; i++) {
    if(mostCommonAmiiboSeriesCount !== 0) {
      list.contain(amiiboSeries[i].name);
    }
  }
 }

  const searchItem = searchValue => {
    setSearch(searchValue);
    if (searchValue !== "") {
      const amiibos = list.filter((item)=>item.character.toLowerCase().includes(searchValue.toLowerCase()));
      setFilteredResults(amiibos);
    } 
    else {
      setFilteredResults(list);
    }

  };

  const filterAttribute = (attributeValue, attribute) => {
    searchAttribute(attributeValue, attribute);
    if(attributeValue === "0") {
      attributeValue = "Card";
    }
    else if(attributeValue === "1") {
      attributeValue = "Figure";
    }
    else if(attributeValue === "2") {
      attributeValue = "Yarn";
    }
    if (attributeValue !== "" && attribute !== "") {
      const amiibos = list.filter((item)=>item.attribute===attributeValue);
      setFilteredResults(amiibos);
    } 
  }


  return (
      <div className="whole-page">
      <NavBar />
      <div className="sub-dash">
        <div className="sub-section">
          <h1>{list.length}</h1>
          <h3>Amiibos</h3>
          </div>
          <div className="sub-section">
          <h1>{}</h1>
          <h3>Games</h3>
          </div>
          <div className="sub-section">
          <h1></h1>
          <h3>Most Common Amiibo Series: </h3>
        </div>
      </div>


        <div className="header">
        <h1>Amiibo Search</h1>
        <h4>Find an amiibo by its name.</h4>
        
        <input
            type="text"
            placeholder="Search..."
            onChange={(inputString) => searchItem(inputString.target.value)}
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
            </tr>
          </thead>
          <tbody>
          {searchItem.length > 0
                ? (filteredResults.map((item) => (
                <MiniCard 
                  id={item.head + item.tail} 
                  name={item.name}
                  gameSeries={item.gameSeries}
                  amiiboSeries={item.amiiboSeries}
                  type={item.type}
                />
              )))
              :(list && list.map((item) => (
                <MiniCard 
                  id={item.head + item.tail} 
                  name={item.name}
                  gameSeries={item.gameSeries}
                  amiiboSeries={item.amiiboSeries}
                  type={item.type}
                />
                )))
              }
          </tbody>
         
        </table>

      </div>
  )
}

export default App
