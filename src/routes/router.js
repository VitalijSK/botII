import express from 'express'
import {main} from '../controllers/MainRoutController'

export const router = express.Router();


router.use('/public', express.static('public'));
router.get('/', main.home);
router.get('/message', main.message);