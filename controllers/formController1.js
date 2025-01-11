const formController1 = async (req, res) =>{
    const { id } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM FormData WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Record not found' });
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
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}
export { formController1}