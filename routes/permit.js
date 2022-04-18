let express = require('express');
let router = express.Router();
let permit = require('../controllers/permit');
let schema = require('../utils/schema');
let {validatePermitBody,validateObjectId ,validateToken} = require('../utils/validator')

// Define the home page route
router.post('/',validateToken ,validatePermitBody(schema.permit.permitBody),permit.add);

router.get('/', permit.all);

router.route('/:id')
.get(validateObjectId(schema.allSchema.id) , permit.get)
.delete(validateObjectId(schema.allSchema.id) , permit.drop)
.patch(validateObjectId(schema.allSchema.id),permit.update);
  


module.exports = router;