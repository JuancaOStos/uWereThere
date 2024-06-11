import axios from "axios"

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
        arrayToSort.sort((a, b) => a[data] - b[data])
    } else if (direction === 'desc'){
        console.log('entra en desc')
        arrayToSort.sort((a, b) => b[data] - a[data])
    }
    return arrayToSort
}