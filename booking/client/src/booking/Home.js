import { useEffect, useState } from "react";


import { allHotels } from "../actions/hotel";


const Home = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    loadAllhotels();
  }, []);

  const loadAllhotels = async () => {
    let res = await allHotels();
    
    setHotels(res.data);
  };
    
  return (
    <>
      <div className='container-fluid bg-secondary p-5 text-center'>
        <h1>All Hotels</h1>
      </div>
      <div className="container-fluid">
        
             <pre>{JSON.stringify(hotels, null, 4)}</pre>  
             
             
        
      </div>
    
    </>
  );
}

export default Home;