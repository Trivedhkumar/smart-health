import { v4 as uuidv4 } from "uuid";

export const incidentTypes = [
  { id: uuidv4(), label: "System Outage", value: "system_outage" },
  { id: uuidv4(), label: "Security Breach", value: "security_breach" },
  {
    id: uuidv4(),
    label: "Equipment Malfunction",
    value: "equipment_malfunction",
  },
  { id: uuidv4(), label: "Data Loss", value: "data_loss" },
  {
    id: uuidv4(),
    label: "Patient Safety Incident",
    value: "patient_safety_incident",
  },
  { id: uuidv4(), label: "Natural Disaster", value: "natural_disaster" },
  { id: uuidv4(), label: "Power Outage", value: "power_outage" },
  { id: uuidv4(), label: "Network Outage", value: "network_outage" },
  { id: uuidv4(), label: "Human Error", value: "human_error" },
  { id: uuidv4(), label: "Other", value: "other" },
];

export const incidentData = [
  // Replace with actual incident data
  {
    id: uuidv4(),
    type: "System Outage",
    severity: "High",
    status: "Open",
    assignedTo: "John Doe (Doctor)",
    description: "Server failure causing platform downtime.",
  },
  {
    id: uuidv4(),
    type: "Security Breach",
    severity: "Critical",
    status: "Ongoing",
    assignedTo: "Jane Smith (Security Analyst)",
    description: "Unauthorized access detected in patient records.",
  },
  {
    id: uuidv4(),
    type: "Equipment Malfunction",
    severity: "Medium",
    status: "Closed",
    assignedTo: "David Li (Technician)",
    description: "Medical device malfunctioning in Room 101.",
  },
  // ... add more incident data
];

export const severityColors = {
  High: "red",
  Medium: "orange",
  Low: "yellow",
};

export const severities = [
  { id: uuidv4(), label: "Critical", value: "critical" },
  { id: uuidv4(), label: "High", value: "high" },
  { id: uuidv4(), label: "Medium", value: "medium" },
  { id: uuidv4(), label: "Low", value: "low" },
];

export const incidentStatuses = [
  { id: uuidv4(), label: "Open", value: "open" },
  { id: uuidv4(), label: "Ongoing", value: "ongoing" },
  { id: uuidv4(), label: "Closed", value: "closed" },
];

export const assignedTo = [
  { id: uuidv4(), label: "John Doe (Doctor)", value: "user_id_1" },
  { id: uuidv4(), label: "Jane Smith (Nurse)", value: "user_id_2" },
  { id: uuidv4(), label: "David Li (Technician)", value: "user_id_3" },
  // ... add more assigned personnel
];
