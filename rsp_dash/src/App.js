import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from 'react-router-dom';

import './App.css';
import HomePage from './HomePage/HomePage';
import Chatgpt from './Chatgpt/Chatgpt';
import ProductManagement from "./ProductManagement/ProductManagement"
import Inventory from "./Inventory/Inventory"
import BulkExcelManagement from './ExcelManagement/BulkExcelManagement';
import HomePageNew from './HomePage/HomePageNew';
import Header from './CommonComponets/Header';
import ProductSearch from './ProductSearch/ProductSearch';


function App() {
  return (
     <Router>
           <div className="App">
            <Header/>
           <Routes>
                 <Route exact path='/' element={< HomePageNew />}></Route>
                 <Route exact path='/productsearch' element={< ProductSearch/>}></Route>



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
