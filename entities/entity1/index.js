const BaseEntity = require('_entities/BaseEntity');

module.exports = class EntityOne extends BaseEntity {
    constructor() {
        super();
        this.name = 'EntityOne';
        this.records = [
            { 'id': 1, 'key1': 'value1' },
            { 'id': 2, 'key2': 'value2' }
        ];
    }

    create(payload) {
        const lastObject = this.records[this.records.length - 1];
        this.records.push({ id: (lastObject?.id ?? 0) + 1, ...payload });
    }

    // read(id) {
    //     if (id) {
    //         return this.records.find(record => record.id === parseInt(id));
    //     } else {
    //         return this.records;
    //     }
    // }

    update(id, payload) {
        const record = this.records.find(record => record.id === parseInt(id));
        if (record) {
            const { _id, ...otherAttributes } = record;
            Object.assign(record, { ...otherAttributes, ...payload });
        }
    }

    delete(id) {
        const recordIndex = this.records.findIndex(record => record.id === parseInt(id));
        if (recordIndex) {
            this.records.splice(recordIndex, 1);
        }
    }
};
