let auth = (() => {
    function saveSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authtoken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        sessionStorage.setItem('username', username);
        let firstName = userInfo.firstName;
        sessionStorage.setItem('firstName', firstName);
        let lastName = userInfo.lastName;
        sessionStorage.setItem('lastName', lastName);
        let email = userInfo.email;
        sessionStorage.setItem('email', email);
        let address = userInfo.address;
        sessionStorage.setItem('address', address);
        let facebook = userInfo.facebook;
        sessionStorage.setItem('facebook', facebook);
        let phone = userInfo.phone;
        sessionStorage.setItem('phone', phone);
        let twitter = userInfo.twitter;
        sessionStorage.setItem('twitter', twitter);
        let skype = userInfo.skype;
        sessionStorage.setItem('skype', skype);

    }

    // user/login
    function login(username, password) {
        let userData = {
            username,
            password
        };

        return requester.post('user', 'login', 'basic', userData);
    }

    // user/register
    function register(username, password, firstName, lastName, email) {
        let userData = {
            username,
            password,
            firstName,
            lastName,
            email
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

    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    function showInfo(message) {
        let infoBox = $('#infoBox');
        infoBox.text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

    function showError(message) {
        let errorBox = $('#errorBox');
        errorBox.text(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 3000);
    }

    $(document).on({
        ajaxStart: () => $(`#loadingBox`).show(),
        ajaxStop: () => $(`#loadingBox`).fadeOut()
    });

    return {
        login,
        register,
        logout,
        saveSession,
        showInfo,
        showError,
        handleError
    }
})()
