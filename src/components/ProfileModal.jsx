import { useState, useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { DateContext } from "./context/DateContext";

function ProfileModal(props){

  const userInfo = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(props.value);
  const [editing, setEditing] = useState(false);
   
 console.log(userData);
  function handleUpdatingValue(e) {
      setUserData({
          ...userData,
          [e.target.id]: e.target.value,
      });
   }

  function updateUser() {

          fetch({
              method: 'PUT',
               headers:{
                 'Content-Type':'application/json'
                 },
                // update url with correct endpoint
                url: "http://localhost:8080/api/{:id}",
                body: JSON.stringify(userData)
              })
        setShowModal(false);
        console.log("Function")
        console.log(userData);
    }
      

    return (
        <>
        <button
          className="bg-blue-900 text-white active:bg-blue-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Edit Profile
        </button>
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Edit Profile
                    </h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      Edit the form below to make any changes to your profile information. 
                    </p>
                    <div>
                      <form className="space-y-4 text-gray-700">
                        <div>
                          <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0 mb-3">
                            <div className="w-full px-2 md:w-1/2"> 
                              <label htmlFor="firstname" className="font-bold text-lg">
                                First Name:
                              </label>
                              <input
                                type="text"
                                id="firstname"
                                defaultValue={props.value.first_name}
                                onChange={handleUpdatingValue}
                                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                /><br />
                            </div>
                            <div className="w-full px-2 md:w-1/2">
                              <label htmlFor="lastname" className="font-bold text-lg">
                                Last Name:
                              </label>
                              <input
                                type="text"
                                id="lastname"
                                defaultValue={props.value.last_name}
                                onChange={handleUpdatingValue}
                                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                              /><br />
                            </div>
                          </div>
                          <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0 mb-3">
                            <div className="w-full px-2 md:w-1/3">  
                              <label htmlFor="phone" className="font-bold text-lg">
                                Phone:
                              </label>
                              <input
                                type="text"
                                id="phone"
                                defaultValue={props.value.phoneNumber}
                                onChange={handleUpdatingValue}
                                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                              /><br />
                            </div>
                            <div className="w-full px-2 md:w-1/3">
                              <label htmlFor="email" className="font-bold text-lg">
                                Email:
                              </label>
                              <input
                                type="email"
                                id="email"
                                defaultValue={props.value.email}
                                onChange={handleUpdatingValue}
                                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                              /><br />
                            </div>
                          
                          <div className="w-full px-2 md:w-1/3">
                            <label htmlFor="location" className="font-bold text-lg">
                              Location
                            </label>
                            <input
                              id="location"
                              defaultValue={props.value.location}
                              onChange={handleUpdatingValue}
                              className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                            />
                          </div>
                          </div>
                          <div className="w-full">
                            <label htmlFor="bio" className="font-bold text-lg">
                              Bio
                            </label>
                            <textarea
                              id="bio"
                              defaultValue={props.value.bio}
                              onChange={handleUpdatingValue}
                              className="shadow appearance-none border rounded w-full py-2 px-1 text-black h-32"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-yellow-400 text-blue-900 active:bg-yellow-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={updateUser}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
      );
}

export default ProfileModal;