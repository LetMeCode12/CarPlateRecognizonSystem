import './App.scss';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from './container/login/login';
import Registration from './container/registration/registration';
import {NotificationContainer} from 'react-notifications';
import InnerRoute from './Routers/innerRoute';

require('dotenv').config() 

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={(props)=><Login {...props}/>} />
          <Route path="/registration" component={(props)=><Registration {...props}/>} />
          <InnerRoute/>
        </Switch>
      </Router>
      <NotificationContainer/>
    </div>
  );
}

export default App;
