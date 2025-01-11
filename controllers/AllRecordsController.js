import db from "../config/db.js";
import moment from "moment";

export const getAllRecords = async (req, res) =>{
    try {
        // console.log('Running query...');
        const [Records] = await db.query('SELECT * FROM FormData');
        // console.log("Products : " , products);
         // Format date fields
                 Records.REPORTED_DATE = moment(Records.REPORTED_DATE).format('YYYY-MM-DD');
                 Records.INSPECTED_DATE = moment(Records.INSPECTED_DATE).format('YYYY-MM-DD');
        res.render('AllRecords', { Records } );
        // res.json(products);
    } catch (error) {
        console.error('Error retrieving products:', error); // Log the error for debugging
        res.status(500).json({ error: error.message });    }
};

