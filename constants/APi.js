// api.js

const API_BASE_URL = 'https://api-dev.mhc.doginfo.click';

export const doctorLogin = async (endpoint, data) => {
  console.log(endpoint, data)
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong');
    }

    return result;
  } catch (error) {
    console.error('API POST request error:', error);
    throw error;
  }
};

export const getAllDoctors = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/doctor`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // You can add additional headers here if required
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch doctors');
    }

    return result;
  } catch (error) {
    console.error('API GET request error:', error);
    throw error;
  }
};

export const getSpecialist = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/speciality/combined-subspecs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // You can add additional headers here if required
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch doctors');
    }

    return result;
  } catch (error) {
    console.error('API GET request error:', error);
    throw error;
  }
};


export const getDoctorBySpecialityIds = async (ids) => {
  try {
    const response = await fetch(`${API_BASE_URL}/doctor?by-specialities`,
       {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: ids, // Sending the array of IDs in the request body
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch doctors by specialities');
    }

    return result;
  } catch (error) {
    console.error('API POST request error:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/lab-test/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // You can add additional headers here if required
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch doctors');
    }

    return result;
  } catch (error) {
    console.error('API GET request error:', error);
    throw error;
  }
};

export const getDoctorbyId = async (DocId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/doctor?doctorId=${DocId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // You can add additional headers here if required
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch doctors');
    }

    return result;
  } catch (error) {
    console.error('API GET request error:', error);
    throw error;
  }
};