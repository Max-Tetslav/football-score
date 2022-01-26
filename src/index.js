import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss'
import App from './app/App';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import {CompsView} from './views/Comps/Comps.js'
import TeamsView from './views/Teams/Teams';
import NotFound from './views/NotFound/NotFound';
import Header from './components/Header/Header';
import { store } from './store/index';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<App/>}/>
          <Route path="/comps" element={<CompsView/>}>
            {/* <Route path=":compId/matches"></Route> */}
          </Route>
          <Route path="/teams" element={<TeamsView/>}>
            <Route path=':teamId'></Route>
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

