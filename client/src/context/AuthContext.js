import axios from "axios";
import React, {useEffect, useState } from "react";

axios.defaults.withCredentials = true;

const AuthContext = React.createContext();

function AuthContextProvider(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [userData, setuserData] = useState(null);
  
    async function getLoggedIn(callback) {
      try {
        const loggedInRes = await axios.get("http://localhost:4000/api/user/getUser");
        setIsLoggedIn(true);
        setuserData(loggedInRes.data)
      } catch(e) {
        setIsLoggedIn(false);
        setuserData(null)
      }
    }
  
    useEffect(() => {
      getLoggedIn();
    }, []);
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, userData, setIsLoggedIn, setuserData }}>
        {props.children}
      </AuthContext.Provider>
    );
  }
  
  export default AuthContext;
  export { AuthContextProvider };