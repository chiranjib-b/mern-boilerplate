const Router = require('express').Router;

/**
 * @class
 */
class BaseEntity {
    constructor() {
        this.name = 'BaseEntity';
        this.extensions = [];
    }

    /**
     * The child class is supposed to override this
     * @returns {Object}
     */
    create() {
        throw 'Not Supported';
    }

    /**
     * The child class is supposed to override this
     * @returns {Object | Array.<Object>}
     */
    read() {
        throw 'Not Supported';
    }

    /**
     * The child class is supposed to override this
     * @returns {Object}
     */
    update() {
        throw 'Not Supported';
    }

    /**
     * The child class is supposed to override this
     * @returns {Object}
     */
    delete() {
        throw 'Not Supported';
    }

    /**
     * The child class is supposed to override this
     * @returns {Array.<Router>}
     */
    getExtensions() {
        return this.extensions;
    }
}

module.exports = BaseEntity;
