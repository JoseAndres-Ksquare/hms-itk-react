import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { allPatients, selectPatient, selectStatusPatient } from "../slices/patientSlice";



const AllPatients = () => {

    const dispatch = useAppDispatch();
    const reqStatus = useAppSelector(selectStatusPatient);

    useEffect(() => {
        if (reqStatus === "idle") {
            dispatch(allPatients());
        }
    }, [reqStatus, dispatch]);

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "Patient Id",
            flex: 1,
            editable: false,
            sortable: true,
            minWidth: 100
        },
        {
            field: "first_name",
            headerName: "First Name",
            flex: 1,
            editable: false,
            sortable: true,
            minWidth: 100
        },
        {
            field: "last_name",
            headerName: "Last Name",
            flex: 1,
            editable: false,
            sortable: true,
            minWidth: 100
        },
        {
            field: "birth_date",
            headerName: "Birth Date",
            flex: 1,
            editable: false,
            sortable: true,
            minWidth: 100
        },
        {
            field: "phone_number",
            headerName: "Phone Number",
            flex: 1,
            editable: false,
            sortable: true,
            minWidth: 100
        },

    ]

    const fetchpatientInfo = useAppSelector(selectPatient);
    const patientInfo = fetchpatientInfo.map((patient) => ({
        id: patient.id,
        first_name: patient.Profile.first_name,
        last_name: patient.Profile.last_name,
        birth_date: patient.birth_date,
        phone_number: patient.Profile.phone_number

    }))

    return (
        <>
            <h1 className="Title">Patients Information</h1>
            <hr />
            <br />
            <div className="table-container">

                <div className="appointmentsTable" >
                    <DataGrid style={{ height: '371px' }}
                        rows={patientInfo}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </div>
        </>

    );
};

export default AllPatients