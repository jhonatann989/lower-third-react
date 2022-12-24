import axios from "axios"

export async function setLowerThirdData(id, data) {
    if(data.hasOwnProperty("isOpen")) { data.isOpen = data.isOpen? 1 : 0}
    let previousData = await getLowerThirdData(id)
    let response = await axios(
        "http://localhost/lower-third-react/lowerthirdDataRetriever.php",
        {
            mode:"no-cors",
            method: "POST",
            headers: { 
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({...previousData.data, ...data})
        }
    )
    return response
}

export async function getLowerThirdData(id) {

    let response = await axios(
        `http://localhost/lower-third-react/lowerthirdDataRetriever.php?id=${id}`,
        {
            method: 'GET',
            mode: 'no-cors',
            headers: { 
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        }
    )
    return response
}