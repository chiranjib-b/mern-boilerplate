const { Schema } = require('mongoose');
const { Types } = Schema;
const { getDBConnection } = require('_data-access/ConnectionFactory');

const UserSchema = new Schema(
    {
        email: { type: Types.String, required: true, unique: true },
        firstName: { type: Types.String },
        lastName: { type: Types.String },
    },
    {
        timestamps: true,
    }
);

UserSchema.index({ firstName: 1 }); // enable searching user by first name

module.exports = getDBConnection().model('user', UserSchema, null, {});
