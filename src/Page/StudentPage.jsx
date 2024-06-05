import React, { useState, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import StudentList from '../Student/StudentList';
import StudentForm from '../Student/StudentForm';
import { getStudents, createStudent } from '../services/api';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        message.error('Failed to fetch students');
      }
    };
    fetchStudents();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddStudent = async (student) => {
    try {
      const newStudent = await createStudent(student);
      setStudents((prevStudents) => [...prevStudents, newStudent]);
      setIsModalVisible(false);
      message.success('Student added successfully');
    } catch (error) {
      message.error('Failed to add student');
    }
  };

  return (
    <div>
       <h1>ข้อมูลนักเรียน</h1>
      <Button type="primary" onClick={showModal} style={{ marginTop: '10px', marginBottom:'10px' }}>
        เพิ่มข้อมูลนักเรียน
      </Button>
      <Modal
        title="เพิ่มข้อมูลนักเรียน"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <StudentForm onSubmit={handleAddStudent} />
      </Modal>
      <StudentList students={students} />
    </div>
  );
};

export default StudentsPage;
