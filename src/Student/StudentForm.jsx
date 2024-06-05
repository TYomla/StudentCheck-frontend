import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, Row, Col, notification } from 'antd';
import dayjs from 'dayjs';
import { getPrefixes, getGenders, getGradeLevels, createStudent } from '../services/api';

const { Option } = Select;

const StudentForm = () => {
    const [form] = Form.useForm();
    const [prefixes, setPrefixes] = useState([]);
    const [genders, setGenders] = useState([]);
    const [gradeLevels, setGradeLevels] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const prefixData = await getPrefixes();
                const genderData = await getGenders();
                const gradeLevelData = await getGradeLevels();

                setPrefixes(prefixData);
                setGenders(genderData);
                setGradeLevels(gradeLevelData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const onFinish = async values => {
        try {
            await createStudent({
                ...values,
                birthdate: values.birthdate.format('YYYY-MM-DD'),
            });
            notification.success({
                message: 'สำเร็จ',
                description: 'เพิ่มข้อมูลนักเรียนเรียบร้อยแล้ว',
            });
            form.resetFields();
        } catch (error) {
            notification.error({
                message: 'ผิดพลาด',
                description: 'ไม่สามารถเพิ่มข้อมูลนักเรียนได้',
            });
            console.error('Error adding student:', error);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}  style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="prefixid" label="คำนำหน้า" rules={[{ required: true, message: 'Please select a prefix' }]} >
                        <Select placeholder="เลือกคำนำหน้า">
                            {prefixes.map(prefix => (
                                <Option key={prefix.prefixid} value={prefix.prefixid}>
                                    {prefix.prefixname}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="genderid" label="เพศ" rules={[{ required: true, message: 'Please select a gender' }]} >
                        <Select placeholder="เลือกเพศ">
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
                    <Form.Item name="firstname" label="ชื่อ" rules={[{ required: true, message: 'Please enter first name' }]} >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="lastname" label="นามสกุล" rules={[{ required: true, message: 'Please enter last name' }]} >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="birthdate" label="วันเกิด" rules={[{ required: true, message: 'Please select a birthdate' }]} >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="gradelevelid" label="ระดับชั้น" rules={[{ required: true, message: 'Please select a grade level' }]} >
                        <Select placeholder="เลือกระดับชั้น">
                            {gradeLevels.map(level => (
                                <Option key={level.gradelevelid} value={level.gradelevelid}>
                                    {level.levelname}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit" style={{ textAlign: 'center' }}>
                    เพิ่มข้อมูล
                </Button>
            </Form.Item>
        </Form>
    );
};

export default StudentForm;
