
function capturarImagem(){
 navigator.camera.getPicture(onSuccess, onFail,
 {
    destinationType : Camera.DestinationType.DATA_URL,
    sourceType : Camera.PictureSourceType.CAMERA
}
);
}

function onSuccess(imageURL) {
    var image = document.getElementById('htmlImagem');
    window.localStorage.setItem("chave",imageURL);

           }

           function onFail(message) {
            Materialize.toast('Câmera Fechada !', 3000)
        }
