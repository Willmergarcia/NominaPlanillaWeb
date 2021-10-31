
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


$('#fecha').change(function(){
    //llamada al metodo para mostrar los datos
    getData();
});

//url para consumir la api
var urlu = 'https://localhost:44372/api/asistencias/GetEmpleadoFecha';

//url para definir los metodos personalizados a base de rutas


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
var model = [];

/* define la variable que almacena el id de nuestro panel donde se 
*mostraran los datos almacenados */
var contenido = document.querySelector('#tb');

/*metodo utilizado para obtener los programacions almacenados */
function getData(){
    fetch(urlu).then(res => res.json())
    .then(data => {
        var i = 0;
        var e = 0;
        var count = 1;
        contenido.innerHTML = ""
        for(let d of data){     
            contenido.innerHTML += `
                <tr>
                <td>${count}</td>
                <td>${d.nombre}</td>
                <td>${d.telefono}</td>
                <td>${d.fecha}</td>              
                </tr>
            `   
            model.push({'horaInicio': '8:00', 'horaFin': '17:00', 'fecha':$('#fecha').val(), 'idempleado': d.idempleado, 'idasistencia': 1})
            count++;
        }
    });
}


$('#btnprocesar').click(function(){
    $(this).attr('disabled',true);
    fetch(urlu,  {
        method: "POST",
        body : JSON.stringify(model),
        headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json"
        }
    }).then(function(response){
        if(response.ok){
            $('#btnprocesar').attr('disabled',false);
            $('#msj').html("!Datos almacenados exitosamente");
            $('.toast').toast('show');
            return response.json;
        }else{
            alert("No se pudo insertar");
        }
    })
    .then(function(data){
        $('#tb').empty();
    });
});