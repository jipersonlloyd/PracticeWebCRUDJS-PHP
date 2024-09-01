function insertData() {
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    const apiUrl = "http://192.168.1.11/api/users/insertUser.php";

    // Define the data you want to send in the body
    const data = {
        username: username,
        email: email,
        pass: password
    };

    console.log(data);

    // Make the POST request
    fetch(apiUrl, {
        method: 'POST', // Use POST method
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(data) // Convert the data object to a JSON string
    })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            alert(data["message"]); // Handle the success case
            document.getElementById('myForm').reset();
            location.reload();
        })
        .catch((error) => {
            console.error('Error:', error); // Handle the error case
        });
}

function getUsers() {
    const apiUrl = "http://192.168.1.11/api/users/index.php";

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Parse the JSON from the response
        })
        .then(data => {
            const tbody = document.querySelector('#usersTable tbody');

            // Loop through the data and create rows
            data.forEach(user => {

                let data = JSON.stringify(user);
                // Create a new row
                const row = document.createElement('tr');

                // Create a cell for the name
                const usernameCell = document.createElement('td');
                usernameCell.textContent = user.username; // Assuming 'name' is a property in your data object
                row.appendChild(usernameCell);

                // Create a cell for the email
                const emailCell = document.createElement('td');
                emailCell.textContent = user.email; // Assuming 'email' is a property in your data object
                row.appendChild(emailCell);

                const password = document.createElement('td');
                password.textContent = user.pass; // Assuming 'email' is a property in your data object
                row.appendChild(password);

                const action = document.createElement('td');

                action.innerHTML = `<input type="button" value="Edit" onclick='editData(${data})'/> | <input type="button" value="Delete" onclick='deleteData(${data})'/>`;
                row.appendChild(action);

                // Append the row to the table body
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
}

function editData(user) {
    let dataStr = encodeURIComponent(JSON.stringify(user));
    
    window.location.href = `edit/index.html?data=${dataStr}`;
}

function deleteData(user) {
    let dataStr = encodeURIComponent(JSON.stringify(user));
    
    window.location.href = `delete/index.html?data=${dataStr}`;
}

