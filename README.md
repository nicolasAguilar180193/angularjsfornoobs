# Angular for noobs

Este repositorio tiene el resultado de seguir el tutorial de codigo facilito de la primera version de angular, tambien conocida como AngularJS, sumada a lectura de algunos temas particulares de la documentacion de Angularjs para generar este archivo.
Se puede encontrar el tutorial de codigo facilito en el siguiente enlace: https://www.youtube.com/playlist?list=PLpOqH6AE0tNhdnOl1mOBthj4C7OHdwQB2.



## ¿Que es Angularjs? 

Angularjs es un framework basado en el lenguaje javascript. Desarrollado por Google para el Desarrollo Web Front End que permite crear aplicaciones SP(Single-Page Applications). 
Usa el patron MVVM (model view view-model), con la que separa la logica de la vista pero las mantiene conectadas(data binding). 


## Conceptos principales

* Modulos - contenedores de otras partes de la aplicacion como directivas, controladores, etc.
* Directives - HTML con superpoderes, permite crear elementos html personalizables
* Controllers -  Contiene la logia de la aplicacion relacionada a una vista en particular.
* Factories y Services - Organiza y comparte codigo en tu app
* Filters - Dan formato a tus datos cuando son presentados.


## ¿Qué es un Módulo? 

Se podria decir que un modulo es un especie de conetenedor para diferentes partes de la aplicacion: controladores, filtros, directivas, servicios, etc.
Se pueden utilizar para dividir la aplicacion en varios modulos. Pero se debe tener un modulo principal para crear una aplicacion y si es necesario este poder cargar otros modulos.
Se declaran/registran con la siguiente sintaxis `angular.module('myApp', [])`. Al objeto angular lo tenemos disponible al incluir angular a nuetro proyecto, el primer parametro del metodo "module" es el nombre de nuestro modulo y en segundo donde se pueden incluir otros modulos, esto retorna un objeto.
Este objeto se puede llamar con `angular.module('myApp')` en cualquier parte de la aplicacion y estara haciendo referencia al mismo siempre, como una especie de variable global, y asi quizas en otro archivo registrar al mudulo 'myApp' un controlador, una directiva, etc.
Para indicar cual es el modulo principal se hace uso de la directiva ng-app asi `<div ng-app="myApp">`, esto le indica a angular que el modulo "myApp" es que se ejecuta para inciar la aplicacion.

## Controlador 

 Un controlador es un contenedor de logica y datos(funciones y variables) para una vista y se relaciona con dicha vista a travez de un objeto llamado `$scope`. Este se crea apartir de un modulo, es decir esta asociado a uno, con el metodo "controller" con la siguiente sintaxis `angular.module('myApp').controller("nombreDelControlador")`.


## Dependency Injection

Dependency Injection (DI) o inyeccciones de dependencia es un patron de software que se ocupa en como los componentes obtienen sus dependencias. En Angularjs este subsistema se encarga 
de crear componentes, resolver sus dependencias(en lugar de codificarlos dentro del componente) y proporcionarlos a otros componentes segun lo soliciten. Evita que un componente localice la dependencia y hace que las dependencias sean configurables.

Componentes que pueden ser inyectables: 
* Value
* Factory
* Service
* Provider
* Constant

#### Value
Es un objeto simple de javascript. Ejemplo:

```javascript
// Defino un modulo
var app = angular.module("MyApp", []);

// Creo un valor y le asigno un dato
app.value("MyValor", 5);

// Inyecto el valor al controlador usando su nombre "MyValor"
app.controller('MyController', function($scope, MyValor) {
 console.log(MyValor)
});
```

#### Factory

Es una funcion que se utliza para devolver un valor. Crea un valor bajo demanda siempre que un servicio o controlador lo requiera. Ejemplo:

```javascript
var app = angular.module("app", []);

//Crea un factory "MathService" que provee un metodo multiply que retorna el multiplo de 2 numeros
app.factory('MathService', function() {
   var factory = {};
   
   factory.multiply = function(a, b) {
      return a * b
   }
   return factory;
}); 

// Inyecta el factory "MathService" en un servicio para ulizar su metodo multiply
app.service('CalcService', function(MathService) {
   this.square = function(a) {
      return MathService.multiply(a,a);
   }
});

```

#### Service

Es objeto tipo 'singleton', solo se puede crear una vez en toda la aplicacion, que contiene 