import { createContext, useState, useEffect } from "react";
import axios from 'axios';




export const UserContext = createContext(
    {
      userId: '2',
      firstname: 'john',
      lastname:  'doe',
      phone: '555-555-5555',
      email: 'test@test.com',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      location: 'MA'
});

export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState(UserContext);

  // useEffect(() => {
  //   getUserData();
  //   console.log(userInfo);
  // }, [])
  
    // const getUserData = async() =>{
    //   const response = await axios.get(`https://team14-isa-db-n1604029-development.us-east-1.np.paas.lmig.com/IndividualSalesTracker/users/1`)
    //     const data = await response.json();
  
    //     setUserInfo(data);
    //     console.log(data)
    //   }

    return (
      <UserContext.Provider value={userInfo}>
        {children}
      </UserContext.Provider>
    )
  }

    // userId: userInfo.userId,
    // firstname: userInfo.firstname,
    // lastname:  userInfo.lastname,
    // phone: userInfo.phoneNumber,
    // email: userInfo.email,
    // bio: userInfo.bio,
    // location: userInfo.location