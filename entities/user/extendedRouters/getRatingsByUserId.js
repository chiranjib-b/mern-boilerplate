const router = require('express').Router({ mergeParams: true });
const MovieRatingModel = require('_data-access/models/MovieRating');
const MovieModel = require('_data-access/models/Movie');
const {
    Types: { ObjectId },
} = require('mongoose');

router.get('/:userId/ratings', async function (req, res, next) {
    try {
        const movieRatingsByUser = await MovieRatingModel.aggregate([
            { $match: { user: new ObjectId(req.params.userId) } },
            {
                $group: {
                    _id: '$user',
                    records: {
                        $push: {
                            movie: '$movie',
                            rating: '$rating',
                        },
                    },
                },
            },
        ]);
        await MovieModel.populate(movieRatingsByUser, { path: 'records.movie', select: 'name' });
        res.json(movieRatingsByUser);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
