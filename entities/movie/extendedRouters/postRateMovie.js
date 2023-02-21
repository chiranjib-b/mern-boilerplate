const router = require('express').Router({ mergeParams: true });
const MovieRatingModel = require('_data-access/models/MovieRating');

router.post('/rate', async function (req, res, next) {
    try {
        const { movie, user, rating } = req.body;
        const movieRating = await MovieRatingModel
            .findOneAndUpdate({
                movie, user
            }, {
                $set: {
                    rating
                }
            }, {
                upsert: true,
                new: true
            });
        res.json(movieRating);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
