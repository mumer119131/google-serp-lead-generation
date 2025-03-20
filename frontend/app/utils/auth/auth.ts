import axios from "axios"

export const logout = async () => {
    const response = await axios.get("/api/auth/logout")
    return response.data
}