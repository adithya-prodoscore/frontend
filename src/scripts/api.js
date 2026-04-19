import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const fetchAllPins = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/pins`);
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Error fetching pins";
    return { data: null, error: errorMessage };
  }
};

export const fetchPin = async (id) => {};
