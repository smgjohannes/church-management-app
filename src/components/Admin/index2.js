import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Upload,
  message,
  Drawer,
  Card,
  Switch,
} from 'antd';
import {
  UploadOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import moment from 'moment';

const { Column } = Table;
const { Meta } = Card;

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [visiblePopupCard, setVisiblePopupCard] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/members');
      if (!response.ok) {
        throw new Error('Failed to fetch members');
      }
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values) => {
    try {
      const response = await fetch('http://localhost:3000/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error('Failed to add member');
      }
      message.success('Member added successfully!');
      setVisible(false);
      form.resetFields();
      fetchMembers(); // Fetch updated list of members
    } catch (error) {
      console.error('Error adding member:', error);
      message.error('Failed to add member.');
    }
  };

  const handleDelete = async (record) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/members/${record.id}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete member');
      }
      message.success('Member deleted successfully!');
      fetchMembers(); // Fetch updated list of members
    } catch (error) {
      console.error('Error deleting member:', error);
      message.error('Failed to delete member.');
    }
  };

  const handleView = (record) => {
    setSelectedMember(record);
    setVisiblePopupCard(true);
  };

  const filteredMembers = members.filter((member) => {
    const { id, name, surname } = member;
    const searchRegex = new RegExp(searchText, 'i');
    return (
      id.toString().match(searchRegex) ||
      name.match(searchRegex) ||
      surname.match(searchRegex)
    );
  });
  const handleToggleMembership = (value, record) => {
    // You can implement the logic to update the membership status here
    console.log(`Membership status toggled for member ${record.id}: ${value}`);
    // Assuming you have an API endpoint to update the membership status
    // You can make a fetch request to update the status
  };
  return (
    <div>
      <Input
        placeholder='Search by ID, Name, or Surname'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
      />
      <Button>
        <Link to='/member-form'>Add Member</Link>
      </Button>
      <Table dataSource={filteredMembers} rowKey='id'>
        <Column title='ID' dataIndex='id' key='id' />
        <Column title='Name' dataIndex='name' key='name' />
        <Column title='Surname' dataIndex='surname' key='surname' />
        <Column title='Age' dataIndex='age' key='age' />
        <Column title='Email' dataIndex='email' key='email' />
        <Column
          title='Date of Birth'
          dataIndex='dateOfBirth'
          key='dateOfBirth'
          render={(dateOfBirth) => moment(dateOfBirth).format('YYYY-MM-DD')}
        />
        <Column
          title='Baptised'
          dataIndex='baptised'
          key='baptised'
          render={(baptised) => moment(baptised).format('YYYY-MM-DD')}
        />
        <Column title='Member Of' dataIndex='memberOf' key='memberOf' />
        <Column
          title='Local Church'
          dataIndex='localChurch'
          key='localChurch'
        />
        <Column
          title='From Date'
          dataIndex='fromDate'
          key='fromDate'
          render={(fromDate) => moment(fromDate).format('YYYY-MM-DD')}
        />
        <Column title='Father' dataIndex='father' key='father' />
        <Column title='Mother' dataIndex='mother' key='mother' />
        <Column
          title='Membership Status'
          dataIndex='active'
          key='active'
          render={(active, record) => (
            <Switch
              checked={active}
              onChange={(value) => handleToggleMembership(value, record)}
            />
          )}
        />
        <Column
          title='Actions'
          key='actions'
          render={(text, record) => (
            <span>
              <img
                src={record.image}
                alt='Member'
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
              <Button type='link' onClick={() => handleView(record)}>
                <EyeOutlined /> View
              </Button>
              <Button type='link' onClick={() => handleDelete(record)}>
                <DeleteOutlined /> Delete
              </Button>
            </span>
          )}
        />
      </Table>
      <Modal
        title='Add Member'
        visible={visible}
        onCancel={handleCancel}
        footer={null}>
        <Form
          form={form}
          onFinish={onFinish}
          layout='vertical'
          initialValues={{ remember: true }}>
          <Form.Item name='name' label='Name' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='surname'
            label='Surname'
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='age' label='Age' rules={[{ required: true }]}>
            <Input type='number' />
          </Form.Item>
          <Form.Item name='email' label='Email' rules={[{ required: true }]}>
            <Input type='email' />
          </Form.Item>
          <Form.Item name='dateOfBirth' label='Date of Birth'>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='baptised' label='Baptised'>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='memberOf' label='Member Of'>
            <Input />
          </Form.Item>
          <Form.Item name='localChurch' label='Local Church'>
            <Input />
          </Form.Item>
          <Form.Item name='fromDate' label='From'>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='father' label='Father'>
            <Input />
          </Form.Item>
          <Form.Item name='mother' label='Mother'>
            <Input />
          </Form.Item>
          <Form.Item name='image' label='Image'>
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form>
      </Modal>
      <Drawer
        title='Member Details'
        placement='right'
        closable={false}
        onClose={() => setVisiblePopupCard(false)}
        visible={visiblePopupCard}
        width={600}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={() => setVisiblePopupCard(false)} type='primary'>
              Close
            </Button>
          </div>
        }>
        {selectedMember && (
          <Card>
            {selectedMember.image && (
              <img
                src={selectedMember.image}
                alt='Member'
                style={{ maxWidth: '100%', marginTop: '10px' }}
              />
            )}
            <Meta
              title='Name'
              description={`${selectedMember.name} ${selectedMember.surname}`}
            />
            <Meta title='Age' description={selectedMember.age} />
            <Meta title='Email' description={selectedMember.email} />
            <Meta
              title='Date of Birth'
              description={moment(selectedMember.dateOfBirth).format(
                'YYYY-MM-DD'
              )}
            />
            <Meta
              title='Baptised'
              description={moment(selectedMember.baptised).format('YYYY-MM-DD')}
            />
            <Meta title='Member Of' description={selectedMember.memberOf} />
            <Meta
              title='Local Church'
              description={selectedMember.localChurch}
            />
            <Meta
              title='From Date'
              description={moment(selectedMember.fromDate).format('YYYY-MM-DD')}
            />
            <Meta title='Father' description={selectedMember.father} />
            <Meta title='Mother' description={selectedMember.mother} />
          </Card>
        )}
      </Drawer>
    </div>
  );
};

export default MemberManagement;
