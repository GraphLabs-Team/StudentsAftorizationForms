import React,  {useEffect} from 'react';
import logo from './logo.svg';
import { RoutesManager } from './routes/routes';
import { BrowserRouter as Router, Routes, Route }from "react-router-dom";
import Header from './header/Header';
import MainPage from './mainpage/mainPage'
import './App.css';
function App() {
  const props = {
		end: "string",
		id: 0,
		interval: "12",
		name: "string",
		start: "string"
	}
  return (
    <div className="App">
      <body>
        <Header/>
        <MainPage/>
      </body>
    </div>
  );
}

export default App;
