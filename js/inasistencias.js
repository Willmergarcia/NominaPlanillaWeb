
//fecha ingreso
$(function() {
    $('input[name="fechaInicio"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        locale:{
            format: 'YYYY-MM-DD'
        }
    });
});

//fecha ingreso
$(function() {
    $('input[name="fechaFin"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        locale:{
            format: 'YYYY-MM-DD'
        }
    });
});


//url para consumir la api
var urlu = 'https://localhost:44386/api/inasistencias';

//url para definir los metodos personalizados a base de rutas
var urlsearch = 'https://localhost:44386/api/inasistencias/search';
var urlempleado = 'https://localhost:44386/api/empleado';

//llamada al metodo para mostrar los datos
getData();
getEmpleados();

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
var us = [];

//variable utilizada para acceder al formulario 
var formu  = document.getElementById('Frminasistencias');

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
var idempleado = document.querySelector('#idempleado');
/*metodo utilizado para obtener los inasistenciass almacenados */
function getData(){
    fetch(urlu).then(res => res.json())
    .then(data => {
        var i = 0;
        var e = 0;
        var count = 1;
        us = data;
        console.log(data);
        contenido.innerHTML = ""
        for(let d of data){     
            contenido.innerHTML += `
                <div class="col-12 col-md-6 col-lg-4 p-2">
                    <div class="card bg-transparent">
                        <div class="card-body  ${colors[i].color} text-left text-white shadow">
                            <div class="col-12"><br>
                                <h6>${count}) ${d.nombre}</h6>
                                <p>
                                    Motivo: ${d.descripcion}
                                </p>
                            </div>
                            <div class="col-12 text-right">
                                <button  data-toggle="tooltip" data-placement="bottom" title="Eliminar" onclick="showModalDelete(${d.idinasitencia})" class="btn ${bgbuttons[i].color1}">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                                <button  data-toggle="tooltip" data-placement="bottom" title="Editar" onclick="sendDataForm(${e})" class="btn ${bgbuttons[i].color2}">
                                <i class="fas fa-pen"></i>
                                </button>
                            </div>
                        </div>       
                    </div>
                </div>
            `   
            console.log(colors[i].color);
            if(i == 2){ i = 0;}else{
                i++;
            }     
            e++;
            count++;

        }

        contenido.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4 p-2">
                <div class="card shadow">
                    <div onclick="showModal()" class="card-body btn btn-light  shadow" style="cursor:pointer">
                        <div class="col-12">
                            <br>
                            <h1>
                            +
                            </h1>
                            <p>&nbsp;</p>
                        </div>
                    </div>      
                </div>
            </div>
        `
         $('#Mdempleado').modal('hide');
         $('#MdDeleteinasistencias').modal('hide');
    });
}

/* toma y envia los datos del formulario */
formu.addEventListener('submit', function(e){
    e.preventDefault();
    
    var data = $(this).serializeFormJSON();

    var method = "POST";

    console.log(data.idinasitencia);

    if(data.idinasitencia > 0){
        method = "PUT";
    }

    action(urlu,data,method);
});

/*metodo utilizado para crear un nuevo puesto */
function action(url, data, metodo){
    var mensaje =  "";
    //deshabilitar boton
    $('#btngu').attr('disabled',true);
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
            getData();
            $('#btngu').attr('disabled',false);
            return response.json;
        }else{
            alert("No se pudo insertar");
        }
    })
    .then(function(data){
        console.log(data);
    });
}

/*metodo utilizado para mostrar la modal que contiene el formulario 
para crear nuevos puestos */
function showModal(){
    $('#Frminasistencias').trigger('reset');
    $('#Mdempleado').modal('show');
}

/*metodo utilizado para mostrar la modal para eliminar un puesto */
function showModalDelete(id){
    $('#ide').val(id);
    $('#MdDeleteinasistencias').modal('show');
}

/*metodo utilizado para enviar los datos al formulario para actualizar el puesto */
function sendDataForm(i){
    $('#Mdempleado').modal('show');
    for(var key in us[i]){
        $('#'+key).val(us[i][key]);
    }
    $('#cpassword').val(us[i].password);
}

/*metodo utilizado para eliminar un puesto */
function eliminar(){
    fetch(urlu, {
        method: 'DELETE',
        body : JSON.stringify({idinasitencia: $('#ide').val()}),
        headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json"
        }
    }).then(function(response){
        if(response.ok){
            getData();
            $('#msj').text("Datos eliminados exitosamente");
            $('.toast').toast('show');
            return response.json;
        }else{
            alert("No se pudo insertar");
        }
    })
    .then(function(data){
        console.log(data);
    });
}

/*metodo utilizado para realizar una busqueda */
$('#search').keyup(function(){
    console.log($(this).val());
    fetch(urlsearch, {
        method: 'POST',
        body : {Nombres: $(this).val()},
        headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then(data => {
        var i = 0;
        var e = 0;
        var count = 1;
        contenido.innerHTML = ""
        for(let d of data){
            contenido.innerHTML += `
                <div class="col-12 col-md-6  col-lg-4 p-2">
                    <div class="card bg-transparent">
                        <div class="card-body  ${colors[i].color} text-left text-white shadow">
                            <div class="col-12"><br>
                                <h6><strong>${count}) ${d.nombre}</strong></h6>
                                <p>
                                    Motivo: ${d.descripcion}
                                </p>
                            </div>
                            <div class="col-12 text-right">
                                <button  data-toggle="tooltip" data-placement="bottom" title="Eliminar" onclick="showModalDelete(${d.idinasitencia})" class="btn ${bgbuttons[i].color1}">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                                <button  data-toggle="tooltip" data-placement="bottom" title="Editar" onclick="sendDataForm(${e})" class="btn ${bgbuttons[i].color2}">
                                <i class="fas fa-pen"></i>
                                </button>
                            </div>
                        </div>       
                    </div>
                </div>
            `   
            console.log(colors[i].color);
            if(i == 2){ i = 0;}else{
                i++;
            }     
            e++;
            count++;
        }

        contenido.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4 p-2">
                <div class="card shadow">
                    <div onclick="showModal()" class="card-body btn btn-light  shadow" style="cursor:pointer">
                        <div class="col-12">
                            <br>
                            <h1>
                            +
                            </h1>
                            <p>&nbsp;</p>
                        </div>
                    </div>      
                </div>
            </div>
        `
        
         $('#Mdpuesto').modal('hide');
         $('#MdDeletepuesto').modal('hide');
    });
});

/* metodo utilizado para obtener los departamentos */
function getEmpleados(){
    fetch(urlempleado).then(res => res.json())
    .then(data => {
        idempleado.innerHTML = `
           <option value="0">Seleccionar</option>
        `
        for(let d of data){     
            idempleado.innerHTML += `
                <option value="${d.idempleado}">${d.nombres} ${d.apellidos}</option>
            `
        }
    });
}

/*limpiar input password */
$('#password').click(function(){
    $(this).val("");
    $('#cpassword').val("");
})

