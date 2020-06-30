var whiskeyDB = (event => {
    whiskeyDB = 'https://evening-citadel-85778.herokuapp.com/whiskey/'
    const req = new Request(whiskeyDB);
fetch(req)
.then((whiskeyResponse) => {
    return whiskeyResponse.json();
})
.then((whiskeyResponse) => {
    // for loop?
    console.log(response);
})
})

module.exports = whiskeyDB;