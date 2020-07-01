var whiskeyConnect = (event => {
    let req = 'https://evening-citadel-85778.herokuapp.com/whiskey/'
    // const req = new Request(whiskeyDB);
fetch(req)
.then((response) => {
    return response.json();
})
.then((response) => {
    // for loop?
    console.log(response);
})
});