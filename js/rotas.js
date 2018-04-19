var app = angular.module('MyApp', ['ngRoute']);

app.config(function($routeProvider) {
  /*ROTAS*/
  $routeProvider
  .when('/formularioChamado', {
    templateUrl: 'paginas/formularioChamado.html',
    controller: 'formularioChamado'
  })
  .when('/sobre', {
    templateUrl: 'paginas/sobre.html',
    controller: 'sobre'
  })
  .when('/andamentoChamado', {
    templateUrl: 'paginas/andamentoChamado.html',
    controller: 'sobre'
  })
  .otherwise('/sobre', {
   templateUrl: 'templates/sobre.html',
   controller: 'sobre'
 });
}).run(function() {
    //remove 300ms delay touch
    //FastClick.attach(document.body);
  });

function toTop(){
  $('html, body').animate({
    scrollTop: 0
  }, 800, 'linear');
}

app.controller('sobre', function($scope) {  
  toTop();
});

app.controller('formularioChamado', function($scope, $http, $routeParams, $location) {
 iniciarCaptura();
 toTop();
 $scope.enviarForm = function(chamado){
 var value = window.localStorage.getItem("chave");
alert(value);
alert(latitude);
  if(latitude==undefined){
   Materialize.toast('Chamado não enviado, Ativar geolocalização !', 7000)
 }
 else if($scope.chamado.tipo==true && value==undefined){
   Materialize.toast('Chamado não enviado, Enviar Foto !', 7000)
 }else{
  
   console.log(value);
   pararCaptura();
   window.localStorage.removeItem("chave");
   $http({
    url: 'https://modulosamu.herokuapp.com/chamado/store',
    method: 'POST',
    data: {
      nome: $scope.chamado.nome,
      numero: $scope.chamado.numero,
      rua: $scope.chamado.rua,
      bairro: $scope.chamado.bairro,
      cidade: $scope.chamado.cidade,
      ref: $scope.chamado.ref,
      clinico: $scope.chamado.tipo,
      latitude: latitude,
      longitude: longitude,
      descricao: $scope.chamado.descricao,
      img: value,

    },
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'

    }

  }).
   success(function (data) {
    $scope.success = true;
    alert("Chamado Envidao");
    latitude=undefined;
    longitude=undefined;
    $location.path("/sobre");
    $scope.user = {};
  }).
   error(function (data) {
    $scope.error = true;

  }); 
 }
}


});