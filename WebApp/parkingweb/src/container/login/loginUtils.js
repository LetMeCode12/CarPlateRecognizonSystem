
export const login=(body)=>{
    return fetch(process.env.REACT_APP_API_URL+"/login",{
        method:"POST",
        body:JSON.stringify(body)
    })
}