import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";
import newRequest from "../../utils/newRequest";
// import { Cloudinary } from "@cloudinary/url-gen";
import Dropzone from "react-dropzone";
import { produce } from "immer";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const AdminPage = () => {
  const [formData, setFormData] = useState({
    name: null,
    gender: null,
    pid: null,
    mid: null,
    fid: null,
    img: null,
    birthDate: null,
    nickName: null,
    familyId: null,
    deathDate: null,
    anniversaryDate: null,
    address: null,
    mobileNo: null,
    whatsappNumber: null,
    achievements: null,
    profession: null,
  });

  

  // const [setEditingMemberId] = useState(null);
  // const [editingMember, setEditingMember] = useState({});

  const handleEditMember = (member) => {
    navigate("/update-family-member", { state: { member } });
  };

  // const handleSaveEdit = async () => {
  //   try {
  //     await newRequest.put(`/family/update/${editingMember.id}`, editingMember);
  //     setEditingMemberId(null);
  //     setEditingMember({});
  //     // Fetch the updated family members list
  //     const response = await newRequest.get("/family/all");
  //     setFamilyMembers(response.data);
  //   } catch (error) {
  //     console.error("Error updating family member:", error);
  //   }
  // };

  const [familyMembers, setFamilyMembers] = useState([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchFamilyMembers = async () => {
    try {
      const response = await newRequest.get("/family/all");
      setFamilyMembers(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching family members:", error);
    }
  };
    
  useEffect(() => {
    

    fetchFamilyMembers();
  }, []);

  // const cld = new Cloudinary({
  //   cloud: {
  //     cloudName: "dxi46aisk",
  //     api_key: "849818193456615",
  //     api_secret: "_MhjYtTCISWb7KnDNlw-JwssSZc",
  //   },
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = async (files) => {
    const uploadedFile = files[0];
    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("upload_preset", "familytreeimage");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxi46aisk/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setFormData((prevState) =>
        produce(prevState, (draftState) => {
          draftState.img = data.secure_url;
        })
      );
      console.log("FormData", formData);

      toast.success("Image uploaded successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload image", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await newRequest.post("/family/add", formData);
      console.log(response.data);

      toast.success("New user created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setFormData({
        name: null,
        gender: null,
        pid: null,
        mid: null,
        fid: null,
        img: null,
        birthDate: null,
        nickName: null,
        familyId: null,
        deathDate: null,
        anniversaryDate: null,
        address: null,
        mobileNo: null,
        whatsappNumber: null,
        achievements: null,
        profession: null,
      });

      const fetchFamilyMembers = async () => {
        try {
          const response = await newRequest.get("/family/all");
          setFamilyMembers(response.data);
        } catch (error) {
          console.error("Error fetching family members:", error);
        }
      };

      fetchFamilyMembers();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create new user", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleShowTree = () => {
    navigate("/familytree");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const handleHome = () => {
    navigate("/homepage");
  };

  const handleDeleteMember = async (memberId) => {
    try {
      const response = await newRequest.delete(`/family/delete/${memberId}`);
      console.log(response.data);

      toast.success("Member deleted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // Refetch family members after deletion
      fetchFamilyMembers();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete member", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="admin-page">
      <div className="top-right-buttons">
        <button onClick={handleShowTree}>Show Tree</button>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleHome}>Home</button>
      </div>
      <h1>Admin Page</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="pid">Partner ID:</label>
          <input
            type="number"
            id="pid"
            name="pid"
            value={formData.pid || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mid">Mother ID:</label>
          <input
            type="number"
            id="mid"
            name="mid"
            value={formData.mid || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fid">Father ID:</label>
          <input
            type="number"
            id="fid"
            name="fid"
            value={formData.fid || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Birth Date:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nickName">Nickname:</label>
          <input
            type="text"
            id="nickName"
            name="nickName"
            value={formData.nickName || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="familyId">Family ID:</label>
          <input
            type="text"
            id="familyId"
            name="familyId"
            value={formData.familyId || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deathDate">Death Date:</label>
          <input
            type="date"
            id="deathDate"
            name="deathDate"
            value={formData.deathDate || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="anniversaryDate">Anniversary Date:</label>
          <input
            type="date"
            id="anniversaryDate"
            name="anniversaryDate"
            value={formData.anniversaryDate || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNo">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNo"
            name="mobileNo"
            value={formData.mobileNo || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
    <label htmlFor="whatsappNumber">Whatsapp Number:</label>
    <input
      type="text"
      id="whatsappNumber"
      name="whatsappNumber"
      value={formData.whatsappNumber || ""}
      onChange={handleChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="achievements">Achievements:</label>
    <input
      type="text"
      id="achievements"
      name="achievements"
      value={formData.achievements || ""}
      onChange={handleChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="profession">Profession:</label>
    <input
      type="text"
      id="profession"
      name="profession"
      value={formData.profession || ""}
      onChange={handleChange}
    />
  </div>
        <div className="form-group">
          <label htmlFor="img">Image:</label>
          <Dropzone onDrop={handleImageUpload}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {formData.img ? (
                  <img src={formData.img} alt="Uploaded" width="200" />
                ) : (
                  <p>Drag and drop an image here, or click to select a file</p>
                )}
              </div>
            )}
          </Dropzone>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Family Members</h2>
        <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Nickname</th>
              <th>Family ID</th>
              <th>Gender</th>
              <th>Mother ID</th>
              <th>Father ID</th>
              <th>Partner IDs</th>
              <th>Birth Date</th>
              <th>Death Date</th>
              <th>Anniversary Date</th>
              <th>Address</th>
              <th>Mobile Number</th>
              <th>Whatsapp Number</th>
              <th>Achievements</th>
              <th>Profession</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {familyMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.nickName}</td>
                <td>{member.familyId}</td>
                <td>{member.gender}</td>
                <td>{member.mid}</td>
                <td>{member.fid}</td>
                <td>{member.pids.join(", ")}</td>
                <td>{member.birthDate}</td>
                <td>{member.deathDate}</td>
                <td>{member.anniversaryDate}</td>
                <td>{member.address}</td>
                <td>{member.mobileNo}</td>
                <td>{member.whatsappNumber}</td>
                <td>{member.achievements}</td>
                <td>{member.profession}</td>
                <td>
                  {member.img && (
                    <img src={member.img} alt="Member" width="50" height="50" />
                  )}
                </td>
                <td>
                  <button onClick={() => handleEditMember(member)}>Edit</button>
                  <button onClick={() => handleDeleteMember(member.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default AdminPage;
