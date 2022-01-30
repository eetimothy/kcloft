import './App.css';
import Navbar from './components/Navbar';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route } from 'react-router-dom'
import Home from './components/pages/Home'  
import RegisterUser from './components/pages/auth/Register'
import LoginUser from './components/pages/auth/Login'
import ResetPassword from './components/pages/auth/ResetPassword';
import Dashboard from './components/pages/admin/Dashboard';
import ProjectDetails from './components/pages/admin/manageProjects/ProjectDetails';
import ProjectList from './components/pages/admin/manageProjects/ProjectList';
import EditProject from './components/pages/admin/manageProjects/EditProject';
import AddProject from './components/pages/admin/manageProjects/AddProject';
import AccessoryList from './components/pages/admin/manageAccessories/AccessoryList';
import AccessoryDetails from './components/pages/admin/manageAccessories/AccessoryDetails';
import EditAccessory from './components/pages/admin/manageAccessories/EditAccessory';
import AddAccessory from './components/pages/admin/manageAccessories/AddAccessory';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={ <Home/> }/>
          <Route exact path='/register' element={ <RegisterUser/> }/>
          <Route exact path='/login' element={ <LoginUser/> }/>
          <Route exact path='/reset_password' element={ <ResetPassword/> }/>
          <Route exact path='/dashboard' element={ <Dashboard/> }/>
          <Route exact path='/project_details/:id' element={ <ProjectDetails/> }/>
          <Route exact path='/projects' element={ <ProjectList/> }/>
          <Route exact path='/edit_project/:id' element={ <EditProject/> }/>
          <Route exact path='/add_project' element={ <AddProject/> }/>

          <Route exact path='/accessory_details/:id' element={ <AccessoryDetails/> }/>
          <Route exact path='/accessories' element={ <AccessoryList/> }/>
          <Route exact path='/edit_accessory/:id' element={ <EditAccessory/> }/>
          <Route exact path='/add_accessory' element={ <AddAccessory/> }/>
        </Routes>
      </Router>

    </>
  );
}

export default App;
