const {remote} = require('electron'); 

// Permitir que el usuario presionando f12 muestre las herraminetas de desarrollador

document.addEventListener('keydown', (e) =>{
    if(e.which === 123){
        remote.getCurrentWindow().webContents.openDevTools();
    }
})