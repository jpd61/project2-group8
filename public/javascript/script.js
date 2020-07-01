async function getWhiskeyApi() {
    let response = await fetch('https://evening-citadel-85778.herokuapp.com:443/whiskey/');
    let data = await response.json()
    return data;
}

getWhiskeyApi().then(data => console.log(data));