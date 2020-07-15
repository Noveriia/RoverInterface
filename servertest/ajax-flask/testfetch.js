
/* console.log('Run test');

const getData = () => {
    return fetch('http://127.0.0.1:5000/api/v1/resources/domaindata/all')
        .then(res => {
            res.json()
            console.log('jsonified :)');
        })
        .then(posts => console.log(posts))
} */

//returns value of performance
const fetch = require("node-fetch");

var performance = getDomainData(); 
function getDomainData() {
    let x;
    fetch(`http://127.0.0.1:5000/api/v1/resources/domaindata/all`)
    .then(result => {
        return result.json();
    })
    .then(data => {
        //console.log(data);
        console.log(`Hello ${data[0].performance}`);
        return data;
    })
    .catch(error => console.log(error));
    return x;
}
//getDomaindata();
console.log(performance);

