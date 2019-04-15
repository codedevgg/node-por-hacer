const descripcion = {

    demand: true,
    alias: 'd',
    desc: 'Descricion de la tarea por hacer'

};

const completado = {

    default: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'

};

const argv = require('yargs')
    .command('crear', 'Crear una tarea', {
        descripcion
    })
    .command('actualizar', 'actualizar el estado de las tareas', {
        descripcion,
        completado
    })
    .command('borrar', 'borrar una tarea', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}