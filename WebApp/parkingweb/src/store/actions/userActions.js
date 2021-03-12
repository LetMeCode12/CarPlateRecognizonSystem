export const addUser=(data)=>async dispatch=>{
    const res = await fetch(process.env.REACT_APP_API_URL+`/user/getUser/${data.username}`,{
        method:"GET",
        headers:{
            "authorization":data.token
        }
    })
    
    if(res.status===200){
        data={...data,...await res.json()}
    }
    dispatch({type:"ADD_USER",payload:data})
}

export const removeUser=dispatch=>{
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    dispatch({type:"REMOVE_USER"})
}