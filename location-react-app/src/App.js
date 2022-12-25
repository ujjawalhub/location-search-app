import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home/Home';

import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          {/* Home search page */}
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;