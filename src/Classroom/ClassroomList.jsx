import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, notification, Input } from 'antd';
import { getClassrooms, deleteClassroom , updateClassroom} from '../services/api';
import EditClassroomForm from './EditClassroomForm';
import { SearchOutlined } from '@ant-design/icons';


const { Column } = Table;

const ClassroomList = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [visible, setVisible] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const classroomData = await getClassrooms();
      setClassrooms(classroomData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showEditModal = (record) => {
    setInitialValues(record);
    setVisible(true);
  };
  
  const handleCancel = () => {
    setVisible(false);
  };

  const showDeleteConfirm = (classroomId) => {
    Modal.confirm({
      title: 'คุณแน่ใจหรือไม่ที่จะลบชั้นเรียนนี้?',
      okText: 'ใช่, ลบ',
      okType: 'danger',
      cancelText: 'ยกเลิก',
      async onOk() {
        await handleDelete(classroomId);
      },
      onCancel() {
        console.log('ยกเลิกการลบ');
      },
    });
  };

  const handleDelete = async (classroomId) => {
    try {
      await deleteClassroom(classroomId);

      notification.success({
        message: 'สำเร็จ',
        description: 'ลบข้อมูลชั้นเรียนเรียบร้อยแล้ว',
      });

      // Update the classroom list
      await fetchData();
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบชั้นเรียน:', error);
      notification.error({
        message: 'ผิดพลาด',
        description: 'ไม่สามารถลบชั้นเรียนได้',
      });
    }
  };

  const handleEditSubmit = async (classroomId, updatedValues) => {
    try {
      // Perform your update logic here
      await updateClassroom(classroomId, updatedValues);

      notification.success({
        message: 'สำเร็จ',
        description: 'อัปเดตข้อมูลชั้นเรียนเรียบร้อยแล้ว',
      });

      // Close the modal and update the classroom list
      setVisible(false);
      await fetchData();
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการแก้ไขชั้นเรียน:', error);
      notification.error({
        message: 'ผิดพลาด',
        description: 'ไม่สามารถแก้ไขชั้นเรียนได้',
      });
    }
  };
  const getColumnSearchProps = (dataIndex ,title) => ({
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
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: 'เลขห้อง',
      dataIndex: 'classroomid',
      key: 'classroomid',
      ...getColumnSearchProps('classroomid','เลขห้อง'),
    },
    {
      title: 'ชื่อชั้นเรียน',
      dataIndex: 'classname',
      key: 'classname',
      ...getColumnSearchProps('classname','ชื่อชั้นเรียน'),
    },
    {
      title: 'ปีการศึกษา',
      dataIndex: 'academic_year',
      key: 'academic_year',
      ...getColumnSearchProps('academic_year','ปีการศึกษา'),
    },
    {
      title: 'ครูประจำชั้น',
      dataIndex: 'homeroom_teacher',
      key: 'homeroom_teacher',
      ...getColumnSearchProps('homeroom_teacher','ครูประจำชั้น'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => showEditModal(record)}>แก้ไข</Button>
          <Button type="primary" danger onClick={() => showDeleteConfirm(record.classroomid)}>
            ลบ
          </Button>
        </Space>
      ),
    },
  ];


  return (
    <>
      <Table columns={columns} dataSource={classrooms} rowKey="classroomid" />

      <Modal visible={visible} title="แก้ไขข้อมูลชั้นเรียน" onCancel={handleCancel} footer={null}>
        <EditClassroomForm
          initialValues={initialValues}
          onCancel={handleCancel}
          onSubmit={handleEditSubmit} 
        />
      </Modal>
    </>
  );
};

export default ClassroomList;
