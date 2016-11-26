import { Router } from 'express';
import * as LensController from '../controllers/lens.controller';
const router = new Router();

// Get all Lenss
router.route('/lens').get(LensController.getLens);


export default router;
