
export const register=(data)=>{

    const body={
        name:data.Imię,
        surName:data.Nazwisko,
        email:data.Email,
        phone:data.Telefon,
        login:{
            login:data.Login,
            password:data.Hasło,
            role:data.Rola
        }
    }

    return fetch(process.env.REACT_APP_API_URL+`/user/register?placeNr=${data.NrPokoju}&buildingNr=${data.NrBudynku}`,{
        method:"POST",
        headers:{
            "content-type": "application/json"
        },
        body:JSON.stringify(body)
    })
}