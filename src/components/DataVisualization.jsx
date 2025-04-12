/*import React, {Component, useEffect, useState} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    BarChart, Bar
  } from 'recharts';
//import { Link } from 'react-router-dom';
//import recharts from 'recharts';
import '/src/App.css';

const DataVisualization = () => {
    const [histData, setHistData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
            'https://www.amiiboapi.com/api/amiibo/'
      );
      const json = await response.json()
      setHist(json.amiibo)
    };
    getCoinHist().catch(console.error);
 }, [,])

    const countAmiiboSeries = (amiibo) => {
        const amiiboSeriesCount = amiibo.reduce((acc, item) => {
            acc[item.amiiboSeries] = (acc[item.amiiboSeries] || 0) + 1;
            return acc;
        }, {});
        return amiiboSeriesCount;
    };


      const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
        return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`value: ${value}`}</text>;
      };
      const renderBarChart = (
        <BarChart width={600} height={300} data={data}>
          <XAxis dataKey="amiiboseries" interval={0} angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Bar dataKey="count" fill="#8884d8"/>
        </BarChart>
      );
            
    
    return (
    <div>
        {histData ? (
            <div></div>
        ) : null}
      <h1>Data Visualization</h1>
      <p>This is the data visualization component.</p>
        <h2>Bar Chart</h2>
        <BarChart width={600} height={300} data={data}>
          <XAxis dataKey="amiiboseries" interval={0} angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="count" fill="#8884d8" label={renderCustomBarLabel} />
        </BarChart>
    </div>
  );
}*/
//export default DataVisualization;