
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import RouteCompo from './Router/RouteCompo';
import { useEffect } from 'react';



function App() {
  const navigateTO = useNavigate();
  let { pathname } = useLocation();

  useEffect(() => {
    const token =(localStorage.getItem('token'));
    if (pathname === "/") {
      fetch('https://dummyjson.com/auth/product', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },

      })
        .then(res => {
          return res.json()
        })
        .then((data) => {
          if (data.message === "Invalid/Expired Token!") {
            navigateTO("/login")
          }
        })
    }
  }, [pathname, navigateTO])

  return (
    <>
      <RouteCompo />
    </>
  );
}

export default App;
