import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import newRequest from "../../utils/newRequest";
// import { Cloudinary } from "@cloudinary/url-gen";
import Dropzone from "react-dropzone";
import { produce } from "immer";
import { toast } from "react-toastify";
import "./UpdateFamilyMember.css"

const UpdateFamilyMember = () => {
  const location = useLocation();
  const { member } = location.state;

  const [formData, setFormData] = useState({
    name: member.name,
    gender: member.gender,
    pid: member.pids[0],
    mid: member.mid,
    fid: member.fid,
    img: member.img,
    birthDate: member.birthDate,
    nickName: member.nickName,
    familyId: member.familyId,
    deathDate: member.deathDate,
    anniversaryDate: member.anniversaryDate,
    address: member.address,
    mobileNo: member.mobileNo,
    whatsappNumber: member.whatsappNumber,
    profession: member.profession,
    achievements: member.achievements,
  });

  const navigate = useNavigate();

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
        console.log(member);
      const response = await newRequest.post(`/family/update/${member.id}`, formData);
      console.log(response.data);

      toast.success("User updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      navigate("/admin");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user", {
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
    <div className="update-family-member">
    {console.log(member)}
      <h1>Update Family Member</h1>
      <form onSubmit={handleSubmit} className="update-form">
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
            type="text"
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
          <label htmlFor="img">Image:</label>
          <Dropzone onDrop={handleImageUpload} accept="image/*">
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                {formData.img ? (
                  <img src={formData.img} alt="Uploaded" />
                ) : (
                  <p>Drag 'n' drop an image here, or click to select one</p>
                )}
              </div>
            )}
          </Dropzone>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateFamilyMember;
