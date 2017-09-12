let petsService = (() => {

    function loadLostPets(amount) {

        let endpoint = `lostPets?sort={"_kmd.ect": -1}&limit=${amount}`;
        return requester.get('appdata', endpoint, 'guest');

    }

    function loadFoundPets(amount) {

        let endpoint = `foundPets?sort={"_kmd.ect": -1}&limit=${amount}`;
        return requester.get('appdata', endpoint, 'guest');

    }


    return {
        loadLostPets,
        loadFoundPets
    }
})();