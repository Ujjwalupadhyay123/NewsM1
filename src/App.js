import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Routes,
  Route, 
} from "react-router-dom";

export default class App extends Component {
  apikey=process.env.REACT_APP_NEWS_API  //using .env.local file to get the apiKey
  render() {
    return (
      <div>
      <Router>
      <Navbar/>
      <Routes>
          <Route exact path="/"   element={<News apikey={this.apikey}  key='general'  pageSize={6} country="in" category={'general'}/>}></Route>
          <Route exact path="/business"   element={<News apikey={this.apikey}  key='business' pageSize={6} country="in" category={'business'}/>}></Route>
          <Route exact path="/entertainment"   element={<News apikey={this.apikey}  key='entertainment' pageSize={6} country="in" category={'entertainment'}/>}></Route>
          <Route exact path="/general"   element={<News apikey={this.apikey}  key='general' pageSize={6} country="in" category={'general'}/>}></Route>
          <Route exact path="/health"  element={<News  apikey={this.apikey} key='health'  pageSize={6} country="in" category={'health'}/>}></Route>
          <Route exact path="/science"   element={<News  apikey={this.apikey} key='science' pageSize={6} country="in" category={'science'}/>}></Route>
          <Route exact path="/sports"   element={<News  apikey={this.apikey} key='sports' pageSize={6} country="in" category={'sports'}/>}></Route>
          <Route exact path="/technology"   element={<News  apikey={this.apikey} key='technology' pageSize={6} country="in" category={'technology'}/>}></Route>
      </Routes>
      </Router>
      </div>
    )
    // in the route tag we have used key to make react identify we have different points to route to otherwise it will point to same location and after reloading we get the pointed route data.
  }
}
