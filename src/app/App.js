import './App.css';
import Home from './Home';
import About from './About';
import { Route, Routes, Link } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import {Link as LinkMui} from '@mui/material/Link';
 
const FOOTBALL_API = '62a1e77b1f7b415eb72701a665d74b02';

function App() {
  async function getData(){
    const url = `http://api.football-data.org/v2/competitions?plan=${'TIER_ONE'}`;
    const request = await fetch(url, {
      headers: { 'X-Auth-Token': `${FOOTBALL_API}` },
      dataType: 'json',
      type: 'GET',
    });
    const response = await request.json();
  
    return response;
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul id="navigation">
            <li>
              <Link exact to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/about/" element={<About />}/>
      </Routes>
      <Button
        color='primary'
        variant='contained'
        size='small'
      >
      +</Button>
    </div>
  );
}

export default App;
