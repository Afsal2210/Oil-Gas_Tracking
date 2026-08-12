const cds = require('@sap/cds')
const cors = require('cors')

cds.on('bootstrap', app => app.use(cors({ exposedHeaders: ['OData-Version', 'ETag'] })))

module.exports = cds.server
