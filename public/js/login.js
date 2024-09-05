const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trimEnd();
    const password = document.querySelector('#password').value.trimEnd();

    if (username && password) {
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({
                 username, 
                 password 
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('log in up failed.')
        }
    }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
