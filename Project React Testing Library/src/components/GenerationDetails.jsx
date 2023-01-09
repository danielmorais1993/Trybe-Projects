import React, { Component } from 'react'

export default class GenerationDetails extends Component {
  state={
    getNames: {},
    pokemonSpecies:[],
    mainRegion:{}
  }

async componentDidMount(){
await this.fetchPokemonGenerations()
}

  fetchPokemonGenerations = async () => {
    const {match: { params: { id } }} = this.props

  const URL  = `https://pokeapi.co/api/v2/generation/${id}`;
 
    
try {
const response =  await fetch(URL);
const data = await response.json();
console.log(data)
this.setState({isLoading:false,
getNames:data,
pokemonSpecies:data.pokemon_species,
mainRegion:data.main_region})
}catch(error){
  return `Erro na requisição do fetch: ${error}`
}
}
  render() {
    const {getNames,pokemonSpecies,mainRegion} = this.state;
    return (
      <div>
        
        <div>
        <h2>{getNames.name}</h2> 
        <h2>{mainRegion.name}</h2>
       
       <h3>
           {
            pokemonSpecies.map((takes)=>{
              return(
              <p key={takes.name}>{takes.name}</p>
              )
            })
          } 

       </h3>
     
          </div>
        

      </div>
    )
  }
}
