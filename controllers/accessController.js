import db from "../config/db.js";

const accessRecord = async (req, res) => {
    const { id } = req.params;
    try {
        const [Records] = await db.query('SELECT * FROM FormData WHERE ID = ?', [id]);
        if (Records.length === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }
         
        res.render('access', { Records: Records[0], uploadedDocuments: {
            doc1: Records[0].DOCUMENT_1,
            doc2: Records[0].DOCUMENT_2,
            doc3: Records[0].DOCUMENT_3,
            doc4: Records[0].DOCUMENT_4
        } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {accessRecord}