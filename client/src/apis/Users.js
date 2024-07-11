import axios from 'axios'
const url = 'https://localhost:3000'

export const registerUser = async(body) => {
    try {
        return await axios.post(`${url}/register`,body)
    }
    catch(error) {
        console.log("Error in register user api",error)
    }
}

export const loginUser = async(body) => {
    try {
        return await axios.post(`${url}/login`,body,{withCredentials:true}) //withCredentials to automatically send cookies with each request
    }
    catch(error) {
        console.log("Error in login user api",error)
    }
}

export const getUserById = async(id) => {
    try {
        return await axios.get(`${url}/userById/${id}`)
    }
    catch(error) {
        console.log("Error in get user api",error);
    }
}

export const updateUser = async(id,body) => {
    try {
        return await axios.patch(`${url}/updateUser/${id}`,body)
    }
    catch(error) {
        console.log("Error in update user api",error)
    }
}

export const followUser = async(id,body) => {
    try {
        return await axios.patch(`${url}/followUser/${id}`,body)
    }
    catch(error) {
        console.log("Error in follow user api",error)
    }
}

export const userFollowers = async(id) => {
    try {
        return await axios.get(`${url}/${id}/followers`)
    }
    catch(error) {
        console.log("Error in user followers api");
    }
}

export const userFollowings = async(id) => {
    try {
        return await axios.get(`${url}/${id}/followings`)
    }
    catch(error) {
        console.log("Error in user followings api");
    }
}

export const blogsCount = async(id) => {
    try {
        return await axios.get(`${url}/blogsCount`)
    }
    catch(error) {
        console.log("Error in blogs count api", error);
    }
}

export const usersCount = async(id) => {
    try {
        return await axios.get(`${url}/usersCount`)
    }
    catch(error) {
        console.log("Error in users count api", error);
    }
}