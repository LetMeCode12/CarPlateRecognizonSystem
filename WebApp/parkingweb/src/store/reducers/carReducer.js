let initialValues = {
    Name:"Cars",
    Cars:[]
}

export const carReducer = (state=initialValues,action)=>{
    switch(action.type){
        case "ADD_CARS" :{
            return{ ...state, Cars:[...action.payload]}
        }
        case "ADD_CAR" :{
            return{ ...state, Cars:[...state.Cars,action.payload]}
        }
        case "REMOVE_CARS" :{
            return{ ...state, Cars:[]}
        }
        case "DELETE_CAR" :{
            return{ ...state, Cars:state.Cars.filter(car=>car.id!==action.payload)}
        }
        default:{
            return state
        }
    }
}