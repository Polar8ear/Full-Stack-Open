import axios from "axios";
const URL="http://localhost:3001/persons"


const getAll = () =>{
    return axios.get(URL).then(response=>response.data)
}

const update = (newPerson) =>{
    return axios.post(URL,newPerson).then(response=>response.data)
}

const remove = (id) =>{
    axios.delete(`${URL}/${id}`)
}

const changePhoneNum = (id,changedPerson) =>{
    return axios.put(`${URL}/${id}`,changedPerson).then(response=>response.data)

}

const persons={getAll,update,remove,changePhoneNum}

export default persons