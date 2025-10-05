import React, { useState } from 'react';
import "../styles/ProjectForm.css";
const ProjectForm = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    startDate: '',
    endDate: '',
    projectManager: '',
    teamMembers: '',
    department: '',
    objectives: '',
    deliverables: '',
    milestones: '',
    budget: '',
    toolsTechnologies: '',
    resourceAllocation: '',
    potentialRisks: '',
    riskMitigationPlan: '',
    stakeholders: '',
    communicationPlan: '',
    reportingFrequency: '',
    projectPriority: '',
    specialRequirements: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Project Data:', formData);
    // Here you can add your form submission logic like API call, etc.
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <div>
        <label>Project Name:</label>
        <input
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Project Description:</label>
        <textarea
          name="projectDescription"
          value={formData.projectDescription}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Project Manager:</label>
        <input
          type="text"
          name="projectManager"
          value={formData.projectManager}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Team Members (comma separated):</label>
        <input
          type="text"
          name="teamMembers"
          value={formData.teamMembers}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Objectives/Goals:</label>
        <textarea
          name="objectives"
          value={formData.objectives}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Deliverables:</label>
        <textarea
          name="deliverables"
          value={formData.deliverables}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Milestones:</label>
        <textarea
          name="milestones"
          value={formData.milestones}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Budget:</label>
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Tools/Technologies:</label>
        <input
          type="text"
          name="toolsTechnologies"
          value={formData.toolsTechnologies}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Resource Allocation:</label>
        <textarea
          name="resourceAllocation"
          value={formData.resourceAllocation}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Potential Risks:</label>
        <textarea
          name="potentialRisks"
          value={formData.potentialRisks}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Risk Mitigation Plan:</label>
        <textarea
          name="riskMitigationPlan"
          value={formData.riskMitigationPlan}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Stakeholders:</label>
        <input
          type="text"
          name="stakeholders"
          value={formData.stakeholders}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Communication Plan:</label>
        <textarea
          name="communicationPlan"
          value={formData.communicationPlan}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Reporting Frequency:</label>
        <input
          type="text"
          name="reportingFrequency"
          value={formData.reportingFrequency}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Project Priority:</label>
        <select name="projectPriority" value={formData.projectPriority} onChange={handleChange}>
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div>
        <label>Special Requirements:</label>
        <textarea
          name="specialRequirements"
          value={formData.specialRequirements}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit Project</button>
    </form>
  );
};

export default ProjectForm;
