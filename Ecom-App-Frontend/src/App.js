import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import SignIn from './components/login_signup/SignIn';
import SignUp from './components/login_signup/SignUp';
import Newnavbar from './components/newnavbar/Newnavbar';
import Cart from './components/cart/Cart';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import Buynow from './components/buynow/Buynow';

function App() {

  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 3000)
  }, []);



  return (
    <>
      {data ? (
        <>
          <Navbar />
          <Newnavbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/getproductsone/:id" element={<Cart />} />
            <Route path="/buynow" element={<Buynow />} />
          </Routes>
          <Footer />{" "}
        </>
      ) : (
        <div className='circle'>
          <CircularProgress />
          <h2>Loading..</h2>
        </div>
      )}
    </>
  );
}

export default App;
