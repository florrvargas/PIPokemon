const { Router } = require('express');
const { getTypes } = require('../controllers/type');

const router = Router();

//route GET types
router.get('/', getTypes)

module.exports = router;