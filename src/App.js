import react from 'react';
import { Component } from 'react';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <h1>Hello From React !</h1>
//     </div>
//   );
// }

class App extends Component {
  render(){
    const name ="Govardhan Aaleswara";
    const loading = false;
    const showName = true;
    // if(loading){
    //   return(
    //     <h2>Loading...</h2>
    //   )
    // }
    return(
      <div className="App">
       <h1>My App</h1>
       {loading?<h2>Loading...</h2>:<h1>Hello {showName && name}</h1>}
      </div>
    );
  }
}
export default App;
