
var guest_app = angular.module("guest_app", ["ngRoute"]);

//Configuration...(index Page)

guest_app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
        templateUrl : "login.html"
    })
    .when("/home", {
        templateUrl : "home.html"
    })
    .when("/login", {
        templateUrl : "login.html"
    })
	.when("/add_receptionist", {
        templateUrl : "add_receptionist.html"
    })
   .when("/add_visitor", {
        templateUrl : "add_visitor.html"
    })
    .when("/view_visitor", {
        templateUrl : "view_visitor.html"
    })
    .when("/update_visitor", {
        templateUrl : ".html"
    })
	 .when("/delete_visitor", {
        templateUrl : ".html"
    })
    .when("/about_us", {
        templateUrl : "about_us.html"
    })
	.when("/logout", {
        templateUrl : "logout.html",
		controller :"logout"
    });
});

//Receptionst Register (Registration)

guest_app.controller('add_receptionist', function($scope,$http,$window) {
    $scope.add_receptionistRequest = function(){
		var request = $http({method: "post",url:"http://atithi.dev.tudip.com/api/auth/register",
			data: {
					name:$scope.name,
					email: $scope.email_id,
					password: $scope.password
            },
            headers: { 'Content-Type': 'application/json' }
        })
        request.success(function (response) 
        {
			$window.sessionStorage.setItem('add_receptionistToken',response.token);
			var add_receptionistToken = $window.sessionStorage.getItem('add_receptionistToken');				
			alert("User Added Sucessfully...!");	
			$location.url("/login");
        })
		request.error(function (response) 
        {			
			alert("Some Problem is there...!");					
        })
	}
});

//Login Entry (Login)

guest_app.controller('login', function($scope,$http,$window,$location) {
    $scope.loginRequest= function(){
		var request = $http({method: "post",url:"http://atithi.dev.tudip.com/api/auth/login",
			data: {
                email: $scope.username,
                password: $scope.password
            },
            headers: { 'Content-Type': 'application/json' }
        })
        request.success(function (response) 
        {
			$window.sessionStorage.setItem('login_Token',response.token);
			var token=$window.sessionStorage.getItem('login_Token');
			alert("Login Sucessfully...!");
			$location.url("/add_visitor");
        })
		request.error(function (response) 
        {			
			alert("Invalid User...!");					
        })
	}
});

// Guest Entry Token (Add Visitor) 

guest_app.controller('add_visitor', function($scope,$http,$window) {
    $scope.add_visitorRequest= function(){
		var login_Token=$window.sessionStorage.getItem('login_Token');
		var request = $http({method: "post",url:"http://atithi.dev.tudip.com/api/visitors/store?token="+login_Token,
			data: {
				name:$scope.name,
                email: $scope.email_id,
                phone_no: $scope.contact,
				in_time: 1472556415,
				out_time: 1472556999				
            },
            headers: { 'Content-Type': 'application/json' }
        })
        request.success(function (response) 
        {				
				alert("Visitors added successfully...!");
				$location.url("/view_visitor");
        })
		request.error(function (response) 
        {			
			alert("Some Problem is there...!");					
        })
	}
});
 

guest_app.controller('view_visitor', function($scope,$http,$window) {
	
//View Guest Booked (View Visitors)

    $scope.view_visitorRequest= function(){
		var view_visitor=$window.sessionStorage.getItem('login_Token');
		var request = $http.get("http://atithi.dev.tudip.com/api/visitors?token="+view_visitor)
        .then(function (response) 
        {			
            $scope.myWelcome = response.data;			
        })
		request.success(function (response) 
        {				
			 alert("Data View Sucessfully...!");
        })
		request.error(function (response) 
        {			
			 alert("Data is NOT View...!");					
        })
	}
	
// Guest Entry Token (Update Visitor)   

    $scope.update_visitorRequest= function(content){
        var login_Token=$window.sessionStorage.getItem('login_Token');
		var request = $http({method: "post",url:"http://atithi.dev.tudip.com/api/visitors/" + content.id +"?token="+ login_Token,
		data: {
				name:this.content.name,
                email: this.content.email,
                phone_no: this.content.phone_no,
				in_time: 1472556415,
				out_time: 1472556999				
            },
            headers: { 'Content-Type': 'application/json' }
        })
        request.success(function (response) 
        {				
			 alert("Update Data Sucessfully...!");				
        })
		request.error(function (response) 
        {			
			alert("Data is NOT updated...!");					
        })
	}	
	
//Delete Visitors (Delete visitors)

	$scope.delete_visitorRequest= function(content){
       	var login_Token=$window.sessionStorage.getItem('login_Token');
		var request = $http({method: "delete",url:"http://atithi.dev.tudip.com/api/visitors/" + content.id +"?token="+ login_Token,
			headers: { 'Content-Type': 'application/json' }
        })
        request.success(function (response) 
        {				
			 alert("User Deleted Sucessfully...!");
			 $scope.view_visitorRequest();
        })
		request.error(function (response) 
        {			
			alert("User NOT Deleted...!");	
        })
	}
	
// View Specific Visitor (View Specific Visitor)
	
	$scope.view_visitorUniqueRequest= function(){
		var view_visitor=$window.sessionStorage.getItem('login_Token');
		var request = $http.get("http://atithi.dev.tudip.com/api/visitors/"+$scope.user_id_view+"?token="+view_visitor)
        .then(function (response) 
        {		
            $scope.myWelcome = response.data;
        })
		request.success(function (response)
        {				
			 alert("Specific User View Sucessfully...!");
        })
		request.error(function (response) 
        {			
			 alert("Data is NOT View...!");					
        })
	}

});

