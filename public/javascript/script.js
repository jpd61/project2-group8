const whiskeyDB = (event => {
const whiskeyDB = 'https://evening-citadel-85778.herokuapp.com/whiskey/'
const req = new Request(whiskeyDB);
fetch(req)
.then((whiskeyResponse) => {
    return whiskeyResponse.json();
})
.then((whiskeyResponse) => {
    console.log(response);
})
})

module.exports = whiskeyDB;