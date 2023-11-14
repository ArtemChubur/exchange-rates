import './App.css';
import { Route, Routes } from 'react-router-dom';
import HpmePage from './pages/HomePage/HpmePage';
import ExchangeRates from './pages/ExchangeRates/ExchangeRates';
import Weather from './pages/weather/weather';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<HpmePage />} />
        <Route exact path='/ExchangeRates' element={<ExchangeRates />} />
        <Route exact path='/weather' element={<Weather />} />
      </Routes>
    </div>
  );
}

export default App;
