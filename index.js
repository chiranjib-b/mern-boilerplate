const logger = require('_utils/logger');

function connectToDB() {
    const { getDBConnection } = require('_data-access/ConnectionFactory');
    return new Promise((resolve, reject) => {
        getDBConnection()
        .then(connection => {
            let counter = 1;
            const timer = setInterval(function () {
                logger.info(`[${counter}] Checking connection..`);
                if (connection.readyState === 1) {
                    clearInterval(timer);
                    resolve();
                } else if (counter === 5) {
                    clearInterval(timer);
                    reject('Could not connect to database after 5 retries');
                }
                counter++;
            }, 1000);
        })
        .catch(e => {
            logger.error(e)
            reject('Could not connect to database')
        });
    });
}

function setupApp() {
    const {
        SERVER: { PORT, REQUEST_BODY_SIZE_LIMIT },
    } = require('_config');
    const { getController } = require('_controllers');
    const helmet = require('helmet');
    const express = require('express');
    const entities = require('_entities');
    const app = express();

    app.use((req, res, next) => {
        logger.log('info', `Received request [${req.method}] ${req.originalUrl}`);
        next();
    });

    app.use(helmet());
    app.use(express.json({ limit: REQUEST_BODY_SIZE_LIMIT }));
    app.use(express.urlencoded({ extended: true, limit: REQUEST_BODY_SIZE_LIMIT }));

    app.get('/healthcheck', (req, res) => {
        res.send('OK');
    });

    app.use(...getController(entities.getEntityOne()));
    app.use(...getController(entities.getMovieEntity()));
    app.use(...getController(entities.getUserEntity()));

    app.use('/', (req, res) => {
        res.send(`${req.originalUrl} can not be served`);
    });

    app.listen(PORT, () => {
        logger.log('info', `Listening on port ${PORT}`);
    });
}

connectToDB()
    .then(function () {
        logger.info('Connected to database, starting app now...');
        setupApp();
    })
    .catch(function (e) {
        logger.error('Failed to connect to database.', e);
    });
