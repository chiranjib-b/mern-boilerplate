const BaseEntity = require('_entities/BaseEntity');

module.exports = class UserEntity extends BaseEntity {
    constructor() {
        super();
        this.name = 'User';
        this.model = require('_data-access/models/User');
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
        return [require('./extendedRouters/getRatingsByUserId')];
    }
};
