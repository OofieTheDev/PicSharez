import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import DefaultLayout from "./pages/DefaultLayout";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Pictures from "./pages/Pictures";
import Post from "./pages/Post";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Protected from "./pages/Protected";
import Test from "./pages/Test";
import UserProfile from "./pages/UserProfile";
import UserPosts from "./pages/UserPosts";

function App() {
  const [ user, setUser ] = useState(null);
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<DefaultLayout user={user}/>} >
        <Route index element={<HomePage />} />
        <Route path='about' element={<About />} />
        <Route path='pictures' element={
          <Protected user={user}>
            <Pictures user={user} />
          </Protected>
        }/>
        <Route path='user'>
          <Route path=':userid' element={<UserProfile />} >
            <Route path='posts' element={<UserPosts />} />
          </Route>
        </Route>
        <Route path='post' element={<Post user={user}/>} />
        <Route path='contact' element={<Contact />} />
        <Route path='login' element={<Login setUser={setUser} />} />
        <Route path='register' element={<Register />} />
        <Route path='logout' element={<Logout setUser={setUser} />} />
        {/* <Route path='test' element={<Test />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;