import axios from "axios";
const URL="/api/persons"


const getAll = () =>{
    return axios.get(URL).then(response=>response.data)
}

const addPerson = (newPerson) =>{
    return axios.post(URL,newPerson)
                .then(response=>response.data)
}

const remove = (id) =>{
    return axios.delete(`${URL}/${id}`).then(response=>response.data)
}

const changePhoneNum = (id,changedPerson) =>{
    return axios.put(`${URL}/${id}`,changedPerson).then(response=>response.data)

}

const persons={getAll,addPerson,remove,changePhoneNum}

export default persons