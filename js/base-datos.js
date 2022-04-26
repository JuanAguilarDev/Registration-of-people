var DataStore = require('nedb');  // Importamos la base de datos 

let db = new DataStore({filename: 'db/personas.db', autoload: true});

exports.agregarPersonas = function(nombres, apellidos, correo){
    var persona = {
        nombres: nombres,
        apellidos: apellidos,
        correo: correo
    };

    db.insert(persona, function(err, nuevoObjeto){
    
    }); 
};

exports.obtenerPersonas = function(operacion){
    db.find({}, function(err, personas){
        if(personas){
            operacion(personas);
        }
    });
}; 


exports.eliminarPersonas = function(id){
    db.remove({_id: id}, {}, function(err, numeroRegistrosEliminados){

    });
};


