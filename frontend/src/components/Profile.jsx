import React, { useEffect, useState } from "react";
import axios from "../services/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="p-6 pt-20 w-full h-[100vh] text-center flex flex-col align-center">
      <h1 className="text-2xl mb-4">Profile</h1>
      <div className="relative self-center mt-10 overflow-hidden w-60 h-80 rounded-3xl cursor-pointer text-2xl font-bold bg-slate-400">
        <div className="z-10 absolute w-full h-full peer"></div>
        <div className="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-32 h-44 rounded-full bg-slate-600 transition-all duration-500"></div>
        <div className="absolute flex text-sm text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full -bottom-32 -right-16 w-36 h-44 rounded-full bg-slate-600 transition-all duration-500">
          Nice to meet u,
          <br />
          Email: {profile.email}
          <br />
          Role: {profile.role}
        </div>
        <div className="w-full h-full items-center justify-center flex uppercase">
          Hi, I'm {profile.name}
        </div>
      </div>
    </div>
  );
};

export default Profile;
