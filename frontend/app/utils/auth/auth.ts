import axios from "axios"

export const logoutUser = async () => {
    const response = await axios.get("/api/auth/logout")
    return response.data
}
