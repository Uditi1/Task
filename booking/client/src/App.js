// component
import Home from "./booking/Home.js";
import Login from "./auth/Login.js";
import Register from "./auth/Register.js";
import Dashboard from "./user/Dashboard.js";
import DashboardSeller from "./user/DashboardSeller.js";


// private route
import PrivateRoute from "./component/PrivateRouter.js";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TopNav from "./component/TopNav.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewHotel from "./hotels/NewHotel.js";
import StripeCallback from './stripe/StripeCallback.js';


function App() {
  return (
    <Router>
      <TopNav />
      <ToastContainer />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route   path="/login" element={<PrivateRoute />} /> 
      
       {/* <Route exact path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />  */} 

          
        
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/seller" element={<DashboardSeller />} />
        <Route path="/hotels/new" element={<NewHotel />} />
        <Route path="/stripe/callback" element={<StripeCallback />} />


       
      </Routes>
    </Router>
    
  );
}

export default App;
