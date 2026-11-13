import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, UNSAFE_SingleFetchRedirectSymbol } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice.js";
import { me } from "./apiCalls/me.js";

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      const data = await me()
      dispatch(setUserData(data))
    }
    fetch()
  },[])
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;