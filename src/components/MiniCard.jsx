import { use } from "react";

const MiniCard = ({ id, name, gameSeries, amiiboSeries, type}) => {
    const [label, setLabel] = useState(null);

    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
              `https://www.amiiboapi.com/api/amiibo/?id=${id}`
            )
            const data = await response.json()
            console.log(data)
            setLabel(data)
          } 
        fetchData().catch(console.error)
      }, []);

    return (
        <>
            { label ? (
                <>
                    <tr key={id}>
                        <td>{name}</td>
                        <td>{gameSeries}</td>
                        <td>{amiiboSeries}</td>
                        <td>{type}</td>
                    </tr>
                </>
            ) :
            null
            }
        </>
    );
}