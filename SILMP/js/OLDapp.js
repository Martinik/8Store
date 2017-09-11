$(() => {

    // Attach event handlers
    (() => {
        $('header').find('a[data-target]').click(navigateTo);
        $('#formRegister').submit(registerUser);

        $('#formLogin').submit(loginUser);

        $('#linkMenuLogout').click(logoutUser);

        $('#formSendMessage').submit(sendMessage);

        $('#navbar-logout-btn').click(logoutUser());
    })();

    if(sessionStorage.getItem('authtoken') === null){
        userLoggedOut();
    } else {
        userLoggedIn();
    }
    function logoutUser() {
        auth.logout()
            .then(() => {
                sessionStorage.clear();
                showInfo('Logout successful.');
                userLoggedOut();
            }).catch(handleError);
    }

    // LOGIC TO LOGIN USER
    function loginUser(ev) {
        ev.preventDefault();
        let first_name = $('#first_name').val();
        let last_name = $('#last_name').val();
        let display_name = $('#display_name').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let password_confirmation = $('#password_confirmation').val();


        auth.login(usernameVal, passwdVal)
            .then((userInfo) => {
                saveSession(userInfo);
                inputUsername.val('');
                inputPassword.val('');
                showInfo('Login successful.');
            }).catch(handleError);
    }

    // LOGIC TO REGISTER USER
    function registerUser(ev) {
        ev.preventDefault();

        let first_name = $('#first_name').val();
        let last_name = $('#last_name').val();
        let display_name = $('#display_name').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let password_confirmation = $('#password_confirmation').val();

        auth.register(first_name, last_name, display_name,email,password,password_confirmation)
            .then((userInfo) => {
                saveSession(userInfo);
            }).catch(handleError);
    }

    function saveSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authtoken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        sessionStorage.setItem('username', username);
        userLoggedIn();
    }


})
