import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// NGO API Calls
export const registerNgo = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ngo/register`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};


// Resort API Calls
export const registerResort = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/resort/register`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};



export const fetchNgos = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/ngos`);
        return response.data.ngos || []; // Ensure data is always an array
    } catch (error) {
        console.error("Error fetching NGOs:", error);
        return [];
    }
};

export const fetchResorts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/resorts`);
        return response.data.resorts || []; // Ensure data is always an array
    } catch (error) {
        console.error("Error fetching Resorts:", error);
        return [];
    }
};
export const approveNgo = async (ngoId, data) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/admin/ngos/${ngoId}/approve`,
      data,  // Ensure correct payload
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error approving NGO:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to approve NGO" };
  }
};

export const updateNgo = async (ngoId, adminComments) => {
  return await axios.put(
    `${API_BASE_URL}/admin/ngos/update/${ngoId}`,
    { adminComments: adminComments.adminComments }, // ✅ This prevents nesting
    { headers: { "Content-Type": "application/json" } }
  );
};
export const approveResort = async (resortId, data) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/admin/resorts/${resortId}/approve`,
      data,  // Ensure correct payload
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error approving Resort:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to approve Resort" };
  }
};
export const updateResort = async (resortId, adminComments) => {
  return await axios.put(
    `${API_BASE_URL}/admin/resorts/update/${resortId}`,
    { adminComments: adminComments.adminComments }, // ✅ This prevents nesting
    { headers: { "Content-Type": "application/json" } }
  );
};