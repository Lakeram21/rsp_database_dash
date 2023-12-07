import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from 'react-router-dom';

import './App.css';
import HomePage from './HomePage/HomePage';
import ExcelManagement from './ExcelManagement/ExcelManagement';
import Chatgpt from './Chatgpt/Chatgpt';
import ProductManagement from "./ProductManagement/ProductManagement"
import Inventory from "./Inventory/Inventory"
import BulkExcelManagement from './ExcelManagement/BulkExcelManagement';

function App() {
  return (
     <Router>
           <div className="App">
           <Routes>
                 <Route exact path='/' element={< HomePage />}></Route>
                 <Route exact path='/excelmanagement' element={< BulkExcelManagement />}></Route>
                 <Route exact path='/chatgptmanagement' element={< Chatgpt/>}></Route>
                 <Route exact path='/productmanagement' element={< ProductManagement/>}></Route>
                 <Route exact path='/inventory' element={<Inventory/>}></Route>
          </Routes>
          </div>
       </Router>
  );
}

export default App;
