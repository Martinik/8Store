let auth = (() => {
    // user/login
    function login(username, password) {
        let userData = {
            username,
            password
        };

        return requester.post('user', 'login', 'basic', userData);
    }


    // user/register
    function register(first_name, last_name, display_name,email,password,password_confirmation) {
        let userData = {
            first_name, last_name, display_name,email,password,password_confirmation
        };

        return requester.post('user', '', 'basic', userData);
    }

    // user/logout
    function logout() {
        let logoutData = {
            authtoken: sessionStorage.getItem('authtoken')
        };

        return requester.post('user', '_logout', 'kinvey', logoutData);
    }

    return {
        login,
        register,
        logout
    }
})()
