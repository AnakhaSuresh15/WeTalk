import express from 'express';

import { setImageId } from '../controllers/image.controller.js';

const router = express.Router();

router.route('/setImageId/:username').put(setImageId);

export default router;