import React, {useEffect, useState} from "react"

// Importando libreria para protocolos http
import axios from "axios"
export const Giphy = () =>{


    // Hook para obtener la info
    const [data, setData] =  useState([])
    const [search, setSearch] = useState("");
    

    useEffect(() => {

        // Fetch, creando el request a Giphy mediante promesas y protocolos http Axios
        const fetchData = async () => {

            // Indicamos la url para consultar la info
            const results = await axios("https://api.giphy.com/v1/gifs/trending" , {

                // Indicamos los parametros para la consulta de la API
                params:{
                    // Clave generada
                    api_key: 'rShgR7aWCtcgeC08WAHos3eR1CuRDjy1',
                    // Cantidad de GIFs generados
                    limit: 100
                }
            });

            console.log(results)

            // Obtener la info de los 50 elementos mediante la ruta: data/data
            setData(results.data.data)
        }

        fetchData()

    },[]);

    const renderGifs = () => {

        return data.map(imagenes => {

            return(
                // Imprimiendo en div los gifs, sacando la info de los componentes mediante la ruta 
                <div key={imagenes.id} className="col gif fade-in-image">

                  
                    <img src = {imagenes.images.fixed_height.url}/>
                </div>
            )
        })

    }

    const handleSearchChange = event => {
        setSearch(event.target.value);
    };
    
    const handleSubmit = async event => {

        //Evitar que se recargue la pagina
        event.preventDefault();
        
          // Solicitar info de la API
          const results = await axios("https://api.giphy.com/v1/gifs/search", {
            params: {
              api_key: "rShgR7aWCtcgeC08WAHos3eR1CuRDjy1",
              q: search,
              limit: 100
            }
        });
        setData(results.data.data);
       
    };

    

    return (
        <>

            <div id= 'search-bar'>

                <form>
                    <input
                    value={search}
                    onChange={handleSearchChange}
                    type="text"
                    placeholder="Busca tus GIF's aquí!"
                    className="input-style"
                    />
                    <button
                    onClick={handleSubmit}
                    type="submit"
                    className="button-style"
                    >
                    Buscar
                    </button>
                </form>
                                    
            </div>

            <h3 class = 'no-margin-bottom category-subtitle'>Categorias</h3>

            <div id = 'border'>

            </div>

            <div id='gif-box' className='row'>

                {renderGifs()}           
                    

            </div>
            
        </>
        
    
    );
}