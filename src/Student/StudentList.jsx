import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Modal, notification } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getStudents, getGenders, getGradeLevels, getPrefixes, updateStudent , deleteStudent} from '../services/api';
import EditStudentForm from './EditStudentForm';
import moment from 'moment';

const { Column } = Table;

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [genders, setGenders] = useState([]);
  const [gradeLevels, setGradeLevels] = useState([]);
  const [prefixes, setPrefixes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [visible, setVisible] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentData = await getStudents();
      const genderData = await getGenders();
      const gradeLevelData = await getGradeLevels();
      const prefixData = await getPrefixes();

      setStudents(studentData);
      setGenders(genderData);
      setGradeLevels(gradeLevelData);
      setPrefixes(prefixData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    if (clearFilters) {
      clearFilters();
    }
    setSearchText('');
    setSearchedColumn('');
  };

  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`ค้นหา ${title}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            ค้นหา
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            รีเซ็ต
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] && record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });
  
  const showEditModal = (record) => {
    setInitialValues(record);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleUpdate = async (id, values) => {
    try {

      values.birthdate = moment(values.birthdate).format('YYYY-MM-DD');
      await updateStudent(id, values);

      notification.success({
        message: 'สำเร็จ',
        description: 'แก้ไขข้อมูลเรียบร้อยแล้ว',
      });

      await fetchData();

      setVisible(false);
    } catch (error) {
      console.error('Error updating student:', error);
      notification.error({
        message: 'ผิดพลาด',
        description: 'ไม่สามารถแก้ไขข้อมูลได้',
      });
    }
  };

  const showDeleteConfirm = (studentId) => {
    Modal.confirm({
      title: 'คุณแน่ใจหรือไม่ที่จะลบนักเรียนนี้?',
      okText: 'ใช่, ลบ',
      okType: 'danger',
      cancelText: 'ยกเลิก',
      async onOk() {
        await handleDelete(studentId);
      },
      onCancel() {
        console.log('ยกเลิกการลบ');
      },
    });
  };

  const handleDelete = async (studentId) => {
    try {
      await deleteStudent(studentId);

      notification.success({
        message: 'สำเร็จ',
        description: 'ลบข้อมูลนักเรียนเรียบร้อยแล้ว',
      });

      // Update the student list
      await fetchData();
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบนักเรียน:', error);
      notification.error({
        message: 'ผิดพลาด',
        description: 'ไม่สามารถลบนักเรียนได้',
      });
    }
  };

  const columns = [
    {
      title: 'เลขประจำตัว',
      dataIndex: 'studentid',
      key: 'studentid',
      ...getColumnSearchProps('studentid', 'เลขประจำตัว'),
    },
    {
      title: 'คำนำหน้า',
      dataIndex: ['prefix', 'prefixname'],
      key: 'prefixname',
      filters: prefixes.map((prefix) => ({
        text: prefix.prefixname,
        value: prefix.prefixid,
      })),
      onFilter: (value, record) => record.prefix && record.prefix.prefixid === value,
    },
    {
      title: 'ชื่อ',
      dataIndex: 'firstname',
      key: 'firstname',
      ...getColumnSearchProps('firstname', 'ชื่อ'),
    },
    {
      title: 'นามสกุล',
      dataIndex: 'lastname',
      key: 'lastname',
      ...getColumnSearchProps('lastname', 'นามสกุล'),
    },
    {
      title: 'เพศ',
      dataIndex: ['gender', 'gendername'],
      key: 'gendername',
      filters: genders.map((gender) => ({
        text: gender.gendername,
        value: gender.genderid,
      })),
      onFilter: (value, record) => record.gender && record.gender.genderid === value,
    },
    {
      title: 'วันเกิด',
      dataIndex: 'birthdate',
      key: 'birthdate',
      render: (text) => moment(text).format('YYYY-MM-DD'),
      ...getColumnSearchProps('birthdate', 'วันเกิด'),
    },
    {
      title: 'ระดับชั้น',
      dataIndex: ['gradeLevel', 'levelname'],
      key: 'levelname',
      filters: gradeLevels.map((level) => ({
        text: level.levelname,
        value: level.gradelevelid,
      })),
      onFilter: (value, record) => record.gradeLevel && record.gradeLevel.gradelevelid === value,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => showEditModal(record)}>แก้ไข</Button>
          <Button type="primary" danger onClick={() => showDeleteConfirm(record.studentid)}>
            ลบ
          </Button>
        </Space>
      ),
    },
  ];
  
  // Filtered students based on searchText and searchedColumn
  const filteredStudents = students.filter((record) =>
    searchedColumn && record[searchedColumn]
      ? record[searchedColumn].toString().includes(searchText)
      : true
  );
  

  

  return (
    <>
      <Table columns={columns} dataSource={filteredStudents} rowKey="studentid" />

      <Modal visible={visible} title="แก้ไขข้อมูลนักเรียน" onCancel={handleCancel} footer={null}>
        <EditStudentForm
          initialValues={initialValues}
          onCancel={handleCancel}
          onSubmit={handleUpdate}
          genders={genders}
          gradeLevels={gradeLevels}
          prefixes={prefixes}
        />
      </Modal>
    </>
  );
};

export default StudentList;
