import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import {
  cancelAppointment,
  getInfoAppointment,
  listAllAppointments,
  listDoctorAppointments,
  listPatientAppointments,
  selectAppointments,
  selectStatus,
} from "../slices/appointmentSlice";
import "./navbar.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const DoctorAppointments = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const reqStatus = useAppSelector(selectStatus);

  useEffect(() => {
    if (reqStatus === "idle") {
      dispatch(listDoctorAppointments());
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
      field: "description",
      headerName: "Description",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100
    },
    {
      field: "appointment_date",
      headerName: "Appointment Date",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100
    },
    {
      field: "appointment_hour",
      headerName: "Appointment Hour",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100
    },
    {
      field: "status",
      headerName: "Appointment Status",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100
    },
    {
      field: "Update",
      headerName: "Update Appointment",
      flex: 1,
      editable: false,
      sortable: true,
      minWidth: 100,
      renderCell: (val) => {
        return (<button onClick={(e: any) => {
          e = (val.row);
          dispatch(getInfoAppointment(e))
          navigate("/doctors/updateForm")
        }}>
          Update
        </button>)
      }
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
            dispatch(listDoctorAppointments())
            dispatch(listDoctorAppointments())



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
    description: appointment.description,
    appointment_date: appointment.appointment_date,
    appointment_hour: appointment.appointment_hour,
    status: appointment.status
  }
  ));

  return (
    <>
      <h1 className="Title">DoctorAppointments</h1>
      <hr />
      <br />
      <div className="table-container">

        <div className="appointmentsTable" >
          <DataGrid sx={{ height: '371px' }}
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

export default DoctorAppointments;

