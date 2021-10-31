//url para consumir la api
var urlu = 'https://localhost:44372/api/Usuarios/GetUsuarios';

var urld = "https://localhost:44372/api/Usuarios/";

//url para definir los metodos personalizados a base de rutas
var urltipos = 'https://localhost:44386/api/usuario/tipos';
var urlempresas = 'https://localhost:44372/api/Empresas/GetEmpresas';

//llamada al metodo para mostrar los datos
getData();
//gettipos();
getEmpresas();

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
var formu  = document.getElementById('FrmUsuario');

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
var tipos = document.querySelector('#tipoUsuario');
var emp = document.querySelector('#empresaId');

/*metodo utilizado para obtener los puestos almacenados */
function getData(){
    fetch(urlu).then(res => res.json())
    .then(data => {
        var i = 0;
        var e = 0;
        var count = 1;
        us = data;
        contenido.innerHTML = ""
        for(let d of data){     
            contenido.innerHTML += `
                <div class="col-12 col-md-6 col-lg-4 p-2">
                    <div class="card bg-transparent">
                        <div class="card-body  ${colors[i].color} text-left text-white shadow">
                            <div class="col-12 p-4"><br>
                                <h6><strong>${count}) ${d.user} </strong></h6>
                                <h6><strong> ${d.nombre} </strong></h6>
                                
                            </div>
                            <div class="col-12 text-right">
                               
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
         $('#MdUsuario').modal('hide');
         $('#MdDeleteusuario').modal('hide');
    });
}

/* toma y envia los datos del formulario */
formu.addEventListener('submit', function(e){
    e.preventDefault();
    
    var data = $(this).serializeFormJSON();
    data.tipo = parseInt(data.tipo);
    data.empresaId = parseInt(data.empresaId);

    var ur = urld +"CreateUsuario"
    var method = "POST";

    
    action(ur,data,method);
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
    $('#cp').attr('hidden',false);
    $('#FrmUsuario').trigger('reset');
    $('#MdUsuario').modal('show');
}

/*metodo utilizado para mostrar la modal para eliminar un puesto */
function showModalDelete(id){
    $('#ide').val(id);
    $('#MdDeleteusuario').modal('show');
}

/*metodo utilizado para enviar los datos al formulario para actualizar el puesto */
function sendDataForm(i){
    $('#MdUsuario').modal('show');
    for(var key in us[i]){
        $('#'+key).val(us[i][key]);
    }
    $('#cpassword').val(us[i].password);
}

/*metodo utilizado para eliminar un puesto */
function eliminar(){
    fetch(urlu, {
        method: 'DELETE',
        body : JSON.stringify({idusuario: $('#ide').val()}),
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
        body : JSON.stringify({Nombres: $(this).val()}),
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
                                <h6><strong>${count}) ${d.nombres} ${d.apellidos}</strong></h6>
                                <p>
                                    <strong>  Tipo:</strong> ${d.tipo}
                                </p>
                            </div>
                            <div class="col-12 text-right">
                                <button  data-toggle="tooltip" data-placement="bottom" title="Eliminar" onclick="showModalDelete(${d.idusuario})" class="btn ${bgbuttons[i].color1}">
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

/*metodo utilizado para obtener los tipos de usuario */
function gettipos(){
    fetch(urltipos).then(res => res.json())
    .then(data => {
        tipos.innerHTML = `
             <option value="0">Seleccionar</option>
        `
        for(let d of data){    
            tipos.innerHTML += `
                <option value="${d.idtipo}">${d.descripcion}</option>
            `
        }      
    });
}

/* metodo utilizado para obtener las empresas */
function getEmpresas(){
    fetch(urlempresas).then(res => res.json())
    .then(data => {
        usuarios = data;
        emp.innerHTML = `
           <option value="0">Seleccionar</option>
        `
        for(let d of data){     
            emp.innerHTML += `
                <option value="${d.idempresa}">${d.nombre}</option>
            `
        }
    });
}

/*limpiar input password */
$('#password').click(function(){
    $(this).val("");
    $('#cpassword').val("");
})