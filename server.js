const Framework = require('./framework/Application.js');
const bodyParser = require('./src/middlewares/bodyParser');
const customerRoutes = require('./src/routes/customers');
const medicationRoutes = require('./src/routes/medications');

const server = new Framework();
server.use(bodyParser);

server.addRouter(require('./src/routes/customers'));
server.addRouter(require('./src/routes/medications'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
