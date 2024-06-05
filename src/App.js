import React from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StudentsPage from './Page/StudentPage';
import ClassroomsPage from './Page/ClassroomPage';


const { Header, Content, Footer } = Layout;

const App = () => (
  <Router>
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/">Students</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/classrooms">Classrooms</Link>
          </Menu.Item>
          {/* <Menu.Item key="3">
            <Link to="/Student-manage">Student Management</Link>
          </Menu.Item> */}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Routes>
            <Route exact path="/" element={<StudentsPage />} />
            <Route path="/classrooms" element={<ClassroomsPage />} />
            {/* <Route path="/Student-manage" element={<StudentManagementPage />} /> */}
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>School Management System ©2024</Footer>
    </Layout>
  </Router>
);

export default App;
