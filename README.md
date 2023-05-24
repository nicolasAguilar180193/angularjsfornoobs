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
* Value y constant
* Factory
* Service
* Provider
* Constant

Constant y value solo sirven para objetos simples que no necesitan de inyectar otros elementos.

Provider, factory y service, en cambio nos permiten crear objetos mucho más complejos que dependen de otros objetos. Cada uno es un caso más concreto del anterior, y como gran elemento diferencial, provider permite generar una API para configurar el servicio resultante.


### Ciclo de vida de una aplicacion en AngularJs

Tiene dos fases: la de configuracion y la de ejecucion.

#### Fase de configuracion

Esta se ejecuta primero. Durante esta fase los servicios no pueden instanciarse(no pueden inyectarse en otros objetos). El objetivo de esta fase es definir cual va a ser la configuración de nuestra aplicación a la hora de ejecutarse.
En esta fase, solo podremos inyectar constants y providers.

#### Fase de ejecucion

Empieza cuando termina la fase de configuracion. Es donde se ejecuta la logica de la aplicacion e interactuan las vistas, controladores, servicios, etc.
En esta fase podemos inyectar constants, values, services y factories.


#### Constant

Sirve par almacenar valores simples de cualquier tipo que no deberian cambiar. No permite inyectar dependencias en su definicion, pero si puede inyectase en funciones de configuracion.
Ejemplo definimos una constante SERVERS que contiene las direcciones del servidor tanto de desarrollo como de produccion.

```javascript
myApp.constant('SERVERS',{  DEVELOPMENT: "http://localhost:8080/app", PRODUCTION:"http://myDomain.com/app"});
```

Y se podria utilizar (tanto en config, como en run, controller, service, etc. ) del siguiente modo:

```javascript
myApp.config(['SERVERS', function(SERVERS){
    console.log(SERVERS.PRODUCTION);
}]);
```

#### Value
Permite definir objetos simples que se pueden inyectar únicamente durante la fase de ejecución. No permite inyectar dependencias en su definicion .
Aca tres ejemplos, un string 'token', un objeto 'User' y una funcion 'randomize' que simplemente retorna un numero random.

```javascript
myApp.value('token','a1234567890');

myApp.value('User',{'id': 'someId'})

myApp.value('randomize',function(){ 
   return Math.floor(Math.random()*10000);
})
```


#### Service

Es objeto tipo 'singleton', solo se puede crear una vez en toda la aplicacion, que contiene un conjunto de funciones para realizar ciertas tareas.
El servicio se define mediante la función service(). Este se puede inyectar unicamente durante la fase de ejecucion, si podemos en este caso ya inyectar dependencias en su definicion, pero no es configurable.
Internamente Angular utiliza el metodo 'new' a la hora de instanciar un servicio lo que nos permite usar la palabra reservada 'this'.
Ejemplo donde inyectamos una dependencia (el value token del punto anterior):

```javascript
myApp.service('AuthBearer', ['token', function(token) {
    this.authValue = "bearer " + token;
}]);
```
Y se utilizaría en fase de ejecución (run, controller, service, etc. ) del siguiente modo:

```javascript
myApp.run(['AuthBearer', function(AuthBearer){
    console.log(AuthBearer.authValue);
}]);

// Y tambien se podria inyectar en un controlador al mismo tiempo, por ejemplo.

myApp.controller(['AuthController', function(AuthBearer){
    $scope.token = AuthBearer.authValue;
}]);
```


#### Factory

Es un caso más genérico de service, más enfocado a la inicialización del servicio dado que no devuelve el constructor sino el objeto en sí mismo. Como en el servicio, se puede inyectar únicamente durante la fase de ejecución, y si podemos inyectar dependencias en su definición, aunque no es configurable.

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


#### Provider

Es el caso mas generico de servicio, ademas de generar un servicio inyectable durante la fase de ejecucion y tener la posibilidad 
de inyectar dependencias en su definicion, proporciona una API para la confiiguracion de este servicio antes de que inicie la aplicacion.
Ejemplo: 

```javascript
myApp.provider('logger', function(){
  var logToConsole = false;

  this.enableConsole = function(flag){
    logToConsole = flag;
  };

  this.$get = function(){
    return { 
debug: function(msg){  if(logToConsole){ console.log(msg);} }
    };
  };
})
```

Para configurar el servicio logger, tendríamos que usar su API en la fase de configuración, inyectando el loggerProvider:

```javascript
myApp.config(['loggerProvider', function(loggerProvider){
  loggerProvider.enableConsole(true);
}])

```

Luego en la fase de ejecución, utilizaríamos el servicio logger del modo habitual:

```javascript
myApp.run(['logger', function(logger){
    logger.debug('Hello world');
}])

```


### Peticiones a servidores con $http

"$http" es un servicio del nucleo de angular que permite la comunicacion con servidores HTTP.

```javascript
$http({
  method: 'GET',
  url: '/someUrl'
}).then((response => ) {
    // Esta es una funcion callback que sera llamada una vez la respuesta este disponible
  }, (error) => {
    // Esta cuando ocurra un error o el servidor retorne un status de error.
  });

// O un POST enviando datos

$http({
  method: 'POST',
  url: '/someUrl'.
   data: { 
      nombre: 'Nicolas',
      apellido: 'Aguilar'
   }
   }).then((response => ) {
    // Esta es una funcion callback que sera llamada una vez la respuesta este disponible
  }, (error) => {
    // Esta cuando ocurra un error o el servidor retorne un status de error.
  });
```