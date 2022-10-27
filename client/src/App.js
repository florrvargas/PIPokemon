import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./componentes/Home/Home";
import LandingPage from "./componentes/LandingPage/LandingPage";
import PokemonCreator from "./componentes/PokemonCreate/PokemonCreate";
import PokemonDetail from "./componentes/PokemonDetails/PokemonDetail";
// import PokemonCreator from "./components/CreatedPokemon/CreatedPokemon";
// import PokemonDetail from "./components/PokemonDetail/PokemonDetail";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path='/' component= {LandingPage}/>
      <Route path='/home' component= {Home}/>
      <Route exact path= "/pokemons" component={PokemonCreator}/>
      <Route exact path= "/pokemons/:id" component={PokemonDetail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;