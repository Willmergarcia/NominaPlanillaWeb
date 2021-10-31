//cargar mantenimiento de usuarios
$('#adminUsuarios').click(function(){
    $('#pnPrincipal').load('../vistas/usuarios.html');
});

//cargar mantenimiento de puestos
$('#adminPuestos').click(function(){
    $('#pnPrincipal').load('../vistas/puestos.html');
});

//cargar mantenimineto de empresas
$('#adminEmpresas').click(function(){
    $('#pnPrincipal').load('../vistas/empresas.html');
});

//cargar mantenimineto de departamentos
$('#adminDeptos').click(function(){
    $('#pnPrincipal').load('../vistas/depto_lab.html');    
});

//cargar mantenimiento de empleados
$('#adminEmpleados').click(function(){
    $('#pnPrincipal').load('../vistas/empleados.html');    
});

//carga modulo para inasistencias
$('#Inasistencias').click(function(){
    $('#pnPrincipal').load('../vistas/inasistencias.html');
});

//carga modulo de programacion de asistencias
$('#programacionAsis').click(function(){
    $('#pnPrincipal').load("../vistas/programacion.html");
});

//cargar modulo de asistencias 
$('#asistencias').click(function(){
    $('#pnPrincipal').load('../vistas/asistencia.html');
});


//cargar modulo de asistencias
$('#asistenciass').click(function(){
    $('#pnPrincipal').load('../vistas/asistencias.html');
});


//cargar modulo de planilla
$('#planilla').click(function(){
    $('#pnPrincipal').load('../vistas/planilla.html')
});