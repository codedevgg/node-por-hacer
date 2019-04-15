const fs = require('fs');
const colors = require('colors');

let listadoPorhacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorhacer);
    fs.writeFile(`db/data.json`, data, (err) => {
        if (err)
            throw new Error('No se pudo grabar', err);
    });

}

const cargarDB = () => {
    try {

        listadoPorhacer = require('../db/data.json');
    } catch (error) {
        listadoPorhacer = [];
    }

}

const getListado = () => {
    cargarDB();
    return listadoPorhacer;

}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorhacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })
    if (index >= 0) {
        listadoPorhacer[index].completado = completado;
        guardarDB();
        return "Actualización realizada exitosamente".green;
    } else {
        return "Actualización No se pudo realizada".red;
    }

}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }


    listadoPorhacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorhacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });
    if (listadoPorhacer.length === nuevoListado.length) {
        return "El borrado fallo".red;
    } else {
        listadoPorhacer = nuevoListado;
        guardarDB();
        return "El borrado fue exitoso".green;
    }



}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}