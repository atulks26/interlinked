import React, { useState } from "react";
// import "../styles/register.css";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        departmentName: "",
        departmentType: "",
        registrationNumber: "",
        address: "",
        contactPerson: "",
        contactPosition: "",
        email: "",
        phoneNumber: "",
        authorizationDoc: null,
        taxProof: null,
        username: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit logic goes here, such as sending formData to the backend API
        console.log("Registration submitted:", formData);
    };

    return (
        <div className="max-w-7xl mx-auto p-10">
            <h1 className="mb-10 text-4xl font-bold text-center">
                Department Registration
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-12">
                {/* Left Column */}
                <div className="space-y-12">
                    {/* Department Information */}
                    <div className="p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl font-semibold mb-6">
                            Department Information
                        </h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 font-medium">
                                    Department/Agency Name:
                                </label>
                                <input
                                    type="text"
                                    name="departmentName"
                                    value={formData.departmentName}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">
                                    Type of Department
                                </label>
                                <select
                                    name="departmentType"
                                    value={formData.departmentType}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                                >
                                    <option value="" disabled>
                                        Select Department Type
                                    </option>
                                    <option value="municipal">
                                        Municipal Authority
                                    </option>
                                    <option value="state">State Agency</option>
                                    <option value="federal">
                                        Federal Government
                                    </option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">
                                    Department Registration Number
                                </label>
                                <input
                                    type="text"
                                    name="registrationNumber"
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">
                                    Department Address:
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl font-semibold mb-6">
                            Contact Information
                        </h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 font-medium">
                                    Contact Person’s Name:
                                </label>
                                <input
                                    type="text"
                                    name="contactPerson"
                                    value={formData.contactPerson}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">
                                    Position of Contact Person:
                                </label>
                                <input
                                    type="text"
                                    name="contactPosition"
                                    value={formData.contactPosition}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">
                                    Official Email Address:
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">
                                    Contact Number:
                                </label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-12">
                    {/* Document Upload */}
                    <div className="p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl font-semibold mb-6">
                            Upload Documents
                        </h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 font-medium">
                                    Upload Authorization Certificate:
                                </label>
                                <input
                                    type="file"
                                    name="authorizationDoc"
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">
                                    Upload Tax Registration/Proof:
                                </label>
                                <input
                                    type="file"
                                    name="taxProof"
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl font-semibold mb-6">
                            Account Information
                        </h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 font-medium">
                                    Username:
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">
                                    Confirm Password:
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition w-full text-xl"
                    >
                        Register Department
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;
