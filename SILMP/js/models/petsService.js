let petsService = (() => {

    function loadLostPets(amount) {

        let endpoint = `lostPets?sort={"_kmd.ect": -1}&limit=${amount}`;
        return requester.get('appdata', endpoint, 'guest');

    }

    function loadFoundPets(amount) {

        let endpoint = `foundPets?sort={"_kmd.ect": -1}&limit=${amount}`;
        return requester.get('appdata', endpoint, 'guest');

    }

    function loadLostPetsAndSkip(amount, skip) {

        let endpoint = `lostPets?sort={"_kmd.ect": -1}&limit=${amount}&skip=${skip}`;
        return requester.get('appdata', endpoint, 'guest');

    }

    function loadFoundPetsAndSkip(amount, skip) {

        let endpoint = `foundPets?sort={"_kmd.ect": -1}&limit=${amount}&skip=${skip}`;
        return requester.get('appdata', endpoint, 'guest');

    }

    function loadAllLostPets() {

        let endpoint = `lostPets`;
        return requester.get('appdata', endpoint, 'guest');

    }

    function loadAllFoundPets() {

        let endpoint = `foundPets`;
        return requester.get('appdata', endpoint, 'guest');

    }

    function getLostPetById(id) {
        let endpoint = `lostPets/${id}`;
        return requester.get('appdata', endpoint, 'guest');

    }

    function getFoundPetById(id) {
        let endpoint = `foundPets/${id}`;
        return requester.get('appdata', endpoint, 'guest');

    }


    return {
        loadLostPets,
        loadFoundPets,
        loadAllFoundPets,
        loadAllLostPets,
        loadLostPetsAndSkip,
        loadFoundPetsAndSkip,
        getFoundPetById,
        getLostPetById
    }
})();