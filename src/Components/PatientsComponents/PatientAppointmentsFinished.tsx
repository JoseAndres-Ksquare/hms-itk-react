import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import {
  listPatientAppointmentsFinished,
  selectAppointments,
  selectStatus,
} from "../slices/appointmentSlice";
import "./navbar.css";

export const PatientAppointmentsFinished = () => {
  const dispatch = useAppDispatch();
  const reqStatus = useAppSelector(selectStatus);

  useEffect(() => {
    if (reqStatus === "idle" || reqStatus === "failed") {
      dispatch(listPatientAppointmentsFinished());
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
      <h1 className="Title">Appointments History</h1>
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

export default PatientAppointmentsFinished;
