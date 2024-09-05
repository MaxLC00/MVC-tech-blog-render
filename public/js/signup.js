const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trimEnd();
    const password = document.querySelector('#password').value.trimEnd();

    if (username && password) {
        const response = await fetch('/auth/signup', {
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
            alert('Sign up failed.')
        }
    }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
