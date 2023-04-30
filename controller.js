var app = angular.module("MyFirstApp", []);
app.controller("FirstController", ["$scope", function($scope) {
    $scope.nuevoComentario = {};
    $scope.comentarios = [
        {
            comentario: "Buen tutorial!",
            username: "Nico322"
        },
        {
            comentario: "Asco de tutorial >:(",
            username: "hater123"
        },
        
    ];
    $scope.agregarComentario = function() {
        $scope.comentarios.push($scope.nuevoComentario);
        $scope.nuevoComentario = {};
    }
}])