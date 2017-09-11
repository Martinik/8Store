let appService  = (() => {

    function getKinveyUserAuthHeaders() {
        return {
            'Authorization': "Kinvey " + sessionStorage.getItem('authtoken'),
        };
    }
    function loadAllUsers() {
        return requester.get('user', '', 'kinvey');
    }
    function loadAllLostPets() {
        return requester.get('lostPets', '', 'kinvey');
    }
    function loadAllFoundPets() {
        return requester.get('foundPets', '', 'kinvey');
    }
    return {
        loadAllUsers,
        loadAllLostPets,
        loadAllFoundPets
    }
})()
