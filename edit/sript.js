function userObject(user) {
    const urlParams = new URLSearchParams(window.location.search).get(user);
    const decode = decodeURIComponent(urlParams);
    return JSON.parse(decode);

}

let user = userObject('data');

document.getElementById('id').value = user.id || '';
document.getElementById('username').value = user.username || '';
document.getElementById('email').value = user.email || '';
document.getElementById('password').value = user.pass || '';



function updateUser() {
    let id = document.getElementById('id').value;
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    const apiUrl = "http://192.168.1.11/api/users/updateUser.php";

    // Define the data you want to send in the body
    const data = {
        id: parseInt(id),
        username: username,
        email: email,
        pass: password
    };

    // Make the POST request
    fetch(apiUrl, {
        method: 'PUT', // Use POST method
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(data) // Convert the data object to a JSON string
    })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            alert(data["message"]); // Handle the success case
            document.getElementById('myForm').reset();
            window.location.href = '../index.html'
        })
        .catch((error) => {
            console.error('Error:', error); // Handle the error case
        });
}