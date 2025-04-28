const Router = require('../../framework/Router');
const ctrl = require('../controllers/customerController');
const router = new Router();

router.get('/customers', ctrl.getAll);
router.get('/customers/:id', ctrl.getById);
router.post('/customers', ctrl.create);
router.put('/customers/:id', ctrl.update);
router.patch('/customers/:id', ctrl.patch);
router.delete('/customers/:id', ctrl.remove);

module.exports = router;
