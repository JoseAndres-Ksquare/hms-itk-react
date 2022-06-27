import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { allDoctors, selectDoctor, selectStatusDoctor } from "../slices/doctorSlice";




const AllDoctors = () => {

    const dispatch = useAppDispatch();
    const reqStatus = useAppSelector(selectStatusDoctor);

    useEffect(() => {
        if (reqStatus === "idle") {
            dispatch(allDoctors());
        }
    }, [reqStatus, dispatch]);

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "Appointment ID",
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
            field: "medical_speciality",
            headerName: "Medical Speciality",
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


    const fetchdoctorInfo = useAppSelector(selectDoctor);
    const doctorInfo = fetchdoctorInfo.map((doctor) => ({
        id: doctor.id,
        first_name: doctor.Profile.first_name,
        last_name: doctor.Profile.last_name,
        medical_speciality: doctor.medical_speciality,
        phone_number: doctor.Profile.phone_number


    }))

    return (
        <>
            <h1 className="Title">Doctors Information</h1>
            <hr />
            <br />
            <div className="table-container">

                <div className="appointmentsTable" >
                    <DataGrid style={{ height: '371px' }}
                        rows={doctorInfo}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </div>
        </>

    );
};

export default AllDoctors