
import ProfileModal from '../components/ProfileModal';
import { useContext } from 'react';
import { UserContext } from "../components/context/UserContext";

// import { UserData } from "../../util/User";

function Profile(){
    const userInfo = useContext(UserContext);

    
    return (
        <div className='text-center align-middle mt-52 text-9xl'>WIP</div>
        // <div className="profile container m-5">
        //     <div>
        //         <h2 className="m-9 pt-3">Profile Page</h2>
        //     </div>
        //     <div className="m-10">
        //         <h3 className="p-5">{userInfo.firstname} {userInfo.lastname}</h3>
        //         <p className="px-5 font-bold">Phone: {userInfo.phone}</p>
        //         <p className="px-5 font-bold">Email: {userInfo.email}</p>
        //         <p className="px-5 font-bold text-thin">Location: {userInfo.location}</p>
        //         <div className="m-6">
        //             <p className="font-bold py-2">Biography:</p>
        //             <p>{userInfo.bio}</p>
        //         </div>
        //         <div className="flex items-center justify-center">
        //             <ProfileModal value={userInfo} />
        //         </div>

        //     </div>
        // </div>
    )
}

export default Profile;