import React, { Component } from 'react'


 class Locations extends Component {
  state = {
    isLoading :true,
    getLocations:[  {
      name: 'spring-path',
      url: 'https://pokeapi.co/api/v2/location/17/'
    }],
    numberOffset:0,
  }
 async componentDidMount(){
 await this.fetchPokemonLocation()
 }
  fetchPokemonLocation = async () => {
    const {numberOffset} = this.state;
  const URL = `https://pokeapi.co/api/v2/location/?offset=${numberOffset}&limit=20`;
try {
const response =  await fetch(URL);
const data = await response.json();
console.log(data)
this.setState({isLoading:false,
  getLocations:data.results})
}catch(error){
  return `Erro na requisição do fetch: ${error}`
}
}
onHandleClick = (event) =>{
  const { value }= event.target;
  const { numberOffset } = this.state;
  if(value==='Foward'){
this.setState(state=>{
  return{ 
    numberOffset: state.numberOffset + 20,
  }
},async ()=>{
  await this.fetchPokemonLocation()
})
  }
  if(value==='Back' && numberOffset>0){
    this.setState(state=>{
      return{ 
        numberOffset: state.numberOffset - 20,
      }
    },async ()=>{
      await this.fetchPokemonLocation()
    })
  }
}
  render() {
   const { getLocations, numberOffset} = this.state;
    return (
      <div>
      
        { 
          getLocations.map((takes)=>{
            return(
            <div key={takes.name}>
              <p>{takes.name}</p>
            </div>
            )
          })
        }
        <button
        type='button'
        value='Foward'
        onClick={ this.onHandleClick}
        >Next</button>
          <button
        type='button'
        value='Back'
        onClick={ this.onHandleClick}
        disabled={numberOffset > 0 ? false : true}
        >Back</button>

        
      </div>
    )
  }
}
export default Locations
