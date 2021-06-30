import './App.css';
import Home from './containers/Home';
import StopDetail from './containers/StopDetail'
import ShowFavorites from './containers/ShowFavorites'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Layout from './hocs/Layout';

const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path='/favorites' component={ShowFavorites} />
        <Route exact path='/stop/:id' component={StopDetail} />
        <Route exact path='/' component={Home} />
      </Switch>
    </Layout>
  </Router>
)

export default App;
