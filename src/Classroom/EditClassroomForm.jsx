import React, { useEffect } from 'react';
import { Form, Input, Button, Select, Space, Row, Col } from 'antd';

const { Option } = Select;

const EditClassroomForm = ({ initialValues, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...initialValues });
  }, [initialValues, form]);

  const onFinish = (values) => {
    onSubmit(initialValues.classroomid, values);
    console.log(initialValues.classroomid);
  };

  const handleCancel = () => {
    form.resetFields(); // Reset form fields
    onCancel();
  };

  return (
    <Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="classname"
            label="ชื่อชั้นเรียน"
            rules={[{ required: true, message: 'กรุณากรอกชื่อชั้นเรียน!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="academic_year"
            label="ปีการศึกษา"
            rules={[{ required: true, message: 'กรุณากรอกปีการศึกษา!' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="homeroom_teacher"
            label="ครูประจำชั้น"
            rules={[{ required: true, message: 'กรุณากรอกครูประจำชั้น!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            บันทึก
          </Button>
          <Button onClick={handleCancel}>ยกเลิก</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default EditClassroomForm;
