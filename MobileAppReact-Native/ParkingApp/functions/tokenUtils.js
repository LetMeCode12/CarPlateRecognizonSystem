import {AsyncStorage} from "react-native";


export const getToken= ()=>{
    return  AsyncStorage.getItem("@token");
}

export const isToken=async ()=>{
    let token = await getToken();

    return  token? token.startsWith("Bearer "):false
}