//url para consumir la api
var url = 'https://localhost:44372/api/Asistencias/CreateAsistencia';

var uri = "https://localhost:44372/api/Puestos";

//url para definir los metodos personalizados a base de rutas
var urlsearch = 'https://localhost:44386/api/puesto/search';

//fecha ingreso
$(function() {
    $('input[name="fecha"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        locale:{
            format: 'YYYY-MM-DD'
        }
    });
});



//convertir formulario a json
(function ($) {
    //toma los datos del formulario y los convierte a tipo JSON
    $.fn.serializeFormJSON = function () {
        var objeto = {};
        var formulario = this.serializeArray();
        /* recorre los datos del formulario y los separa por clave y valor */
        $.each(formulario, function () {
            if (objeto[this.name]) {
                if (!objeto[this.name].push) {
                    objeto[this.name] = [objeto[this.name]];
                }
                objeto[this.name].push(this.value || '');
            } else {
                objeto[this.name] = this.value || '';
            }
        });
        return objeto;
    };
})(jQuery);

//variable utilizada para almacenar los puestos 
var puestos = [];

//variable utilizada para acceder al formulario 
var form  = document.getElementById('frmasistencias');

//arreglo de colores para cards y para botones
var colors = [{color:"bg-success"}, {color: "bg-dark"}, {color : "bg-info"}];      
var bgbuttons = [
{color1: "btn-secondary", color2: "btn-dark"},
{color1: "btn-secondary", color2: "btn-info"}, 
{color1: "btn-dark", color2: "btn-success"}];  

/* define la variable que almacena el id de nuestro panel donde se 
*mostraran los datos almacenados */
var contenido = document.querySelector('#contenido');
var msj = document.querySelector('#msj');


/* toma y envia los datos del formulario */
form.addEventListener('submit', function(e){
    e.preventDefault();
    
    var data = $(this).serializeFormJSON();
    data.EmpleadoId = parseInt(data.EmpleadoId);

    var method = "POST";


    action(url,data,method);
});


/*metodo utilizado para crear un nuevo puesto */
function action(url, data, metodo){
    var mensaje =  "";
    //deshabilitar boton
    $('#btng').attr('disabled',true);
    //ejecuta el metodo 
    fetch(url,  {
        method: metodo,
        body : JSON.stringify(data),
        headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json"
        }
    }).then(function(response){
        if(response.ok){
            $('#msj').html("!Datos almacenados exitosamente");
            $('.toast').toast('show');
            $('#EmpleadoId').val('');
            $('#btng').attr('disabled',false);
            return response.json;
        }else{
            alert("No se pudo insertar");
        }
    })
    .then(function(data){
        console.log(data);
    });
}

