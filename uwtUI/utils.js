import axios from "axios"
import { useTranslation } from "react-i18next"

export async function getAuthData(url, _id) {
    const authData = await axios.post(url + '/authUserById', {
        _id: _id
    })

    if (authData.data) {
        return authData.data.result
    } else {
        return null
    }
}

export function sortElements(array, data, direction) {
    const arrayToSort = array
    if (direction === 'asc') {
        console.log('entra en asc')
        if (data === 'createdAt') {
            arrayToSort.sort((a, b) => new Date(a[data]) - new Date(b[data]))
        } else {
            arrayToSort.sort((a, b) => a[data] - b[data])
        }
    } else if (direction === 'desc'){
        console.log('entra en desc')
        if (data === 'createdAt') {
            arrayToSort.sort((a, b) => new Date(b[data]) - new Date(a[data]))
        } else {
            arrayToSort.sort((a, b) => b[data] - a[data])
        }
    }
    return arrayToSort
}