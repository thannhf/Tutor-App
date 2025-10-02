import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "./AppContext";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const { backendUrl } = useContext(AppContext);
  const [atoken, setAtoken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );
  const [tutors, setTutors] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [dashData, setDashData] = useState(false);

  const getAllTutors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-tutors",
        {},
        { headers: { atoken } }
      );
      if (data.success) {
        setTutors(data.tutors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const changeAvailability = async (tutId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { tutId },
        { headers: { atoken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllTutors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getAllSessions = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/sessions", {
        headers: { atoken },
      });

      if (data.success) {
        setSessions(data.sessions);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelSession = async (sessionId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-session",
        { sessionId },
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllSessions();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { atoken },
      });

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    atoken,
    setAtoken,
    getAllTutors,
    tutors,
    changeAvailability,
    getAllSessions,
    sessions,
    setSessions,
    cancelSession,
    getDashData,
    dashData
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
