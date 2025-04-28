const Router = require('../../framework/Router');
const ctrl = require('../controllers/medicationController');
const router = new Router();

router.get('/medications', ctrl.getAll);
router.get('/medications/:id', ctrl.getById);
router.post('/medications', ctrl.create);
router.put('/medications/:id', ctrl.update);
router.patch('/medications/:id', ctrl.patch);
router.delete('/medications/:id', ctrl.remove);

module.exports = router;
