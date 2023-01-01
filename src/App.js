
import React,{ useEffect,useState } from 'react';
import './App.css';
import axios from "axios"

function App() {
const [data,setData]=useState()
const [allData,setAllData]=useState({})
const[eachData,setEachData]=useState()
const[search,setSearch]=useState("")
const[searchPokemon,setSearchPokemon]=useState(false)
const[errorMessage,setErrorMessage]=useState(false)
const[loading,setLoading]=useState(false)
  useEffect(()=>
  {
     axios.get("https://pokeapi.co/api/v2/pokemon").then((res)=>
     {
      
      setAllData(res.data)
      setData([...res.data.results])
     })
  },[])
  const handlePrevious=()=>
  {
     if(allData.previous)
     {
      axios.get(`${allData.previous}`).then((res)=>
      {
        setAllData(res.data)
      
        setData([...res.data.results])
      })
     }
    
  }
  const handleNext=()=>
  {
    
    if(allData.next)
    {
     axios.get(`${allData.next}`).then((res)=>
     {
      setAllData(res.data)
       
       setData([...res.data.results])
     })
    }
  }
  const handleDetails=(id)=>
  {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res)=>
      {
        console.log(res.data)
        setEachData({...res.data})
      })
  }
  const handleReset=()=>
  {
    setEachData("")
  }
  const handleSearch=(e)=>
  {
    setSearchPokemon(false)
    
      setSearch(e.target.value)
      setErrorMessage(false)
     
  }
  const handleSubmit=async ()=>
  {
    console.log(search)
    if(search.trim()!=="")
    {
      try {
        setLoading(true)
       let res= await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
        if(res.data)
        {
          console.log(res.data)
           
          setSearchPokemon(res.data)
          setLoading(false)
        }
        else
        {
          setErrorMessage("Sorry, pokemon not found")
          setLoading(false)
        }
       } catch (error) {
         
         setSearchPokemon(false)
        
         setSearch("")
         setErrorMessage("Sorry, pokemon not found")
         setLoading(false)
       }
    }
   
  }
  return (
    <div>
    
     
     <header className='position-sticky'>
      <div className='row'>
        <div  style={{backgroundColor:"black", height:"140px"}} className='container d-flex'>
     <div className='col-md-6 p-4 ' >
     
        <div className='d-flex'>
         
      <img alt='logo' style={{width:"220px",height:"170px",marginTop:"-50px" }} src={"https://www.freepnglogos.com/uploads/black-pokemon-logo-transparent-27.png"}></img>
        </div>
      
    </div>
    
    </div>

    </div>
    
      <div style={{height:"100px",backgroundColor:"#ebebe0"}} className='row '>
        <div style={{marginLeft:"30px"}} className='col-md-6'>
        <form style={{marginTop:"30px"}}  className="d-flex" role="search">
        <input style={{width:"300px"}} value={search} onChange={handleSearch} className="form-control me-2" type="text" placeholder="Search by name or Id" ></input>
        <button disabled={loading} onClick={handleSubmit} className="btn btn-dark" type="button">{loading?<div className="spinner-border" role="status"></div>:"Search"}</button>
      </form>
     
        </div>
        
       
      </div>
      </header>
      {errorMessage && <div className="alert alert-danger" style={{width:"500px", marginTop:"20px",marginLeft:"100px"}}  role="alert">
        {errorMessage}
      </div>}
      <div className="App container">
      <section style={{marginTop:"20px"}}>
        <div className='row'>
       {!searchPokemon && data && data.map((datum,index)=>
       {
        return(
          <div className='col-md-3 ' style={{marginTop:"18px"}}>
            <div onClick={()=>handleDetails(datum.url.substring(34).replace("/",""))}  className="card" style={{width: "18rem" ,backgroundColor:"#ffffcc"}}>
            <img style={{height:"200px",marginTop:"10px"}} src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${datum.url.substring(34).replace("/","")}.svg`} className="card-img-top" alt="..."></img>
            <div className="card-body">
             <h5 className="card-title">{datum.name.toUpperCase()}</h5>
             
             <h6>Id: {datum.url.substring(34).replace("/","")}</h6>
             <button data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-outline-success'>Click to open</button>
             
            </div>
             </div>
             {/* modal */}
             <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
       {eachData && <h1 className="modal-title fs-5" id="exampleModalLabel">{eachData.name.toUpperCase()}</h1>} 
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
     {eachData && <img style={{height:"400px", width:"400px"}} src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${eachData.id}.svg`}  alt="..."></img> } 
        <h4 className='text-primary'>Stats</h4>
        {eachData && <div><h6> Height: {eachData.height}</h6>
       <h6> Weight: {eachData.weight}</h6>
       <h6>Base_experience: {eachData.base_experience}</h6>
       <h6> Species: {eachData.species.name}</h6>
       </div>}
       
       
      </div>
      <div class="modal-footer">
       
      </div>
    </div>
  </div>
</div>

          </div>
        )
       })

       }
       {searchPokemon && <div className='col-md-3'>
       <div  className="card" style={{width: "18rem" ,backgroundColor:"#ffe6e6"}}>
            <img style={{height:"200px"}} src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${searchPokemon.id}.svg`} className="card-img-top" alt="..."></img>
            <div className="card-body">
             <h5 className="card-title">{searchPokemon.name.toUpperCase()}</h5>
             <h4 className='text-info'>Stats</h4>
             <h6>Id: {searchPokemon.id}</h6>
             <h6>Height: {searchPokemon.height}</h6>
             <h6>Weight: {searchPokemon.weight}</h6>
             <h6>Species: {searchPokemon.species.name}</h6>
             <h6>Base_experience: {searchPokemon.base_experience}</h6>
             
             
            </div>
             </div>
          
       </div>}
       </div>
      </section>
     {!searchPokemon && 
     <div className='container'>
     <footer style={{marginTop:"20px" , marginBottom:"20px"}}>
        
           <div className='row'>
             <div className='col-md-6'>
             <button onClick={handlePrevious} className='btn btn-dark'><i className="fa fa-angle-double-left"></i></button>
             </div>
             <div className='col-md-6' style={{textAlign:"right"}}>
                <button onClick={handleNext} className='btn btn-dark'><i className="fa fa-angle-double-right"></i></button>
             </div>
           </div>
        
      </footer>
      </div>
}
     
    </div>
    </div>
  );
}

export default App;
