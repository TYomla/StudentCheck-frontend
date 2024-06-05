import React, { useState, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import ClassroomList from '../Classroom/ClassroomList';
import ClassroomForm from '../Classroom/ClassroomForm';
import { getClassrooms, addClassroom } from '../services/api';

const ClassroomsPage = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const data = await getClassrooms();
        setClassrooms(data);
      } catch (error) {
        message.error('Failed to fetch classrooms');
      }
    };
    fetchClassrooms();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddClassroom = async (classroom) => {
    try {
      const newClassroom = await addClassroom(classroom);
      setClassrooms((prev) => [...prev, newClassroom]);
      message.success('Classroom added successfully');
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to add classroom');
    }
  };

  return (
    <div>
       <h1>ห้องเรียน</h1>
      <Button type="primary" onClick={showModal} style={{ marginTop: '10px', marginBottom:'10px' }}>
        เพิ่มขั้นเรียน
      </Button>
      <ClassroomList classrooms={classrooms} />
      <Modal title="เพิ่มชั้นเรียน" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <ClassroomForm onSubmit={handleAddClassroom} />
      </Modal>
    </div>
  );
};

export default ClassroomsPage;
