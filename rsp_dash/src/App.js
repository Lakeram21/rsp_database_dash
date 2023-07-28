import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from 'react-router-dom';

import './App.css';
import HomePage from './HomePage/HomePage';
import PriceManagement from './PriceManagement/PriceManagement';
import ExcelManagement from './ExcelManagement/ExcelManagement';

function App() {
  return (
     <Router>
           <div className="App">
           <Routes>
                 <Route exact path='/' element={< HomePage />}></Route>
                 <Route exact path='/excelmanagement' element={< ExcelManagement />}></Route>
                 <Route exact path='/pricemanagement' element={< PriceManagement/>}></Route>
          </Routes>
          </div>
       </Router>
  );
}

export default App;
