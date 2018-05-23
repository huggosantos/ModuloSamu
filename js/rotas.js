var app = angular.module('MyApp', ['ngRoute']);
var statusVitima;

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
   .when('/telaPrincipal', {
    templateUrl: 'paginas/telaPrincipal.html',
    controller: 'telaPrincipal'
  })
    .when('/preChamadoSamu', {
    templateUrl: 'paginas/preChamadoSamu.html',
    controller: 'formularioChamado'
  })
    .when('/telaApresentacao', {
    templateUrl: 'paginas/telaApresentacao.html',
    controller: 'telaPrincipal'
  })
  .otherwise('/telaApresentacao', {
   templateUrl: 'templates/telaApresentacao.html',
   controller: 'telaPrincipal'
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


app.controller('sobre', function($scope, $http, $routeParams, $location) {  
  toTop();  
});

app.controller('telaPrincipal', function($scope, $http, $routeParams, $location) {  
  toTop();
   $(window).scrollTop(0);
});


app.controller('formularioChamado', function($scope, $http, $routeParams, $location) {
// metodo que faz a logica para mostrar o Loader na tela 
$scope.mostrarLoader = function(){
  if($scope.aux==null || $scope.aux==false || $scope.aux==true){
   $scope.aux=false;   
   $scope.aux2=true;
 }
}


 iniciarCaptura();
 toTop();

$scope.vitimaComSangue = function () {
  statusVitima = "Vitima com Sangue";
}

$scope.vitimaComDor = function () {
  statusVitima = "Vitima com Dor";
}

$scope.vitimaSemMovimento = function () {
  statusVitima = "Vitima sem Movimento";
}

$scope.vitimaComFratura = function () {
  statusVitima = "Vitima com Fraturas";
}

$scope.vitimaComFebre = function () {
  statusVitima = "Vitima com Febre";
}

$scope.vitimaComTontura = function () {
  statusVitima = "Vitima com Tontura";
}

$scope.vitimaComDorPeito = function () {
  statusVitima = "Vitima com Dor no Peito";
}

$scope.vitimaComQueimadura = function () {
  statusVitima = "Vitima com Queimadura";
}


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
      ref: $scope.chamado.ref,
      clinico: $scope.chamado.tipo,
      latitude: latitude,
      longitude: longitude,
      descricao: $scope.chamado.descricao,
      img: value,
      statusDaVitima : statusVitima,

    },
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'

    }

  }).
   success(function (data) {
    $scope.aux2=false;
    $scope.aux=false;
    $scope.success = true;
    alert("Chamado Enviado com Sucesso!");
    latitude=undefined;
    longitude=undefined;
    $location.path("/telaApresentacao");
    $scope.user = {};
  }).
   error(function (data) {
    $scope.aux2=false;
    $scope.aux=false;
    $scope.error = true;
    alert("Erro ao enviar, verifique sua conxão !");

  }); 
 }
}


});