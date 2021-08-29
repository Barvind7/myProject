import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import './App.css';

function App() {

  return (
    <div className="d-flex flex-column min-vh-100 app">
      <Header></Header>
        <Switch>
          <Route exact path="/" component={CustomerList}></Route>
          <Route exact path="/customers" component={CustomerList}></Route>
          <Route path="/customer:id" component={CustomerDetails}></Route>
        </Switch>
    </div>
  );
}

export default App;
