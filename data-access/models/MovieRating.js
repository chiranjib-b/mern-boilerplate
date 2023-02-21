const { Schema } = require('mongoose');
const { Types } = Schema;
const { getDBConnection } = require('_data-access/ConnectionFactory');

const MovieRating = new Schema(
    {
        movie: { type: Types.ObjectId, ref: require('./Movie'), required: true },
        user: { type: Types.ObjectId, ref: require('./User'), required: true },
        rating: { type: Types.Number, enum: [1, 2, 3, 4, 5] },
    },
    {
        timestamps: true,
    }
);

MovieRating.index({ movie: 1, user: 1 }); // enable searching a movie-rating by movie first, and then by specific user if required
MovieRating.index({ user: 1, movie: 1 }); // enable searching movie-ratings by users first, and then by specific movie if required

module.exports = getDBConnection().model('movierating', MovieRating, null, {});
