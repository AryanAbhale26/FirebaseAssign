import React from "react";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../Firebase";
import Navbar from "../Components/Navbar";
import Dashboard from "../Components/Dashboard";
const db = getDatabase(app); //It gives us instance

function Home() {
  // const putData = () => {
  //   set(ref(db, "users/Aryan"), {
  //     id: 1,
  //     name: "veer",
  //     age: 20,
  //   });
  // };
  return (
    <div className="">
      {/* <button onClick={putData}>Put Data</button> */}
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default Home;
