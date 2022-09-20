import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import DogCreate from './components/DogCreate'
import DogDetail from './components/DogDetail'
function App() {
  return (
    <Router>
        <div className="App">
            <Switch>
                <Route exact path='/' component={LandingPage}/>
                <Route path='/home' component={Home}/>
                <Route path='/dog' component={DogCreate}/>
                <Route path='/home/:id' component={DogDetail}/>
            </Switch>
        </div>
    </Router>
  )
}

export default App;
