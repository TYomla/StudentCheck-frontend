// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Students
export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/student`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const createStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/student`, studentData);
    return response.data;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

export const updateStudent = async (id, student) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/student/${id}`, student);
    return response.data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};


export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/student/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

// Classrooms
export const getClassrooms = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/classroom`);
    return response.data;
  } catch (error) {
    console.error('Error fetching classrooms:', error);
    throw error;
  }
};

export const addClassroom = async (classroom) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/classroom`, classroom);
    return response.data;
  } catch (error) {
    console.error('Error adding classroom:', error);
    throw error;
  }
};

export const updateClassroom = async (id, classroom) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/classroom/${id}`, classroom);
    return response.data;
  } catch (error) {
    console.error('Error updating classroom:', error);
    throw error;
  }
};

export const deleteClassroom = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/classroom/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting classroom:', error);
    throw error;
  }
};
export const getGenders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/gender`);
    return response.data;
  } catch (error) {
    console.error('Error fetching genders:', error);
    throw error;
  }
};

export const getGradeLevels = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/gradelevel`);
    return response.data;
  } catch (error) {
    console.error('Error fetching grade levels:', error);
    throw error;
  }
};

export const getPrefixes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/prefix`);
    return response.data;
  } catch (error) {
    console.error('Error fetching prefixes:', error);
    throw error;
  }

};




