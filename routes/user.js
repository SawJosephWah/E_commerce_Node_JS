
let express = require('express');
let router = express.Router();
let user = require('../controllers/user');
let schema = require('../utils/schema');
let {validateObjectId,validateUserRegister,validateUserLogin,validateToken,validateRoleAddToUser,validateRole,validatePermitAddToUser} = require('../utils/validator')

// Define the home page route
router.post('/register',validateUserRegister(schema.user.userRegister),user.register);
router.post('/login',validateUserLogin(schema.user.userLogin),user.login);

router.post('/add/role',validateToken,validateRole("Owner"),validateRoleAddToUser(schema.user.roleAddToUser),user.add_role_to_user);
router.post('/remove/role',validateToken,validateRole("Owner"),validateRoleAddToUser(schema.user.roleAddToUser),user.remove_role_from_user);//use same validate for both add and remove bcus request body is the same

router.post('/add/permit',validateToken,validateRole("Owner"),validatePermitAddToUser(schema.user.permitAddToUser),user.add_permit_to_user);

router.post('/remove/permit',validateToken,validateRole("Owner"),validatePermitAddToUser(schema.user.permitAddToUser),user.remove_permit_from_user);
//use same validate for both add and remove bcus request body is the same

// router.get('/', permit.all);

// router.route('/:id')
// .get(validateObjectId(schema.allSchema.id) , permit.get)
// .delete(validateObjectId(schema.allSchema.id) , permit.drop)
// .patch(validateObjectId(schema.allSchema.id),permit.update);
  


module.exports = router;