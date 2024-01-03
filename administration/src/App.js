import logo from './logo.svg';
import './App.css';
import { UsersProvider } from './userContext';
import {BrowserRouter , Route ,Routes} from 'react-router-dom'
import OrderManagementComponent from './components/OrderManagmentComponent';
import HomePage from './components/HomePage';
import InPreparation from './components/InPreparation';

function App() {
  return (
    <div className="App">
      <UsersProvider>
        <BrowserRouter>
        <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Orders' element={<OrderManagementComponent/>}/>
        <Route path='/InPreparationOrders' element={<InPreparation/>}/>
        </Routes>
        </BrowserRouter>
      </UsersProvider>
    </div>
  );
}

export default App;