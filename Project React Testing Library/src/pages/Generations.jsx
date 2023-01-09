import React, { Component } from 'react'
import { Link } from 'react-router-dom'


 class Generations extends Component {
  state = {
    isLoading :true,
    getGenerations:[],
    numberOffset:0,
  }
 async componentDidMount(){
 await this.fetchPokemonGenerations()
 }
  fetchPokemonGenerations = async () => {
    const {match: { params: { id } }} = this.props
    const {numberOffset} = this.state;

  const URL  = `https://pokeapi.co/api/v2/generation/`;
    
try {
const response =  await fetch(URL);
const data = await response.json();
console.log(data)
this.setState({isLoading:false,
  getGenerations:data.results})
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
  await this.fetchPokemonGenerations()
})
  }
  if(value==='Back' && numberOffset>0){
    this.setState(state=>{
      return{ 
        numberOffset: state.numberOffset - 20,
      }
    },async ()=>{
      await this.fetchPokemonGenerations()
    })
  }
}
  render() {
   const { getGenerations, numberOffset} = this.state;
    return (
      <div>
      
        {   
          getGenerations.map((takes)=>{
            return(
              
            <Link to={`info/${takes.url.split('/')[6]}`} key={takes.name}>
              <p>{takes.name}</p>
            </Link>
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
export default Generations;
