let usersService = (() => {


    function getLoggedUser() {
        let endpoint = `_me`;
        return requester.get('user', endpoint, 'kinvey');
    }

    function getUserLostPets(userId) {
        let endpoint = `lostPets?query={"_acl.creator": "${userId}"}`;
        return requester.get('appdata', endpoint, 'kinvey');
    }

    function getUserFoundPets(userId) {
        let endpoint = `foundPets?query={"_acl.creator": "${userId}"}`;
        return requester.get('appdata', endpoint, 'kinvey');
    }

    // {"creator":"59b7cecf14ee505004b5fa95"}


    return {
        getLoggedUser,
        getUserLostPets,
        getUserFoundPets
    }
})();