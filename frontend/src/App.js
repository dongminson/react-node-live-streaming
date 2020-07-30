import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Create from './components/streams/Create';
import Edit from './components/streams/Edit';
import Delete from './components/streams/Delete';
import GenericList from './components/streams/List';
import Show from './components/streams/Show';
import Header from './components/Header';
import history from './components/history';

import './App.css';

function App() {
  return (
    <div className="App">
      
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={GenericList} />
            <Route path="/streams/new" exact component={Create} />
            <Route path="/streams/edit/:id" exact component={Edit} />
            <Route path="/streams/delete/:id" exact component={Delete} />
            <Route path="/streams/:id" exact component={Show} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
