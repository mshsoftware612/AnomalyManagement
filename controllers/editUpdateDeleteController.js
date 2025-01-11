import db from "../config/db.js";

//edit  records
export const editRecord = async (req, res) => {
    const { id } = req.params;
    try {
        const [Records] = await db.query('SELECT * FROM FormData WHERE ID = ?', [id]);
        if (Records.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
         
        res.render('editForm', { Records: Records[0], uploadedDocuments: {
            doc1: Records[0].DOCUMENT_1,
            doc2: Records[0].DOCUMENT_2,
            doc3: Records[0].DOCUMENT_3,
            doc4: Records[0].DOCUMENT_4
        } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Update Record
export const updateRecord = async (req, res) => {
    const { id } = req.params;
    // console.log(id);

    const { StatusName, IntegrityName, ProductionName, CustodianName, OperatorName, AreaName, PLName, PlatformName, FieldName,
        PipelineName, StructureName, IsWellName, AnomalyTypeName, AssessmentName, LocationName, ComPName, ReportedName,
        InspectedName, DescriptionName, ComponentsName, CommentsName, PreparedName, CheckedName, ApprovedName, EnteredName,
        EquipmentName, CriticalityName, HyperlinkName } = req.body;

    try {
        await db.query('UPDATE FormData SET ANOMALY_STATUS = ?, INTEGRITY_THREAT = ?, PRODUCTION_THREAT = ?, CUSTODIAN = ?, OPERATOR = ?, AREA = ?, PL_NO = ?, PLATFORM = ?, FIELD = ?, IS_PIPELINE = ?, IS_STRUCTURE = ?, IS_WELL = ?, ANOMALY_TYPE = ?, ASSESSMENT = ?, LOCATION = ?, COMP_DES = ?, REPORTED_DATE = ?, INSPECTED_DATE = ?, DESCRIPTION = ?, COMPONENTS = ?, COMMENTS = ?, PREPARED_BY = ?, CHECKED_BY = ?, APPROVE_BY = ?, ENTERED_BY = ?, EQUIPMENT_SUPPLIER = ?, CRITICALITY = ?, HYPERLINK = ? WHERE ID = ?',
            [StatusName, IntegrityName, ProductionName, CustodianName, OperatorName, AreaName, PLName, PlatformName, FieldName,
                PipelineName, StructureName, IsWellName, AnomalyTypeName, AssessmentName, LocationName, ComPName, ReportedName,
                InspectedName, DescriptionName, ComponentsName, CommentsName, PreparedName, CheckedName, ApprovedName, EnteredName,
                EquipmentName, CriticalityName, HyperlinkName, id]);
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


export const deleteRecord = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM FormData WHERE ID = ?', [id]);

        if (result.affectedRows === 0) {
            console.log(`No record found with ID: ${id}`);
            return res.status(404).json({ message: "Record not found" });
        }

        console.log(`Record with ID: ${id} successfully deleted`);
        res.redirect('/allrecords');
    } catch (error) {
        console.log("Error during deletion:", error);
        res.status(500).json({ error: error.message });
    }
};

// export const deleteRecord = async (req, res) => {
//     const { id } = req.params;
//     const connection = db.promise(); // Ensure you are using a promise-based connection for sequential queries

//     try {
//         // Begin a transaction to ensure atomicity
//         await connection.beginTransaction();

//         // Delete the record with the given ID
//         await connection.query('DELETE FROM FormData WHERE ID = ?', [id]);

//         // Adjust IDs of subsequent rows
//         await connection.query('UPDATE FormData SET ID = ID - 1 WHERE ID > ?', [id]);

//         // Reset the auto-increment value to match the new highest ID (MySQL-specific)
//         const [rows] = await connection.query('SELECT MAX(ID) AS maxID FROM FormData');
//         const maxID = rows[0].maxID || 0; // Handle case when table is empty
//         await connection.query('ALTER TABLE FormData AUTO_INCREMENT = ?', [maxID + 1]);

//         // Commit the transaction
//         await connection.commit();

//         // Redirect after successful deletion
//         res.redirect('/allrecords');
//     } catch (error) {
//         // Rollback in case of error
//         await connection.rollback();
//         console.error("Error:", error);
//         res.status(500).json({ error: error.message });
//     }
// };


// SET @id= 0;
// UPDATE FormData
// SET id = (@id:= @id + 1)
// ORDER BY id;