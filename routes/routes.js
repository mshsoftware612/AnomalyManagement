import express from 'express';
import { formController, getRecordById }  from '../controllers/formController.js';
import { getAllRecords } from '../controllers/AllRecordsController.js';
import { deleteRecord, editRecord, updateRecord } from '../controllers/editUpdateDeleteController.js';
import { accessRecord } from '../controllers/accessController.js';
// import { formController1 } from '../controllers/formController1.js';
const router = express.Router();

router.get('/allrecords', getAllRecords)
router.get('/:id', getRecordById); 

router.get('/edit/:id', editRecord)
router.get('/access/:id', accessRecord )

// router.get('/edit/:id', getRecordById); 
router.post('/update/:id', updateRecord)
router.post('/delete/:id', deleteRecord);



router.route('/')
    .get(formController)
    .post(formController)

export default router;






