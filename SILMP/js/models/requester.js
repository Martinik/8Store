let requester = (() => {
    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppKey = "kid_SkML9mE9-";
    const kinveyAppSecret = "af8552fd3301489b8c8d33ad0322a683";
    const kinveyMasterSecret = "";
    const guestAccount = "guest";
    const guestPass = "guest";
    let guestCredentials = btoa('guest:guest');


    // Creates the authentication header
    function makeAuth(type) {
        if(type === 'guest'){
            return 'Basic ' + btoa(guestAccount + ':' + guestPass)
        }
        return type === 'basic'
            ?  'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)
            :  'Kinvey ' + sessionStorage.getItem('authtoken');
    }

    // Creates request object to kinvey
    function makeRequest(method, module, endpoint, auth) {
        return req = {
            method,
            url: kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint,
            headers: {
                'Authorization': makeAuth(auth)
            }
        };
    }

    // Function to return GET promise
    function get (module, endpoint, auth) {
        return $.ajax(makeRequest('GET', module, endpoint, auth));
    }

    // Function to return POST promise
    function post (module, endpoint, auth, data) {
        let req = makeRequest('POST', module, endpoint, auth);
        req.data = data;
        return $.ajax(req);
    }

    // Function to return PUT promise
    function update (module, endpoint, auth, data) {
        let req = makeRequest('PUT', module, endpoint, auth);
        req.data = data;
        return $.ajax(req);
    }

    // Function to return DELETE promise
    function remove (module, endpoint, auth) {
        return $.ajax(makeRequest('DELETE', module, endpoint, auth));
    }


    //Function to upload files
    function upload(data, file) {
        console.log('attempt upload');
        let requestURL = kinveyBaseUrl + 'blob/' + kinveyAppKey;

        let requestHeaders = {
            'Authorization': 'Basic ' + guestCredentials,
            'Content-Type': 'application/json',
            'X-Kinvey-Content-Type': data.type
        };

        $.ajax(
            {
                method: 'POST',
                url: requestURL,
                headers: requestHeaders,
                data: JSON.stringify(data),
                public: true
            }
        ).then(
            function (success) {
                console.log('uploading: first ajax success');
                let innerHeaders = success._requiredHeaders;


                innerHeaders['Content-Type'] = file.type;

                let uploadURL = success._uploadURL;
                let element_id = success._id;

                $.ajax({
                        method: 'PUT',
                        url: uploadURL,
                        headers: innerHeaders,
                        processData: false,
                        data: file
                    }
                ).then(
                    function (success) {
                        console.log('Successfully uploaded file!');
                        console.log(success);
                        console.log(uploadURL);
                        console.log(element_id);

                        return {url: uploadURL, id: element_id};

                    }
                )
            }
        )
    }
    return {
        get,
        post,
        update,
        remove
    }
})()