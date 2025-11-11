import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../context/firebase";

const RegistrationForm = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

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

    const totalSteps = 5;
    const progress = Math.round((step / totalSteps) * 100);
    const auth = getAuth();

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            const file = files && files.length > 0 ? files[0] : null;
            setFormData({ ...formData, [name]: file });
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const nextStep = () => step < totalSteps && setStep(step + 1);
    const prevStep = () => step > 1 && setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step !== totalSteps) return;

        setIsSubmitting(true);

        console.debug("Register submit", { step, totalSteps, formData });

        const requiredFields = [
            "departmentName",
            "departmentType",
            "registrationNumber",
            "address",
            "contactPerson",
            "contactPosition",
            "email",
            "phoneNumber",
            "username",
            "password",
            "confirmPassword",
        ];

        const missing = requiredFields.filter((f) => {
            const val = formData[f];
            return (
                val === null ||
                val === undefined ||
                (typeof val === "string" && val.trim() === "")
            );
        });

        if (missing.length > 0) {
            alert(
                `Please complete the following fields before submitting: ${missing.join(
                    ", "
                )}`
            );
            setIsSubmitting(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            setIsSubmitting(false);
            return;
        }

        let createdUser = null;
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            createdUser = userCredential.user;

            const departmentId = formData.departmentName
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/[\s_-]+/g, "-")
                .trim();

            if (!departmentId) {
                try {
                    await createdUser.delete();
                } catch (delErr) {
                    console.error("Failed to delete orphaned user:", delErr);
                }
                alert("Invalid department name. Please check and try again.");
                setIsSubmitting(false);
                return;
            }

            const userDocRef = doc(db, "users", createdUser.uid);
            await setDoc(userDocRef, {
                userId: createdUser.uid,
                user_name: formData.contactPerson,
                email: formData.email,
                department: departmentId,
                role: "admin",
                contactPosition: formData.contactPosition,
                phoneNumber: formData.phoneNumber,
                createdAt: serverTimestamp(),
            });

            const deptDocRef = doc(db, "departments", departmentId);
            await setDoc(deptDocRef, {
                departmentName: formData.departmentName,
                departmentType: formData.departmentType,
                registrationNumber: formData.registrationNumber,
                address: formData.address,
                adminId: createdUser.uid,
                adminName: formData.contactPerson,
                createdAt: serverTimestamp(),
            });

            setIsSubmitting(false);
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error registering user:", error);

            if (createdUser) {
                try {
                    await createdUser.delete();
                    console.info("Deleted orphaned auth user after failure.");
                } catch (delErr) {
                    console.error("Failed to delete orphaned user:", delErr);
                }
            }

            alert(`Registration failed: ${error.message}`);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-10 sm:p-16 bg-gray-50 rounded-2xl shadow-2xl my-12">
            <div className="w-full bg-gray-300 rounded-full h-3 mb-10 overflow-hidden">
                <div
                    className="h-3 bg-blue-600 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="text-right text-sm font-medium text-gray-700 mb-8">
                {progress}% Complete
            </p>

            <h1 className="text-4xl font-bold text-center mb-14 text-gray-800">
                Department Registration
            </h1>

            {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-16">
                    {step === 1 && (
                        <div className="p-10 bg-white rounded-xl shadow-md space-y-8">
                            <h2 className="text-2xl font-semibold mb-8">
                                Department Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <input
                                    type="text"
                                    name="departmentName"
                                    placeholder="Department / Agency Name"
                                    value={formData.departmentName}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-5 border-2 border-gray-300 rounded-lg"
                                />
                                <select
                                    name="departmentType"
                                    value={formData.departmentType}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-5 border-2 border-gray-300 rounded-lg"
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
                                <input
                                    type="text"
                                    name="registrationNumber"
                                    placeholder="Registration Number"
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-5 border-2 border-gray-300 rounded-lg"
                                />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Department Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-5 border-2 border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="p-10 bg-white rounded-xl shadow-md space-y-8">
                            <h2 className="text-2xl font-semibold mb-8">
                                Contact Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <input
                                    type="text"
                                    name="contactPerson"
                                    placeholder="Contact Person’s Name"
                                    value={formData.contactPerson}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-5 border-2 border-gray-300 rounded-lg"
                                />
                                <input
                                    type="text"
                                    name="contactPosition"
                                    placeholder="Position of Contact Person"
                                    value={formData.contactPosition}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-5 border-2 border-gray-300 rounded-lg"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Official Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-5 border-2 border-gray-300 rounded-lg"
                                />
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Contact Number"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-5 border-2 border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="p-10 bg-white rounded-xl shadow-md space-y-8">
                            <h2 className="text-2xl font-semibold mb-8">
                                Upload Documents
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block mb-3 font-medium">
                                        Authorization Certificate
                                    </label>
                                    <input
                                        type="file"
                                        name="authorizationDoc"
                                        accept="image/*,application/pdf"
                                        onChange={handleChange}
                                        className="w-full p-4 border-2 border-gray-300 rounded-lg"
                                    />
                                    {formData.authorizationDoc && (
                                        <div className="mt-5">
                                            <img
                                                src={URL.createObjectURL(
                                                    formData.authorizationDoc
                                                )}
                                                alt="Authorization Preview"
                                                className="w-48 h-48 object-cover border-2 rounded-lg mx-auto"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-3 font-medium">
                                        Tax Registration / Proof
                                    </label>
                                    <input
                                        type="file"
                                        name="taxProof"
                                        accept="image/*,application/pdf"
                                        onChange={handleChange}
                                        className="w-full p-4 border-2 border-gray-300 rounded-lg"
                                    />
                                    {formData.taxProof && (
                                        <div className="mt-5">
                                            <img
                                                src={URL.createObjectURL(
                                                    formData.taxProof
                                                )}
                                                alt="Tax Proof Preview"
                                                className="w-48 h-48 object-cover border-2 rounded-lg mx-auto"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="p-10 bg-white rounded-xl shadow-md space-y-8">
                            <h2 className="text-2xl font-semibold mb-8">
                                Account Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-5 border-2 border-gray-300 rounded-lg"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-5 border-2 border-gray-300 rounded-lg"
                                />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-5 border-2 border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="p-10 bg-white rounded-xl shadow-md space-y-8">
                            <h2 className="text-2xl font-semibold text-center mb-8">
                                Preview Summary
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-800">
                                <div>
                                    <h3 className="font-semibold text-lg mb-4 text-blue-700">
                                        Department Details
                                    </h3>
                                    <p>
                                        <strong>Name:</strong>{" "}
                                        {formData.departmentName}
                                    </p>
                                    <p>
                                        <strong>Type:</strong>{" "}
                                        {formData.departmentType}
                                    </p>
                                    <p>
                                        <strong>Reg. Number:</strong>{" "}
                                        {formData.registrationNumber}
                                    </p>
                                    <p>
                                        <strong>Address:</strong>{" "}
                                        {formData.address}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-4 text-blue-700">
                                        Contact Details
                                    </h3>
                                    <p>
                                        <strong>Person:</strong>{" "}
                                        {formData.contactPerson}
                                    </p>
                                    <p>
                                        <strong>Position:</strong>{" "}
                                        {formData.contactPosition}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {formData.email}
                                    </p>
                                    <p>
                                        <strong>Phone:</strong>{" "}
                                        {formData.phoneNumber}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-4 text-blue-700">
                                        Uploaded Documents
                                    </h3>
                                    <div className="flex flex-col items-center gap-6">
                                        {formData.authorizationDoc && (
                                            <img
                                                src={URL.createObjectURL(
                                                    formData.authorizationDoc
                                                )}
                                                alt="Authorization"
                                                className="w-40 h-40 object-cover border rounded-lg shadow-md"
                                            />
                                        )}
                                        {formData.taxProof && (
                                            <img
                                                src={URL.createObjectURL(
                                                    formData.taxProof
                                                )}
                                                alt="Tax Proof"
                                                className="w-40 h-40 object-cover border rounded-lg shadow-md"
                                            />
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-4 text-blue-700">
                                        Account Details
                                    </h3>
                                    <p>
                                        <strong>Username:</strong>{" "}
                                        {formData.username}
                                    </p>
                                    <p>
                                        <strong>Password:</strong> ••••••••
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between mt-8 flex-wrap gap-5">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-8 py-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                            >
                                Previous
                            </button>
                        )}
                        {step < totalSteps && (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
                            >
                                Next
                            </button>
                        )}
                        {step === totalSteps && (
                            <button
                                type="submit"
                                className="px-10 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition ml-auto flex items-center justify-center min-w-[180px]"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg
                                            className="animate-spin h-5 w-5 mr-3 text-white"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v8z"
                                            ></path>
                                        </svg>
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        )}
                    </div>
                </form>
            ) : (
                <div className="flex flex-col items-center justify-center text-center py-20">
                    <div className="bg-green-100 border-2 border-green-500 rounded-2xl p-10 shadow-lg max-w-lg">
                        <div className="text-green-600 mb-6">
                            <svg
                                className="w-20 h-20 mx-auto"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-green-700 mb-4">
                            Registration Successful!
                        </h2>
                        <p className="text-gray-700 text-lg">
                            Thank you for registering your department. A
                            confirmation email has been sent to{" "}
                            <strong>{formData.email}</strong>.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegistrationForm;