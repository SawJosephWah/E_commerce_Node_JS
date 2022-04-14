let express = require('express');
let router = express.Router();
let role = require('../controllers/role');
let schema = require('../utils/schema');
let {validatePermitBody,validateObjectId,valiatePermitAddToRole} = require('../utils/validator')

// Define the home page route
router.post('/', validatePermitBody(schema.permit.permitBody),role.add);  //use permit validator cause field is same 

router.get('/', role.all);

router.route('/:id')
.get(validateObjectId(schema.allSchema.id) , role.get)
.delete(validateObjectId(schema.allSchema.id) , role.drop)
.patch(validateObjectId(schema.allSchema.id),role.update);

router.post('/add/permit',valiatePermitAddToRole(schema.role.permitAddToRole),role.addPermitToRole);
  


module.exports = router;