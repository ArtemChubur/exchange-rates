import axios from "axios";
const TOKEN = 'yoTH6nCXCxRK9HaJdMJ4Aw3rBCcrRYpX58yjDGGXeffbae5a'


export const getCurrent = async (setIsLoading, search, setData, banks) => {
    setIsLoading(true)
    try {
        const response = await axios.get('https://data.fx.kg/api/v1/current', {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        })
        let filteredData = response.data
        filteredData = filteredData.filter(item => item.id <= banks)

        if (search) {
            filteredData = filteredData.filter(item => item.title === search)
        }

        setData(filteredData)
    } catch (error) {
    } finally{
        setIsLoading(false)
    }
}