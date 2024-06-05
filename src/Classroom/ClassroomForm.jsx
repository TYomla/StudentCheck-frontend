import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification ,Select } from 'antd';
import { addClassroom, getGradeLevels } from '../services/api';
const { Option } = Select;

const ClassroomForm = ({ onFinish }) => {
  const [form] = Form.useForm();

  const onFinishClassroom = async (values) => {
    try {
      await addClassroom(values);

      notification.success({
        message: 'สำเร็จ',
        description: 'เพิ่มชั้นเรียนเรียบร้อยแล้ว',
      });

      form.resetFields();
    } catch (error) {
      notification.error({
        message: 'ผิดพลาด',
        description: 'ไม่สามารถเพิ่มชั้นเรียนได้',
      });
      console.error('Error adding classroom:', error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinishClassroom}>
      <Form.Item
        name="classname"
        label="ชื่อชั้นเรียน"
        rules={[{ required: true, message: 'กรุณากรอกชื่อชั้นเรียน' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="academic_year"
        label="ปีการศึกษา"
        rules={[{ required: true, message: 'กรุณากรอกปีการศึกษา' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="homeroom_teacher"
        label="ครูประจำชั้น"
        rules={[{ required: true, message: 'กรุณากรอกครูประจำชั้น' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          เพิ่มชั้นเรียน
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ClassroomForm;
