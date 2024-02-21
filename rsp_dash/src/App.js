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
import SignUp from './Login/SignUp';
import PanelEstimator from './PanelEstimator/PanelEstimator';
import ProductCategoryCompare from './ProductCategoryCompare/ProductCategoryCompare';


function App() {
  return (
     <Router>
           <div className="App">
          {/* Routes with the Header */}
          <>
            <Header/>
            <Routes>
                  <Route exact path='/' element={< HomePageNew />}></Route>
                  <Route exact path='/productsearch' element={< ProductSearch/>}></Route>



                  <Route exact path='/excelmanagement' element={< BulkExcelManagement />}></Route>
                  <Route exact path='/chatgptmanagement' element={< Chatgpt/>}></Route>
                  <Route exact path='/productmanagement' element={< ProductManagement/>}></Route>
                
                  <Route exact path='/inventory' element={<Inventory/>}></Route>
                  <Route exact path='/panelestimator' element={<PanelEstimator/>}></Route>
                  <Route exact path='/productcategorycompare' element={<ProductCategoryCompare/>}></Route>
            </Routes>
          </>
          {/* Routes without header */}
          <>
          <Routes>
                  <Route exact path='/signup' element={< SignUp />}></Route>      
          </Routes>
          </>
          
          </div>
       </Router>
  );
}

export default App;
