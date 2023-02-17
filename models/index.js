const Deportista = require('./Deportista')
const Coordinador = require('./Coordinador')
const Asistencia = require('./Asistencia')
const Equipo = require('./Equipo');
const Evento = require('./Evento');

Evento.belongsToMany(Deportista, { through: 'evento_deportista'});
Deportista.belongsToMany(Evento, {through: 'evento_deportista'});
Evento.belongsToMany(Equipo, {through: 'equipo_deportista'});
Equipo.belongsToMany(Evento, {through: 'equipo_deportista'});

module.exports = {
    Deportista,
    Coordinador,
    Asistencia,
    Equipo,
    Evento
}