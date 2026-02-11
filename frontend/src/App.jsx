import {Routes,Route} from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import StudentHome from './pages/StudentHome/StudentHome';
import LandingPage from './pages/LandingPage/LandingPage';
import CompanyDashboard from './pages/CompanyDashboard/CompanyDashboard';

function App(){
  return(
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/student-home" element={<StudentHome/>}/>
      <Route path="/company-home" element={<CompanyDashboard />} />
     
    </Routes>
  );
}

export default App;