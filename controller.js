var app = angular.module("MyFirstApp", []);
app.controller("FirstController", function($scope) {
    $scope.nombre = 'Nicolas';
    $scope.comentarios = [
        {
            comentario: "Buen tutorial!",
            username: "Nico322"
        },
        {
            comentario: "Asco de tutorial >:(",
            username: "hater123"
        },
        
    ]
})