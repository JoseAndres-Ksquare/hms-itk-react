import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import {
  cancelAppointment,
  listPatientAppointments,
  selectAppointments,
  selectStatus,
} from "../slices/appointmentSlice";
import "./navbar.css";

export const PatientAppointments = () => {
  const dispatch = useAppDispatch();
  const reqStatus = useAppSelector(selectStatus);

  useEffect(() => {
    if (reqStatus === "idle" || reqStatus === "failed") {
      dispatch(listPatientAppointments());
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
      field: "Description",
      headerName: "Description",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100
    },
    {
      field: "Date",
      headerName: "Appointment Date",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100
    },
    {
      field: "Hour",
      headerName: "Appointment Hour",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100
    },
    {
      field: "Status",
      headerName: "Appointment Status",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100
    },
    {
      field: "Cancel",
      headerName: "Cancel Appointment",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
      renderCell: (val) => {
        return (<button
          onClick={(e: any) => {
            e = Number(val.row.id)
            dispatch(cancelAppointment(e))
            dispatch(listPatientAppointments())
            dispatch(listPatientAppointments())
          }}
        >
          Cancel
        </button>)
      }
    },
  ]



  const fetchappointments = useAppSelector(selectAppointments);
  const allAppointments = fetchappointments.map((appointment) => ({
    id: appointment.id,
    Description: appointment.description,
    Date: appointment.appointment_date,
    Hour: appointment.appointment_hour,
    Status: appointment.status
  }
  ));


  return (
    <div>
      <h1 className="Title">Patient Appointments</h1>
      <hr />
      <br />
      <div className="table-container">
        <div className="appointmentsTable">

          <DataGrid style={{ height: '371px' }}
            rows={allAppointments}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientAppointments;
