const BaseEntity = require('./BaseEntity');

module.exports = {
    getBaseEntity: () => {
        return new BaseEntity();
    },
    getEntityOne: () => {
        return new (require('./entity1'))();
    },
    getMovieEntity: () => {
        return new (require('./movie'))();
    },
    getUserEntity: () => {
        return new (require('./user'))();
    },
};
