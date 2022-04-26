// Archivo principal para la app

// Importamos los modulos de electron

const {app, BrowserWindow, Menu} = require("electron");

// Declaramos la venta principal
let ventanaPrincipal; 

let menuAplicacionPlantilla = [
    {
        label:'Aplicacion',
        submenu: [
            {
                label: 'Acerca de',
                click: () => {
                    abrirVentanaAcercaDe();
                }
            }
        ]
    }
]; // Menu de la aplicacion

function crearVentanaPrincipal(){
    ventanaPrincipal = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    ventanaPrincipal.loadFile('index.html');
    // Cremaos un menu apartir de la plantilla
    let menu = Menu.buildFromTemplate(menuAplicacionPlantilla); 
    ventanaPrincipal.setMenu(menu); 

    ventanaPrincipal.on('closed', () =>{
        ventanaPrincipal = null;
    })


}


function abrirVentanaAcercaDe(){

}


app.whenReady().then(crearVentanaPrincipal);

// Cerrar la app en Linux

app.on('window-all-closed', () =>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () =>{
    if(ventanaPrincipal === null){
        crearVentanaPrincipal();
    }
});