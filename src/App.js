import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import LoginPage from './Pages/Login';
import ShopPage from './Pages/Shop';
import SignupPage from './Pages/Signup';
import CoursesPage from './Pages/Courses';

//import Navbar from './Components/Navbar';
function App() {
  return (
    <Router>
    
   
    <Routes>
    <Route path="/shop" element={<ShopPage/>}/>
    <Route path="/courses" element={<CoursesPage/>}/>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/sign-up" element={<SignupPage/>}/>  
    </Routes>  
 
   
  </Router> 
  );
}

export default App;
