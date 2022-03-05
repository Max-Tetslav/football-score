import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './store/store';

import NotFound from './views/notFound/NotFound';
import Root from './views/Root';
import Leagues from './views/leagues/Leagues';
import Teams from './views/teams/Teams';
import CompsList from './components/containers/compsList/CompsList';
import Calendar from './components/containers/calendar/Calendar';
import TeamsList from './components/containers/teamList/TeamsList';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="/leagues" element={<Leagues />}>
              <Route index element={<CompsList />} />
              <Route path=":leagueId" element={<Calendar />} />
            </Route>
            <Route path="/teams" element={<Teams />}>
              <Route index element={<TeamsList />} />
              <Route path=":teamId" element={<Calendar />} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
