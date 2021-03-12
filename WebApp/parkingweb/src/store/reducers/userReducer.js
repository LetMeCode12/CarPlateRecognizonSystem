let initialValues = {
    Name:"User",
    UserData:{username:localStorage.getItem("username"),token:localStorage.getItem("token")}
}

export const userReducer = (state=initialValues,action)=>{
    switch(action.type){
        case "ADD_USER" :{
            return{ ...state, UserData:{...action.payload}}
        }
        case "REMOVE_USER" :{
            return{ ...state, UserData:{}}
        }
        default:{
            return state
        }
    }
}