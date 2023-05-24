var app = angular.module("MyFirstApp", []);
app.controller("FirstController", ["$scope", "$http", function($scope, $http) {
    
    $scope.posts = [];
    $scope.newPost = {};

    $http({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts'
    }).then((response) => {
        console.log(response.data);
        $scope.posts = response.data;
    }, (error) => {
        console.error("Error: " + error);
    });

    $scope.addPost = function() {
        $http({
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts',
            data: { 
                title: $scope.newPost.title,
                body: $scope.newPost.body,
                userId: 1
            }
        }).then((response) => {
            alert("Agregado");
            console.log(response)
            $scope.posts.push($scope.newPost);
            $scope.newPost = {};
        }, (error) => {
            console.error("Error: " + error);
        });
    }
}])