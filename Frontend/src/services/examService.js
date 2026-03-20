import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/exams';

class ExamService {
  // Get auth headers with JWT token
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  }

  // Create a new exam schedule
  async createExam(examData) {
    try {
      const response = await axios.post(API_URL, examData, this.getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Error creating exam:', error);
      throw error.response?.data || { message: 'Failed to create exam' };
    }
  }

  // Get all exams for a company
  async getCompanyExams(companyId) {
    try {
      const response = await axios.get(
        `${API_URL}/company/${companyId}`,
        this.getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching company exams:', error);
      throw error.response?.data || { message: 'Failed to fetch exams' };
    }
  }

  // Get all exams for a student
  async getStudentExams(studentId) {
    try {
      const response = await axios.get(
        `${API_URL}/student/${studentId}`,
        this.getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching student exams:', error);
      throw error.response?.data || { message: 'Failed to fetch exams' };
    }
  }

  // Get single exam by ID
  async getExamById(examId) {
    try {
      const response = await axios.get(
        `${API_URL}/${examId}`,
        this.getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching exam:', error);
      throw error.response?.data || { message: 'Failed to fetch exam' };
    }
  }

  // Update an exam
  async updateExam(examId, updateData) {
    try {
      const response = await axios.put(
        `${API_URL}/${examId}`,
        updateData,
        this.getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Error updating exam:', error);
      throw error.response?.data || { message: 'Failed to update exam' };
    }
  }

  // Delete an exam
  async deleteExam(examId) {
    try {
      const response = await axios.delete(
        `${API_URL}/${examId}`,
        this.getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting exam:', error);
      throw error.response?.data || { message: 'Failed to delete exam' };
    }
  }
}

export const examService = new ExamService();
