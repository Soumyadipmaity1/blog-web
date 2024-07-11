import logo from './logo.svg'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Home from './components/Homepage/Home'

import Blog from './components/Blog/Blog';
import Navbar from './components/NavBar/Navbar';
import Profile from './components/Profile/Profile';
import EditProfile from './components/EditProfile/EditProfile';
import Tag from './components/Tagwise/Tag';
import Search from './components/Search/Search';
import axios from 'axios';
import Error from './components/AdditionalPages/Error';
import Pending from './components/AdditionalPages/Pending';
import Bookmark from './components/Bookmark/Bookmark';
import Write from './components/Write/Write';
import Share from './components/AdditionalPages/Share';

function App() {
  return (
<Router>

<Routes>
  <Route path='/login' element={<Login/>}/>
  <Route path='/register' element={<Register/>}/>

  <Route path='/' element={<Home/>}/>
  {/* <Route element={<Profile/>}/> */}
  <Route path='/blog/:id' element={<Blog/>}/>
  
  <Route path='/navbar' element={<Navbar/>}/>
  <Route path='/edit/:id' element={<EditProfile/>}/>
  <Route path='/profile/:id' element={<Profile/>}/>
  <Route path='/tag/:id' element={<Tag/>}/>
<Route path='/search' element={<Search/>}/>
<Route path='/notifications' element={<Pending/>}/>
<Route path='/bookmarks' element={<Bookmark/>}/>
<Route path='/write' element={<Write/>}/>
<Route path='/share' element={<Share/>}/>



{/*<Route path='*' element={<Error/>}/>*/}
</Routes>
{/* <Footer/> */}
</Router>
  );
}

export default App;