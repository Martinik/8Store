let chirpsService  = (() => {

    function getKinveyUserAuthHeaders() {
        return {
            'Authorization': "Kinvey " + sessionStorage.getItem('authtoken'),
        };
    }
    function loadAllUsers() {
        return requester.get('user', '', 'kinvey');
    }
    function createChirp(info) {
        $.ajax({
            method: "POST",
            data:info,
            url: "https://baas.kinvey.com/" + "appdata/" + "kid_HJLM4r1v-" +
            '/chirps',
            headers: getKinveyUserAuthHeaders()
        });
    }
    function countChirps() {
        $.ajax({
            method: "GET",
            url: "https://baas.kinvey.com/" + "appdata/" + "kid_HJLM4r1v-" +
            `/chirps?query={"author":"${sessionStorage.getItem('username')}"}`,
            headers: getKinveyUserAuthHeaders(),
            success: loadChirps
        });
    }

    function countFollowers() {
        $.ajax({
            method: "GET",
            url: "https://baas.kinvey.com/" + "appdata/" + "kid_HJLM4r1v-" +
            `/?query={"username":"${sessionStorage.getItem('username')}"}`,
            headers: getKinveyUserAuthHeaders(),
            success: loadFollowers
        });
    }
    function countSubscriptions() {
        return $.ajax({
            method: "GET",
            url: "https://baas.kinvey.com/" + "appdata/" + "kid_HJLM4r1v-" +
            `/?query={"subscriptions":"${sessionStorage.getItem('username')}"}`,
            headers: getKinveyUserAuthHeaders(),
            success: loadSubs
        });
    }
    function loadSubs(subs) {

        let followers=subs.length;

        if(followers==undefined){
            followers=0;
        }

        $('#followersCount').text(`${followers.toString()} followers`);

    }

    function loadFollowers(followers) {

        let subs=followers.length;
        if(subs==undefined){
            subs=0;
        }
        $('#subsCount').text(`${subs.toString()} subs`);

    }
    function loadChirps(chirps) {
        let username = sessionStorage.getItem('username');
        $('#currentUserFeed').text(`${username}`);
        let chirps=chirps;
        let chirpsCount=chirps.length;

        $('#chirpsCount').text(`${chirpsCount.toString()} chirps`);


        for (let ch of chirps) {
            let chr=`<article class=\"chirp\"></article><div class=\"titlebar\"><a href=\"#\" class=\"chirp-author\">${ch.author}</a><span class=\"chirp-time\">${calcTime(ch._kmd)}</span></div><p>${ch.text}</p></article>`;
            $("#chirps").append(chr);
        }
        if(chirps.length==0||chirps==undefined){
            $("#chirps").append("<div class=\"chirp\"><span class=\"loading\">No chirps in database</span></div>");
        }
    }
    function deleteChirp(chirpId) {
        let endpoint = `chirps/${chirpId}`;

        return requester.remove('appdata', endpoint, 'kinvey');
    }

    return {
        createChirp,
        deleteChirp,
        loadUserChirps,
        countChirps,
        loadAllUsers,
        countFollowers,
        countSubscriptions,
        loadSubs,
        loadFollowers,
        loadChirps
    }
})()
