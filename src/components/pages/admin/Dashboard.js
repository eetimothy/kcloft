import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

export default function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUserName();
  }, [user, loading]);

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  return (
    <div className="dashboard">

      <div className="dashboard_menu">
        <h2>Dashboard</h2>

        <div className="dashboard_sub_menu">
          <h5><Link to='/projects'>View/ Edit Projects</Link></h5>
          <h5><Link to='/add_project'>+ Add Project</Link></h5>
          <br />
          <h5><Link to="/accessories">View/ Edit Accessories</Link></h5>
          <h5><Link to='/add_accessory'>+ Add Accessories</Link></h5>

        </div>
      </div>

      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}