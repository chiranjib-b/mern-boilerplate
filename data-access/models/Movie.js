const { Schema } = require('mongoose');
const { Types } = Schema;
const { getDBConnection } = require('_data-access/ConnectionFactory');

const Movie = new Schema(
    {
        name: { type: Types.String, required: true, unique: true },
        imdbLink: { type: Types.String, required: true, unique: true },
        rottenTomatoesLink: { type: Types.String, required: true, unique: true },
    },
    {
        timestamps: true,
    }
);

Movie.index({ name: 1 }); // enable searching a movie by name

module.exports = getDBConnection().model('movie', Movie, null, {});
