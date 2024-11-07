import { useState,useEffect } from "react";

const Test = () => {

    const [selectedUser, setSelectedUser] = useState(null);

    const toggleUsers=(users)=>{
        setSelectedUser(users)
    }

    const users = [
        { user: 'Enis', description: 'ustahi brazil' },
        { user: 'Pollo', description: 'ustahi i dajve' },
        { user: 'Marta', description: 'ustahi xoxo' },
      ];

    return ( 
        <div>
            {users.map((info,index)=>(
                <div onClick={()=>toggleUsers(info)} key={index}>
                    <p>{info.user}</p>
                </div>
            ))}
            <MoreInformation user={selectedUser} />
        </div>
     );
}

const MoreInformation =({user})=>{
    

    
    return(
            <div>
<div>
      {user ? (
        <>
          <h3>{user.user}</h3>
          <p>{user.description}</p>
        </>
      ) : (
        <p>Click on a user to see more information.</p>
      )}
    </div>
            </div>
    )
}
 
export default Test;