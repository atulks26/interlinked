import React, { useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import ProfileImg from "../images/profile.png";
import Sidebar from "../components/Sidebar";

const ManageJunior = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState(null);

  // Mock data
  const [employees, setEmployees] = useState([
    { id: 1, name: "Priyanshu", subdepartment: "Finance", email: "priyanshu@company.com" },
    { id: 2, name: "Atul", subdepartment: "HR", email: "atul@company.com" },
    { id: 3, name: "Ankur", subdepartment: "IT", email: "ankur@company.com" },
  ]);

  // Filtering and sorting
  const filteredEmployees = employees
    .filter(
      (e) =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.subdepartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  // CRUD handlers
  const handleAddOfficer = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const subdepartment = e.target.subdepartment.value.trim();
    const email = e.target.email.value.trim();

    if (name && subdepartment && email) {
      setEmployees([
        ...employees,
        { id: Date.now(), name, subdepartment, email },
      ]);
      setShowAddModal(false);
      e.target.reset();
    }
  };

  const handleEditOfficer = (e) => {
    e.preventDefault();
    const updated = employees.map((emp) =>
      emp.id === selectedOfficer.id
        ? {
            ...emp,
            name: e.target.name.value,
            subdepartment: e.target.subdepartment.value,
            email: e.target.email.value,
          }
        : emp
    );
    setEmployees(updated);
    setShowEditModal(false);
  };

  const handleDeleteOfficer = () => {
    setEmployees(employees.filter((emp) => emp.id !== selectedOfficer.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="flex">
      {/* ✅ Sidebar same as ProjectsPage */}
      <Sidebar type="admin" />

      {/* ✅ Main Content */}
      <div className="container mx-auto p-6 flex-1">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
          <h1 className="text-3xl font-bold">Manage Junior Officers</h1>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-gray-800 flex items-center gap-2"
            >
              <FaPlus /> Add Officer
            </button>
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded flex items-center gap-2"
            >
              {sortAsc ? <FaSortAlphaDown /> : <FaSortAlphaUp />} Sort
            </button>
            <button
              onClick={() => setSearchTerm("")}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4 relative w-full max-w-md">
          <input
            type="search"
            placeholder="Search officer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Officers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white shadow rounded p-4 flex flex-col items-center gap-2 hover:shadow-lg transition"
            >
              <img
                src={ProfileImg}
                alt={emp.name}
                className="w-16 h-16 rounded-full"
              />
              <h2 className="font-semibold text-lg">{emp.name}</h2>
              <p className="text-sm text-gray-500">
                <strong>Sub-department:</strong> {emp.subdepartment}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Email:</strong> {emp.email}
              </p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    setSelectedOfficer(emp);
                    setShowEditModal(true);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedOfficer(emp);
                    setShowDeleteModal(true);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowAddModal(false)}
        >
          <form
            onSubmit={handleAddOfficer}
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Add New Officer</h2>
            <input
              name="name"
              placeholder="Name"
              required
              className="w-full mb-3 border rounded p-2"
            />
            <input
              name="subdepartment"
              placeholder="Sub-department"
              required
              className="w-full mb-3 border rounded p-2"
            />
            <input
              name="email"
              placeholder="Email ID"
              type="email"
              required
              className="w-full mb-3 border rounded p-2"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-500"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedOfficer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowEditModal(false)}
        >
          <form
            onSubmit={handleEditOfficer}
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Edit Officer</h2>
            <input
              name="name"
              defaultValue={selectedOfficer.name}
              required
              className="w-full mb-3 border rounded p-2"
            />
            <input
              name="subdepartment"
              defaultValue={selectedOfficer.subdepartment}
              required
              className="w-full mb-3 border rounded p-2"
            />
            <input
              name="email"
              defaultValue={selectedOfficer.email}
              type="email"
              required
              className="w-full mb-3 border rounded p-2"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedOfficer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-3">Confirm Delete</h2>
            <p className="mb-4">
              Are you sure you want to delete{" "}
              <strong>{selectedOfficer.name}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteOfficer}
                className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJunior;
