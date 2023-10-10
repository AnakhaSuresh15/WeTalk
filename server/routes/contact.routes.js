import express from 'express';

import { addContacts, getContacts } from '../controllers/contact.controller.js';

const router = express.Router();

router.route('/addcontact').post(addContacts);
router.route('/contacts/:username').get(getContacts);

export default router;