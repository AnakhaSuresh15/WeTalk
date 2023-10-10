import express from 'express';

import { addUser, getUser, getUserValidation } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/adduser').post(addUser);
router.route('/userdata').get(getUser);
router.route('/getuservalidation').post(getUserValidation);

export default router;