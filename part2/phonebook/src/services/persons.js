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

const persons={getAll,update,remove}

export default persons