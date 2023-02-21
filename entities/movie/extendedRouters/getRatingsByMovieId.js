const router = require('express').Router({ mergeParams: true });
const MovieRatingModel = require('_data-access/models/MovieRating');
const { Types: { ObjectId } } = require('mongoose');

router.get('/:movieId/ratings', async function (req, res, next) {
    try {
        const movieRatings = await MovieRatingModel.aggregate([
            {
                $match: { movie: new ObjectId(req.params.movieId) },
            },
            {
                $group: {
                    _id: '$movie',
                    ratings: { $push: '$rating' },
                    averageRating: { $avg: '$rating' },
                },
            },
        ]);
        res.json(movieRatings);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
