const BaseEntity = require('_entities').getBaseEntity();
const logger = require('_utils/logger');

/**
 * 
 * @param {BaseEntity} entityObject 
 * @returns {[string, Router]}
 */
function getController(entityObject) {
    const router = require('express').Router({ mergeParams: true });
    router.post('/', async (req, res, next) => {
        try {
            const response = await entityObject.create(req.body);
            res.json(response);
        } catch(e) {
            logger.error(e);
            res.status(500).send('Oops! Something went wrong!');
        }
    });
    
    router.get('/', async (req, res, next) => {
        try {
            const response = await entityObject.read();
            res.json(response);
        } catch(e) {
            logger.error(e);
            res.status(500).send('Oops! Something went wrong!');
        }
    });

    router.get('/:entityObjectId', async (req, res, next) => {
        try {
            const response = await entityObject.read(req.params.entityObjectId);
            res.json(response);
        } catch(e) {
            logger.error(e);
            res.status(500).send('Oops! Something went wrong!');
        }
    });
    
    router.put('/:entityObjectId', async (req, res, next) => {
        try {
            const response = await entityObject.update(req.params.entityObjectId, req.body);
            res.json(response);
        } catch(e) {
            logger.error(e);
            res.status(500).send('Oops! Something went wrong!');
        }
    });
    
    router.delete('/:entityObjectId', async (req, res, next) => {
        try {
            const response = await entityObject.delete(req.params.entityObjectId);
            res.json(response);
        } catch(e) {
            logger.error(e);
            res.status(500).send('Oops! Something went wrong!');
        }
    });

    entityObject.getExtensions().forEach(function (extension) {
        router.use('/', extension);
    });

    return [`/${entityObject.name}`, router];
}

module.exports = {
    getController
};
