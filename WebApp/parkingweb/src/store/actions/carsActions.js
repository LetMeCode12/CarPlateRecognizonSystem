import { NotificationManager } from "react-notifications"
import store from "../store";

export const addCars = (userId) => dispatch =>{
    const state = store.getState();
    fetch(process.env.REACT_APP_API_URL+`/car/userCars/${userId}`,{
        headers:{
            "authorization":state.user.UserData.token
        }
    }).then(res=>res.json()).then(data=>{

        dispatch({type:"ADD_CARS",payload:data})
    }).catch((err)=>{
        console.error("CarsError",err)
    })  
}

export const addCar = (userId,data) => dispatch =>{
    const state = store.getState()
    fetch(process.env.REACT_APP_API_URL+`/car/add/${userId}`,{
        method:"POST",
        headers:{
            "content-type": "application/json",
            "authorization":state.user.UserData.token
        },
        body:JSON.stringify(data)
    }).then(res=>res.json()).then(data=>{

        dispatch({type:"ADD_CAR",payload:data})
        NotificationManager.success("Dodano")
    }).catch((err)=>{
        console.error("CarsError",err)
        NotificationManager.error("Nie powiodło się")
    })  
}

export const deleteCar= (carId)=> dispatch =>{
    const state = store.getState()
    fetch(process.env.REACT_APP_API_URL+`/car/delete`,{
        method:"DELETE",
        headers:{
            "content-type": "application/json",
            "authorization":state.user.UserData.token
        },
        body:JSON.stringify({
            id:carId
        })
    }).then(()=>{
        dispatch({type:"DELETE_CAR",payload:carId})
        NotificationManager.success("Usunięto")
    }).catch((err)=>{
        console.error("CarsError",err)
        NotificationManager.error("Nie powiodło się")
    })  

}