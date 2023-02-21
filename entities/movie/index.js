const BaseEntity = require('_entities/BaseEntity');

module.exports = class MovieEntity extends BaseEntity {
    constructor() {
        super();
        this.name = 'Movie';
        this.model = require('_data-access/models/Movie');
    }

    async create(payload) {
        return await this.model.create(payload);
    }

    async read(id) {
        if (id) {
            return await this.model.findById(id).lean();
        } else {
            return await this.model.find().lean();
        }
    }

    async update(id, payload) {
        return await this.model.findByIdAndUpdate(id, payload, { new: true });
    }

    async delete(id) {
        return await this.model.deleteOne({ _id: id });
    }

    getExtensions() {
        return [require('./extendedRouters/getRatingsByMovieId'), require('./extendedRouters/postRateMovie')];
    }
};
