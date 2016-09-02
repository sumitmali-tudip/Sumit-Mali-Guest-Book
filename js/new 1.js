'use strict';
//Log page
var app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider.
    when("/signup", {
        templateUrl: "view/signup.html",
        controller: 'signup',
        access: {
            isFree: true
        }
    }).when("/forgot", {
        templateUrl: "view/forgot.html",
        controller: 'forgot'
    }).when("/admin", {
        templateUrl: "view/admin.html",
        controller: 'admin'
    }).when("/recep", {
        templateUrl: "view/login.html"
    }).otherwise({
        templateUrl: "view/login.html",
        controller: 'login'

    })

});


app.controller('forgot', function ($scope, $http, $location) {
    $scope.cancel = function () {
        $location.url('/');
    };
    $scope.submit = function () {
        //login
        var request = $http({
            method: "post", url: "php/forgot.php",
            data: {
                email: $scope.email
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.success(function (data) {
            if (data) {
                alert('your password is ' + data);
                $location.url('/');
            }
            else {
                alert("Email not matched with us...try to remember or take permission");
                $location.url('/forgot.html');

            }
        });
    };
});

app.controller('admin', function ($scope, $http, $location) {
    //for displaying login and signup
    //login
    $scope.submit = function () {
        var request = $http({
            method: "post", url: "php/admin.php",
            data: {
                email: $scope.email,
                pass: $scope.password,
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.success(function (data) {
            if (data == "0") {
                localStorage.setItem("user", $scope.email);
                document.getElementById("logimg").src = "img/logout.png";
                document.getElementById("logimg").alt = "logout";

                angular.bootstrap(document.getElementById("index"), ['home']);
            } else
                alert('Wrong credential,try again');
        });
    };
});


app.controller('login', function ($scope, $http, $location) {
    //for displaying login and signup
    //login


    $scope.submit = function () {
        var request = $http({
            method: "post", url: "php/login.php",
            data: {
                email: $scope.email,
                pass: $scope.password,
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.success(function (data) {
            if (data == "0") {
                localStorage.setItem("user", $scope.email);
                document.getElementById("logimg").src = "img/logout.png";
                document.getElementById("logimg").alt = "logout";

                angular.bootstrap(document.getElementById("index"), ['home']);
            } else
                alert('Wrong credential,try again');
        });
    };
});
app.controller('signup', function ($scope, $http, $location) {
    $scope.cancel = function () {
        $location.url('/');
    };

    $scope.submit = function () {
        var request = $http({
            method: "post", url: "php/signup.php",
            data: {
                email: $scope.email,
                pass: $scope.password,
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.success(function (data) {
            if (data == "0") {
                alert("succesfully registered");
                $location.url('/');

            }
            else {
                alert("Not valid");
            }
        });
    };
});







//Home page

var app2 = angular.module("home", ["ngRoute"]);

app2.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "view/dashboard.html"

    })
    .when("/add", {
        templateUrl: "view/add.html",
        controller: 'add'
    }).when("/view", {
        templateUrl: "view/view.html",
        controller: 'view'

    }).when("/service", {
        templateUrl: "view/services.html",
        controller: 'service'

    }).when("/help", {
        templateUrl: "view/dashboard.html"

    })
    .otherwise({
        templateUrl: "view/dashboard.html",
        controller: 'dashboard'
    });
});


app2.controller('dashboard', function ($scope) {
    if (localStorage.getItem('user') === undefined)
        $location.url('/');
});

app2.controller('add', function ($scope, $http, $filter, $route, $location) {
    if (localStorage.getItem('user') === undefined)
        $location.url('/');
    $scope.cancel = function () {
        $location.url('/');

    };

    $scope.submit = function () {
        //login
        $scope.date = $filter("date")(Date.now(), 'yyyy-MM-dd');
        var request = $http({
            method: "post", url: "php/add.php",
            data: {
                name: $scope.name, email: $scope.email, gender: $scope.gender, address: $scope.address, date: $scope.date, phone: $scope.phone, intime: $scope.intime, contact_person: $scope.contact_person, val: '2', role: localStorage.getItem('user')
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.success(function (data) {
            if (data == "0") {
                alert("Succesfully added");
                $location.url('/');

            }
            else {
                alert("Not added");
                $location.url('/');

            }
        });
    };
});

app2.controller('view', function ($scope, $http, $location) {
    if (localStorage.getItem('user') === undefined)
        $location.url('/');
    $http.get('php/view.php').then(function (response) {
        // here the data from the api is assigned to a variable named users
        console.log($scope.names = response.data);
        $scope.show = true;
    });


    $scope.back = function () {
        $scope.flag = false;
        $location.url('/');

    };
});

app2.controller('service', function ($scope, $http, $location) {
    if (localStorage.getItem('user') === undefined)
        $location.url('/');
    $scope.back = function () {
        $location.url('view/dashboard.html');
    };

    $scope.name = ""; $scope.email = ""; $scope.date = ""; $scope.phone = ""; $scope.time = ""; $scope.contact_person = ""; $scope.address = ""; $scope.gender = "";
    $scope.selected = {};
    var request = $http({
        method: "post", url: "php/service.php",
        data: {
            email: localStorage.getItem('user')
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    request.success(function (data) {
        if (data == '0') {
            $http.get('php/view.php').then(function (response) {
                // here the data from the api is assigned to a variable named users
                console.log($scope.names = response.data);
                $scope.show = true;
            });

        }
        else {
            $http.get('php/viewc.php', { params: { user: localStorage.getItem('user') } }).then(function (response) {
                // here the data from the api is assigned to a variable named users
                console.log($scope.names = response.data);
            });
        }
    });




    $scope.getTemplate = function (x) {
        if (x.id === $scope.selected.id) {
            return 'edit';
        }
        else return 'display';
    };

    $scope.removeitem = function (x, index) {
        var request = $http({
            method: "post", url: "php/delete.php",
            data: { val: x },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        request.success(function (data) {
            $scope.names.splice(index, 1);
            alert(data);
        });
    };


    $scope.edit_visitor = function (x) {

        $scope.selected = angular.copy(x);
        $scope.id = x.id; $scope.name = x.name; $scope.email = x.email; $scope.gender = x.gender; $scope.date = x.date; $scope.phone = x.phone; $scope.time = x.time; $scope.contact_person = x.contact_person; $scope.address = x.address;
    };

    $scope.reset = function (x) {
        $scope.selected = {};
        x.name = $scope.name; x.email = $scope.email; x.date = $scope.date; x.phone = $scope.phone; x.time = $scope.time; x.address = $scope.address; x.contact_person = $scope.contact_person;
    };
    $scope.update = function (x) {
        var request = $http({
            method: "post", url: "php/update.php",
            data: { id: x.id, name: x.name, email: x.email, gender: x.gender, date: x.date, phone: x.phone, time: x.time, contact_person: x.contact_person, address: x.address },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        request.success(function (data) {
            alert(data);
            $scope.selected = {};
        });
    };

});
angular.bootstrap(document.getElementById("home"), ['myApp']);
function log() {

    if (document.getElementById("logimg").alt == 'logout') {
        document.getElementById("logimg").src = "img/login.png";
        angular.bootstrap(document.getElementById("index"), ['myApp']);
        localStorage.removeItem('user');
    }
}