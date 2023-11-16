import axios from "axios";

export const getCurrent = async () => {
    const token = 'yoTH6nCXCxRK9HaJdMJ4Aw3rBCcrRYpX58yjDGGXeffbae5a';
    const response = await axios.get('https://data.fx.kg/api/v1/current', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response
}