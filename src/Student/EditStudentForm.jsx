import React, { useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, Space, Row, Col } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

const EditStudentForm = ({ initialValues, onCancel, onSubmit, genders, gradeLevels, prefixes }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...initialValues,
      birthdate: initialValues.birthdate ? dayjs(initialValues.birthdate) : null,
    });
  }, [initialValues, form]);

  const onFinish = values => {
    // Format birthdate using dayjs to match MySQL datetime format
    const updatedValues = {
      ...values,
      birthdate: values.birthdate ? values.birthdate.format('YYYY-MM-DD') : null,
    };
    onSubmit(initialValues.studentid, updatedValues);
  };

  const handleCancel = () => {
    form.resetFields(); // Reset form fields
    onCancel();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...initialValues,
        birthdate: initialValues.birthdate ? dayjs(initialValues.birthdate) : null,
      }}
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="prefixid" label="คำนำหน้า" rules={[{ required: true, message: 'Please select a prefix!' }]}>
            <Select>
              {prefixes.map(prefix => (
                <Option key={prefix.prefixid} value={prefix.prefixid}>
                  {prefix.prefixname}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="genderid" label="เพศ" rules={[{ required: true, message: 'Please select a gender!' }]}>
            <Select>
              {genders.map(gender => (
                <Option key={gender.genderid} value={gender.genderid}>
                  {gender.gendername}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="firstname" label="ชื่อ" rules={[{ required: true, message: 'Please input the first name!' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="lastname" label="นามสกุล" rules={[{ required: true, message: 'Please input the last name!' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="birthdate" label="วันเกิด" rules={[{ required: true, message: 'Please select the birth date!' }]}>
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="gradelevelid" label="ระดับชั้น" rules={[{ required: true, message: 'Please select a grade level!' }]}>
            <Select>
              {gradeLevels.map(level => (
                <Option key={level.gradelevelid} value={level.gradelevelid}>
                  {level.levelname}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default EditStudentForm;
