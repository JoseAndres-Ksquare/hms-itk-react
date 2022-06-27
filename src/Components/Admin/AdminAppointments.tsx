import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import {
  listAllAppointments,
  selectAppointments,
  selectStatus,
} from "../slices/appointmentSlice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./navbar.css";

export const AdminAppointments = () => {
  const dispatch = useAppDispatch();
  const reqStatus = useAppSelector(selectStatus);

  useEffect(() => {
    if (reqStatus === "idle") {
      dispatch(listAllAppointments());
    }
  }, [reqStatus, dispatch]);

  const fetchappointments = useAppSelector(selectAppointments);

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

  const allAppointments = fetchappointments.map((appointment) => ({
    id: appointment.id,
    Description: appointment.description,
    Date: appointment.appointment_date,
    Hour: appointment.appointment_hour,
    Status: appointment.status
  }
  ));

  return (
    <>
      <h1 className="Title">All Appointments</h1>
      <hr />
      <br />
      <div className="table-container">
        <div className="appointmentsTable" >
          <DataGrid style={{ height: '371px' }}
            rows={allAppointments}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    </>
  );
};

export default AdminAppointments;
