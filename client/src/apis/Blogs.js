import axios from 'axios'
const url="https://localhost:3000"

export const postBlog = async(body) => {
    try {
        return await axios.post(`${url}/addBody`,body)
    }
    catch(error) {
        console.log('error in post blog api');
    }
}

export const getAllBlogs = async() => {
    try {
        const response = await axios.get(`${url}/blogs`);
        return response.data;
    }
    catch(error) {
        console.log('error in get all blogs api',error);
    }
}

export const getBlogById = async(id) => {
    try {
        return await axios.get(`${url}/blog/${id}`) 
    }
    catch(error) {
        console.log("Error in getting blog by id api",error);
    }
}

export const getAuthorBlogs = async(id) => {
    try {
    return await axios.get(`${url}/blogsByAuthorId/${id}`)
    }
    catch(error) {
        console.log("Error in get author blogs api",error)
    }
}

export const blogByTag = async(id) => {
    try {
        return await axios.get(`${url}/tag/${id}`)
    }
    catch(error) {
        console.log("error in blog by tag api",error)
    }
}

export const categoryCount = async() => {
    try {
        return await axios.get(`${url}/categoryCount`)
    }
    catch(error) {
        console.log("error in category count api",error)
    }
}

export const searchBlog = async(value) => {
    try {
        return await axios.get(`${url}/search/title?q=${value}`)
    }
    catch(error) {
        console.log("error in search blog api",error)
    }
}

export const searchAuthor = async(value) => {
    try {
    return axios.get(`${url}/search/author/${value}`)
    }
    catch(error) {
        console.log("Error in search author api",error)
    }
}

export const searchCategory = async(value) => {
    try {
    return axios.get(`${url}/search/category/${value}`)
    }
    catch(error) {
        console.log("Error in search category api",error)
    }
}

export const bookmark = async(id,body) => {
    try {
        return axios.patch(`${url}/bookmark/${id}`,body)
    }
    catch(error) {
        console.log("Error in bookmark api",error)
    }
}

export const unBookmark = async(id,body) => {
    try {
        return axios.patch(`${url}/unbookmark/${id}`,body)
    }
    catch(error) {
        console.log("Error in unbookmark api",error)
    }
}

export const likeBlog = async(id,body) => {
    try {
        return axios.patch(`${url}/like/${id}`,body)
    }
    catch(error) {
        console.log("Error in like api",error)
    }
}

export const unlikeBlog = async(id,body) => {
    try {
        return axios.patch(`${url}/unlike/${id}`,body)
    }
    catch(error) {
        console.log("Error in unlike api",error)
    }
}