import db from "../config/db.js"
import upload from "../config/multer.js";

export const formController = async (req, res) => {
    if (req.method === 'GET') {
        // get max id
        try {
            const [result] = await db.query('SELECT MAX(ID) AS MaxId FROM FormData');
            const maxId = result[0]?.MaxId || 0;
            res.render('Form', { maxId });
        } catch (error) {
            console.error("Error fetching maximum ID:", error);
            res.status(500).send("Database connection issue. Please try again later.");
        }

    } else if (req.method === 'POST') {
        // Use the multer upload middleware to handle file uploads
        upload(req, res, async (err) => {
            if (err) {
                console.error("Error uploading files:", err);
                return res.status(500).send("Error uploading files.");
            }

            try {
                const { StatusName, IntegrityName, ProductionName, CustodianName, OperatorName, AreaName, PLName, PlatformName, FieldName,
                    PipelineName, StructureName, IsWellName, AnomalyTypeName, AssessmentName, LocationName, ComPName, ReportedName,
                    InspectedName, DescriptionName, ComponentsName, CommentsName, PreparedName, CheckedName, ApprovedName, EnteredName,
                    EquipmentName, CriticalityName, HyperlinkName } = req.body;


                const uploadedFiles = {};
                if (req.files) {
                    uploadedFiles.Document1Name = req.files.Document1Name?.[0]?.filename || null;
                    uploadedFiles.Document2Name = req.files.Document2Name?.[0]?.filename || null;
                    uploadedFiles.Document3Name = req.files.Document3Name?.[0]?.filename || null;
                    uploadedFiles.Document4Name = req.files.Document4Name?.[0]?.filename || null;
                }

                await db.query(
                    `INSERT INTO FormData (
                            ANOMALY_STATUS, INTEGRITY_THREAT, PRODUCTION_THREAT, CUSTODIAN, OPERATOR, AREA, PL_NO, PLATFORM,
                            FIELD, IS_PIPELINE, IS_STRUCTURE, IS_WELL, ANOMALY_TYPE, ASSESSMENT, LOCATION, COMP_DES, REPORTED_DATE,
                            INSPECTED_DATE, DESCRIPTION, COMPONENTS, COMMENTS, PREPARED_BY, CHECKED_BY, APPROVE_BY, ENTERED_BY,
                            EQUIPMENT_SUPPLIER, CRITICALITY, HYPERLINK, DOCUMENT_1, DOCUMENT_2, DOCUMENT_3, DOCUMENT_4
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                    [
                        StatusName, IntegrityName, ProductionName, CustodianName, OperatorName, AreaName, PLName, PlatformName, FieldName,
                        PipelineName, StructureName, IsWellName, AnomalyTypeName, AssessmentName, LocationName, ComPName, ReportedName,
                        InspectedName, DescriptionName, ComponentsName, CommentsName, PreparedName, CheckedName, ApprovedName, EnteredName,
                        EquipmentName, CriticalityName, HyperlinkName, uploadedFiles.Document1Name, uploadedFiles.Document2Name,
                        uploadedFiles.Document3Name, uploadedFiles.Document4Name
                    ]
                );
                res.redirect('/');  // Redirect to the root/Home page
            } catch (error) {
                console.error("Error saving form data:", error.message);
                res.status(500).send("An error occurred while saving the form data.");
            }

        });
    }
};



// fetch record by ID
export const getRecordById = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM FormData WHERE ID = ?', [id]);
        if (result.length === 0) {
            return res.json({ error: 'Please enter a valid ID' });
        }
        const Records = result[0];
        res.json({
            StatusName: Records.ANOMALY_STATUS,
            IntegrityName: Records.INTEGRITY_THREAT,
            ProductionName: Records.PRODUCTION_THREAT,
            CustodianName: Records.CUSTODIAN,
            OperatorName: Records.OPERATOR,
            AreaName: Records.AREA,
            PLName: Records.PL_NO,
            PlatformName: Records.PLATFORM,
            FieldName: Records.FIELD,
            PipelineName: Records.IS_PIPELINE,
            StructureName: Records.IS_STRUCTURE,
            IsWellName: Records.IS_WELL,
            AnomalyTypeName: Records.ANOMALY_TYPE,
            AssessmentName: Records.ASSESSMENT,
            LocationName: Records.LOCATION,
            ComPName: Records.COMP_DES,
            ReportedName: Records.REPORTED_DATE,
            InspectedName: Records.INSPECTED_DATE,
            DescriptionName: Records.DESCRIPTION,
            ComponentsName: Records.COMPONENTS,
            CommentsName: Records.COMMENTS,
            PreparedName: Records.PREPARED_BY,
            CheckedName: Records.CHECKED_BY,
            ApprovedName: Records.APPROVE_BY,
            EnteredName: Records.ENTERED_BY,
            EquipmentName: Records.EQUIPMENT_SUPPLIER,
            CriticalityName: Records.CRITICALITY,
            HyperlinkName: Records.HYPERLINK,
            Document1Name: `/uploads/${Records.DOCUMENT_1}`,
            Document2Name: `/uploads/${Records.DOCUMENT_2}`,
            Document3Name: `/uploads/${Records.DOCUMENT_3}`,
            Document4Name: `/uploads/${Records.DOCUMENT_4}`,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
