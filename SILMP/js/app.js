$(() => {

    let notifications = $(`.notification`)
    notifications.hide();
    notifications.click(function () {
        $(this).hide();
    });

    let shouldInitCustom = true;

    const app = Sammy('#mainContent', function () {

        this.use('Handlebars', 'hbs');

        //Home Page
        this.get('index.html', displayHome);
        this.get('#/index', displayHome);
        this.get('#/home', displayHome);

        //Login Page
        this.get('#/login', displayLogin);
        this.post('#/login', postLogin);

        //Register Page
        this.get('#/register', displayRegister);
        this.post('#/register', postRegister);

        //Logout
        this.get('#/logout', logoutUser);

        //Explore Pages
        this.get('#/explore', displayExplore);
        this.get('#/explore/lost', displayExploreLost);
        this.get('#/explore/found', displayExploreFound);

        //Create Poster Pages
        this.get('#/createLostPoster', displayCreateLostPoster);
        this.post('#/createLostPoster', postCreateLostPoster);

        this.get('#/createFoundPoster', displayCreateFoundPoster);
        this.post('#/createFoundPoster', postCreateFoundPoster);

        $("#editProfile").click(editUserInfo);
        this.get('#/userProfile', displayUserProfile);


        //Pet Details
        this.get('#/petDetails/lost/:petId', displayLostPetDetails);
        this.get('#/petDetails/found/:petId', displayFoundPetDetails);


        // functions

        function displayLostPetDetails(ctx) {
            petsService.getLostPetById(ctx.params.petId)
                .then(function (petData) {
                    ctx.petName = petData.petName;
                    ctx.petGender = petData.petGender;
                    ctx.petBreed = petData.petBreed;
                    ctx.thumbnailURL = petData.thumbnailURL;
                    ctx.petInformation = petData.petInformation;
                    ctx.lat = petData.lat;
                    ctx.lng = petData.lng;
                    ctx.radius = petData.radius;

                    ctx.loadPartials({
                        userDropDown: '../templates/common/userDropDown.hbs',
                        enterDropDown: '../templates/common/enterDropDown.hbs',
                        header: '../templates/common/header.hbs',
                        footer: '../templates/common/footer.hbs',
                        scrollTop: '../templates/common/scrollTop.hbs',
                        exploreScript: '../templates/explore/exploreScript.hbs',

                        petDetailsScript: '../templates/petDetails/petDetailsScript.hbs',
                        lostPetDetails: '../templates/petDetails/lostPetDetails.hbs'

                    }).then(function () {
                        this.partial('../templates/petDetails/lostPetDetailsPage.hbs')
                    });
            })
        }

        function displayFoundPetDetails(ctx) {
            petsService.getFoundPetById(ctx.params.petId)
                .then(function (petData) {
                    ctx.petGender = petData.petGender;
                    ctx.petBreed = petData.petBreed;
                    ctx.thumbnailURL = petData.thumbnailURL;
                    ctx.petInformation = petData.petInformation;
                    ctx.lat = petData.lat;
                    ctx.lng = petData.lng;
                    ctx.radius = petData.radius;

                    ctx.loadPartials({
                        userDropDown: '../templates/common/userDropDown.hbs',
                        enterDropDown: '../templates/common/enterDropDown.hbs',
                        header: '../templates/common/header.hbs',
                        footer: '../templates/common/footer.hbs',
                        scrollTop: '../templates/common/scrollTop.hbs',
                        exploreScript: '../templates/explore/exploreScript.hbs',

                        petDetailsScript: '../templates/petDetails/petDetailsScript.hbs',
                        foundPetDetails: '../templates/petDetails/foundPetDetails.hbs'

                    }).then(function () {
                        this.partial('../templates/petDetails/foundPetDetailsPage.hbs')
                    });
                })
        }

        function postCreateFoundPoster(ctx) {
            // let imgSrc = ctx.params.base64Image;
            let petType = ctx.params.petType;
            let petBreed = ctx.params.petBreed;
            let petGender = ctx.params.petGender;
            let petInformation = ctx.params.petInformation;
            let lat = ctx.params.lat;
            let lng = ctx.params.lng;
            let radius = ctx.params.rad;

            let thumbnailURL = ctx.params.thumbnailURL;
            let thumbnailId = ctx.params.thumbnailId;

            let lostPetData = {
                petType,
                petBreed,
                petGender,
                petInformation,
                thumbnailURL,
                thumbnailId,
                lat,
                lng,
                radius

            };

            requester.post("appdata", "foundPets", "kinvey", lostPetData)
                .then(function () {
                    auth.showInfo('Created Lost Pet Poster!');
                    displayHome(ctx);
                })
                .catch(auth.handleError);
        }

        function postCreateLostPoster(ctx) {

            let petName = ctx.params.petName;
            // let imgSrc = ctx.params.base64Image;
            let petType = ctx.params.petType;
            let petBreed = ctx.params.petBreed;
            let petGender = ctx.params.petGender;
            let petInformation = ctx.params.petInformation;
            let lat = ctx.params.lat;
            let lng = ctx.params.lng;
            let radius = ctx.params.rad;

            let thumbnailURL = ctx.params.thumbnailURL;
            let thumbnailId = ctx.params.thumbnailId;

            let lostPetData = {
                petName,
                petType,
                petBreed,
                petGender,
                petInformation,
                thumbnailURL,
                thumbnailId,
                lat,
                lng,
                radius
            };

            requester.post("appdata", "lostPets", "kinvey", lostPetData)
                .then(function () {
                    auth.showInfo('Created Lost Pet Poster!');
                    displayHome(ctx);
                })
                .catch(auth.handleError);
        }

        function displayCreateLostPoster(ctx) {
            ctx.loadPartials({
                userDropDown: '../templates/common/userDropDown.hbs',
                enterDropDown: '../templates/common/enterDropDown.hbs',
                header: '../templates/common/header.hbs',
                footer: '../templates/common/footer.hbs',
                scrollTop: '../templates/common/scrollTop.hbs',
                scripts: '../templates/common/scripts.hbs',

                createLostForm: '../templates/createLostPoster/createLostForm.hbs',
                createLostPosterScript: '../templates/createLostPoster/createLostPosterScript.hbs'
            }).then(function () {
                this.partial('../templates/createLostPoster/createLostPage.hbs')
            })
        }

        function displayCreateFoundPoster(ctx) {
            ctx.loadPartials({
                userDropDown: '../templates/common/userDropDown.hbs',
                enterDropDown: '../templates/common/enterDropDown.hbs',
                header: '../templates/common/header.hbs',
                footer: '../templates/common/footer.hbs',
                scrollTop: '../templates/common/scrollTop.hbs',
                scripts: '../templates/common/scripts.hbs',

                createFoundForm: '../templates/createFoundPoster/createFoundForm.hbs',
                createFoundPosterScript: '../templates/createFoundPoster/createFoundPosterScript.hbs'
            }).then(function () {
                this.partial('../templates/createFoundPoster/createFoundPage.hbs')
            })
        }

        function displayExploreFound(ctx) {

            $(`#loadingBox`).show();

            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.firstName = sessionStorage.getItem('firstName');
            ctx.lastName = sessionStorage.getItem('lastName');
            ctx.email = sessionStorage.getItem('email');

            petsService.loadFoundPets(16).then(function (foundPetsData) {

                ctx.pets = foundPetsData;

                ctx.loadPartials({
                    userDropDown: '../templates/common/userDropDown.hbs',
                    enterDropDown: '../templates/common/enterDropDown.hbs',
                    header: '../templates/common/header.hbs',
                    footer: '../templates/common/footer.hbs',
                    scrollTop: '../templates/common/scrollTop.hbs',
                    scripts: '../templates/common/scripts.hbs',

                    petThumbnail: '../templates/explore/petThumbnail.hbs'

                }).then(function () {
                    this.partial('../templates/explore/exploreFoundPage.hbs')
                }).then(startPageScript)
                    .catch(auth.handleError);
            });

            function startPageScript() {
                $(`#loadingBox`).fadeOut()
                let loadMoreLink = $(`#loadMore`);
                loadMoreLink.click(loadMorePets);
                function loadMorePets() {
                    console.log('TODO: load more pets');
                    //TODO
                }
            }
        }

        function displayExploreLost(ctx) {

            $(`#loadingBox`).show();

            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.firstName = sessionStorage.getItem('firstName');
            ctx.lastName = sessionStorage.getItem('lastName');
            ctx.email = sessionStorage.getItem('email');

            petsService.loadLostPets(16).then(function (lostPetsData) {

                ctx.pets = lostPetsData;

                ctx.loadPartials({
                    userDropDown: '../templates/common/userDropDown.hbs',
                    enterDropDown: '../templates/common/enterDropDown.hbs',
                    header: '../templates/common/header.hbs',
                    footer: '../templates/common/footer.hbs',
                    scrollTop: '../templates/common/scrollTop.hbs',
                    scripts: '../templates/common/scripts.hbs',

                    petThumbnail: '../templates/explore/petThumbnail.hbs'

                }).then(function () {
                    this.partial('../templates/explore/exploreLostPage.hbs')
                }).then(startPageScript)
                    .catch(auth.handleError);
            });

            function startPageScript() {
                $(`#loadingBox`).fadeOut()
                let loadMoreLink = $(`#loadMore`);
                loadMoreLink.click(loadMorePets);
                function loadMorePets() {
                    console.log('TODO: load more pets');
                    //TODO
                }
            }
        }

        function displayExplore(ctx) {

            $(`#loadingBox`).show();

            let searchPetType = 'all';

            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.firstName = sessionStorage.getItem('firstName');
            ctx.lastName = sessionStorage.getItem('lastName');
            ctx.email = sessionStorage.getItem('email');

            let lostPets = [];
            let foundPets = [];
            let allPets = [];

            petsService.loadLostPets(8).then(function (lostPetsData) {
                petsService.loadFoundPets(8).then(function (foundPetsData) {
                    lostPets = lostPetsData;
                    foundPets = foundPetsData;
                    allPets.push.apply(allPets, lostPets);
                    allPets.push.apply(allPets, foundPets);


                    allPets.sort(function(a, b) {

                        return (b._kmd.ect) - (a._kmd.ect);
                    });

                    ctx.pets = allPets;

                    ctx.loadPartials({
                        userDropDown: '../templates/common/userDropDown.hbs',
                        enterDropDown: '../templates/common/enterDropDown.hbs',
                        header: '../templates/common/header.hbs',
                        footer: '../templates/common/footer.hbs',
                        scrollTop: '../templates/common/scrollTop.hbs',
                        exploreScript: '../templates/explore/exploreScript.hbs',

                        petThumbnail: '../templates/explore/petThumbnail.hbs'

                    }).then(function () {
                        this.partial('../templates/explore/explorePage.hbs')
                    }).then(startPageScript)
                        .catch(auth.handleError);


                })
            });


            function startPageScript() {
                $(`#loadingBox`).fadeOut()
                let loadMoreLink = $(`#loadMore`);
                loadMoreLink.click(loadMorePets);

                function loadMorePets() {
                    console.log('TODO: load more pets');
                    //TODO
                }
            }
        }


        function logoutUser(ctx) {
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo('Logged Out!');
                    displayHome(ctx);
                })
                .catch(auth.handleError);
        }

        function postLogin(ctx) {

            let username = ctx.params.username;
            let password = ctx.params.password;

            auth.login(username, password)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo('Logged In!');
                    displayHome(ctx);
                })
                .catch(auth.handleError);

        }


        function postRegister(ctx) {
            let firstName = ctx.params.firstName;
            let lastName = ctx.params.lastName;
            let email = ctx.params.email;
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPassword = ctx.params.repeatPassword;

            if (password !== repeatPassword) {
                auth.showError('Passwords do not match!')
            }
            else {
                auth.register(username, password, firstName, lastName, email)
                    .then(function (userInfo) {
                        auth.saveSession(userInfo);
                        auth.showInfo('Registered!');
                        displayHome(ctx);
                    })
                    .catch(auth.handleError);
            }
        }

        function displayRegister(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.firstName = sessionStorage.getItem('firstName');
            ctx.lastName = sessionStorage.getItem('lastName');
            ctx.email = sessionStorage.getItem('email');

            ctx.loadPartials({
                userDropDown: '../templates/common/userDropDown.hbs',
                enterDropDown: '../templates/common/enterDropDown.hbs',
                header: '../templates/common/header.hbs',
                footer: '../templates/common/footer.hbs',
                scrollTop: '../templates/common/scrollTop.hbs',
                scripts: '../templates/common/scripts.hbs',

                registerForm: '../templates/register/registerForm.hbs'

            }).then(function () {
                this.partial('../templates/register/registerPage.hbs')
            })
        }

        function displayLogin(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.firstName = sessionStorage.getItem('firstName');
            ctx.lastName = sessionStorage.getItem('lastName');
            ctx.email = sessionStorage.getItem('email');

            ctx.loadPartials({
                userDropDown: '../templates/common/userDropDown.hbs',
                enterDropDown: '../templates/common/enterDropDown.hbs',
                header: '../templates/common/header.hbs',
                footer: '../templates/common/footer.hbs',
                scrollTop: '../templates/common/scrollTop.hbs',
                scripts: '../templates/common/scripts.hbs',

                loginForm: '../templates/login/loginForm.hbs'

            }).then(function () {
                this.partial('../templates/login/loginPage.hbs')
            })
        }

        function editUserInfo() {
            let userInfo = $('#editForm').serializeArray().map(function (x) {
                data[x.name] = x.value;
            });

            let userid = sessionStorage.getItem('userId');

            return requester.update('user', userid, 'kinvey', userInfo).then(
                displayUserProfile(ctx)
            );

        }

        function displayUserProfile(ctx) {
            $(`#loadingBox`).show();

            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.firstName = sessionStorage.getItem('firstName');
            ctx.lastName = sessionStorage.getItem('lastName');
            ctx.email = sessionStorage.getItem('email');

            ctx.loadPartials({
                userDropDown: '../templates/common/userDropDown.hbs',
                enterDropDown: '../templates/common/enterDropDown.hbs',
                header: '../templates/common/header.hbs',
                footer: '../templates/common/footer.hbs',
                scrollTop: '../templates/common/scrollTop.hbs',
            }).then(function () {
                this.partial('../templates/home/userProfilePage.hbs')
            }).catch(auth.handleError);

        }

        async function displayHome(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.firstName = sessionStorage.getItem('firstName');
            ctx.lastName = sessionStorage.getItem('lastName');
            ctx.email = sessionStorage.getItem('email');
            petsService.loadLostPets(5)
                .then(function () {

                })
            ctx.lostPets = await petsService.loadLostPets(5);
            ctx.foundPets = await petsService.loadFoundPets(5);

            // #template variables
            ctx.loadPartials({
                userDropDown: '../templates/common/userDropDown.hbs',
                enterDropDown: '../templates/common/enterDropDown.hbs',
                header: '../templates/common/header.hbs',
                footer: '../templates/common/footer.hbs',
                scrollTop: '../templates/common/scrollTop.hbs',
                scripts: '../templates/common/scripts.hbs',
                mapScript: '../templates/home/mapScript.hbs',

                welcomeSection: '../templates/home/welcomeSection.hbs',
                aboutSection: '../templates/home/aboutSection.hbs',
                carouselLostPet: '../templates/home/carouselLostPet.hbs',
                carouselFoundPet: '../templates/home/carouselFoundPet.hbs',
                lostPetsCarousel: '../templates/home/lostPetsCarousel.hbs',
                foundPetsCarousel: '../templates/home/foundPetsCarousel.hbs',
                mapSection: '../templates/home/mapSection.hbs',
                contactSection: '../templates/home/contactSection.hbs'
            }).then(function () {
                this.partial('../templates/home/homePage.hbs').then(function () {
                    if (shouldInitCustom) {
                        templateCustom();
                        shouldInitCustom = false;
                    }
                })
            })
        }

    });
    app.run();
});
