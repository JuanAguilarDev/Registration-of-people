// Logica de la aplicacion 

const db = require('./js/base-datos');


class GestorPersonas{
    constructor(){
        this.frmNuevoRegistro = document.getElementById('frmNuevoRegistro'); 
        this.registros = document.getElementById('registros');
        this.nombres = document.getElementById('nombres'); 
        this.apellidos = document.getElementById('apellidos'); 
        this.correos = document.getElementById('correos'); 
        this.btnCrearRegistros = document.getElementById('btnCrearRegistros');

        this.cargarRegistrosPersona(); 
        this.agregarEventListeners();
    }

    agregarEventListeners(){
        this.frmNuevoRegistro.addEventListener('submit', this.crearRegistroPersona.bind(this));
        this.nombres.addEventListener('keyup', this.habilitarBotonCrearRegistro.bind(this));
        this.apellidos.addEventListener('keyup', this.habilitarBotonCrearRegistro.bind(this));
        this.correos.addEventListener('keyup', this.habilitarBotonCrearRegistro.bind(this));
        
    }

    habilitarBotonCrearRegistro(){
        if(this.nombres.value && this.apellidos.value && this.correos.validity.valid){
            this.btnCrearRegistros.disabled = false; 
        }
    }

    // Cuando presionamos sobre el boton crear registro
    crearRegistroPersona(evento){
        evento.preventDefault(); // Evita una peticion por defecto
        console.log(evento); 
        db.agregarPersonas(this.nombres.value, this.apellidos.value, this.correos.value); 

        // Reiniciamos los valores
        this.nombres.value = '';
        this.apellidos.value = '';
        this.correos.value = ''; 

        // Cargamos los registros existentes
        this.cargarRegistrosPersona(); 
    }

    generarHtmlRegistroPersona(persona){
        return `<tr>
            <td>${persona.nombres}</td>
            <td>${persona.apellidos}</td>
            <td>${persona.correo}</td>
            <td><input type="button" value="Eliminar" class="btn btn-danger btn-sm" onclick="gestorPersonas.eliminarRegistroPersona('${persona._id}')"></td>
        </tr>`
    }

    cargarRegistrosPersona(){
        db.obtenerPersonas((personas) => {
            let html = personas.map(this.generarHtmlRegistroPersona).join(''); // Por cada persona una fila
            this.registros.innerHTML = html;
        }); 
    }

    eliminarRegistroPersona(id){
        db.eliminarPersonas(id);

        this.cargarRegistrosPersona();
    }

}

// Cuando se crea la instancia se invoca automaticamente el contructor
let gestorPersonas = new GestorPersonas(); 
