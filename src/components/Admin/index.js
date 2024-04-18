import React, { useState } from 'react';
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
} from 'antd';
import {
  UploadOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import moment from 'moment';

const { Meta } = Card;

const initialMembers = [
  {
    id: 1,
    name: 'John',
    surname: 'Doe',
    age: 30,
    email: 'john@example.com',
    dateOfBirth: moment('2010-05-20'),
    baptised: moment('2010-05-20'),
    memberOf: 'Church A',
    localChurch: 'Local Church A',
    fromDate: moment('2010-05-20'),
    father: 'Father Doe',
    mother: 'Mother Doe',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv8EUXVcfhh9AaGOZ-ZYi80CELzk4x1cS_qQ&usqp=CAU',
  },
  {
    id: 2,
    name: 'Jane',
    surname: 'Smith',
    age: 28,
    email: 'jane@example.com',
    dateOfBirth: moment('2010-05-20'),
    baptised: moment('2010-05-20'),
    memberOf: 'Church B',
    localChurch: 'Local Church B',
    fromDate: moment('2010-05-20'),
    father: 'Father Smith',
    mother: 'Mother Smith',
    image:
      'https://st.depositphotos.com/2931363/3703/i/450/depositphotos_37034497-stock-photo-young-black-man-smiling-at.jpg',
  },
  {
    id: 3,
    name: 'Michael',
    surname: 'Johnson',
    age: 35,
    email: 'michael@example.com',
    dateOfBirth: moment('2010-05-20'),
    baptised: moment('2010-05-20'),
    memberOf: 'Church C',
    localChurch: 'Local Church C',
    fromDate: moment('2010-05-20'),
    father: 'Father Johnson',
    mother: 'Mother Johnson',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv8EUXVcfhh9AaGOZ-ZYi80CELzk4x1cS_qQ&usqp=CAU',
  },
  {
    id: 4,
    name: 'Emily',
    surname: 'Brown',
    age: 25,
    email: 'emily@example.com',
    dateOfBirth: moment('2010-05-20'),
    baptised: moment('2010-05-20'),
    memberOf: 'Church D',
    localChurch: 'Local Church D',
    fromDate: moment('2010-05-20'),
    father: 'Father Brown',
    mother: 'Mother Brown',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv8EUXVcfhh9AaGOZ-ZYi80CELzk4x1cS_qQ&usqp=CAU',
  },
  {
    id: 5,
    name: 'William',
    surname: 'Taylor',
    age: 40,
    email: 'william@example.com',
    dateOfBirth: moment('2010-05-20'),
    baptised: moment('2010-05-20'),
    memberOf: 'Church E',
    localChurch: 'Local Church E',
    fromDate: moment('2010-05-20'),
    father: 'Father Taylor',
    mother: 'Mother Taylor',
    image:
      'https://st.depositphotos.com/2931363/3703/i/450/depositphotos_37034497-stock-photo-young-black-man-smiling-at.jpg/50',
  },
];

const { Column } = Table;

const MemberManagement = () => {
  const [members, setMembers] = useState(initialMembers);
  const [visible, setVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [visiblePopupCard, setVisiblePopupCard] = useState(false);
  const [form] = Form.useForm();
  const [editData, setEditData] = useState(null);

  const showModal = () => {
    setVisible(true);
    setEditData(null);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    // Check if the dateOfBirth and baptised fields are defined
    if (values.dateOfBirth && values.baptised) {
      if (editData) {
        const updatedMembers = members.map((member) =>
          member.id === editData.id ? { ...member, ...values } : member
        );
        setMembers(updatedMembers);
        setEditData(null);
        message.success('Member updated successfully!');
      } else {
        // Generate a unique ID for the new member
        const newMember = { ...values, id: members.length + 1 };
        setMembers([...members, newMember]);
        message.success('Member added successfully!');
      }
      form.resetFields();
      setVisible(false);
    } else {
      message.error('Please select both date of birth and baptised date.');
    }
  };

  const handleDelete = (record) => {
    setMembers(members.filter((m) => m.id !== record.id));
    message.success('Member deleted successfully!');
  };
  const handleEdit = (record) => {
    setEditData(record);
    form.setFieldsValue(record);
    setVisible(true);
  };
  const onFileChange = (info) => {
    const fileList = [...info.fileList];
    // Handle file changes here if needed
  };

  const handleView = (record) => {
    setSelectedMember(record);
    setVisiblePopupCard(true);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Member
      </Button>
      <Table dataSource={members} rowKey="id">
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Surname" dataIndex="surname" key="surname" />
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column
          title="Date of Birth"
          dataIndex="dateOfBirth"
          key="dateOfBirth"
          render={(dateOfBirth) => moment(dateOfBirth).format('YYYY-MM-DD')}
        />
        <Column
          title="Baptised"
          dataIndex="baptised"
          key="baptised"
          render={(baptised) => moment(baptised).format('YYYY-MM-DD')}
        />
        <Column title="Member Of" dataIndex="memberOf" key="memberOf" />
        <Column
          title="Local Church"
          dataIndex="localChurch"
          key="localChurch"
        />
        <Column
          title="From Date"
          dataIndex="fromDate"
          key="fromDate"
          render={(fromDate) => moment(fromDate).format('YYYY-MM-DD')}
        />
        <Column title="Father" dataIndex="father" key="father" />
        <Column title="Mother" dataIndex="mother" key="mother" />
        <Column
          title="Image"
          key="image"
          render={(text, record) => (
            <img
              src={record.image}
              alt="member"
              style={{ width: '50px', height: '50px' }}
            />
          )}
        />
        <Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <span>
              <Button type="link" onClick={() => handleView(record)}>
                <EyeOutlined /> View
              </Button>
              <Button type="link" onClick={() => handleEdit(record)}>
                <EditOutlined /> Edit
              </Button>
              <Button type="link" onClick={() => handleDelete(record)}>
                <DeleteOutlined />
                Delete
              </Button>
            </span>
          )}
        />
      </Table>
      <Drawer
        title="Member Details"
        placement="right"
        closable={false}
        onClose={() => setVisiblePopupCard(false)}
        visible={visiblePopupCard}
        width={600}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={() => setVisiblePopupCard(false)} type="primary">
              Close
            </Button>
          </div>
        }
      >
        {selectedMember && (
          <Card>
            <Button type="primary" style={{ marginBottom: '16px' }}>
              Payments
            </Button>
            <Meta
              title="Name"
              description={`${selectedMember.name} ${selectedMember.surname}`}
            />
            <Meta
              title="Image"
              description={
                <img
                  src={selectedMember.image}
                  alt="Member"
                  style={{ maxWidth: '100%' }}
                />
              }
            />
            <Meta title="Age" description={selectedMember.age} />
            <Meta title="Email" description={selectedMember.email} />

            <Meta
              title="Date of Birth"
              description={moment(selectedMember.dateOfBirth).format(
                'YYYY-MM-DD'
              )}
            />
            <Meta
              title="Baptised"
              description={moment(selectedMember.baptised).format('YYYY-MM-DD')}
            />
            <Meta title="Member Of" description={selectedMember.memberOf} />
            <Meta
              title="Local Church"
              description={selectedMember.localChurch}
            />
            <Meta
              title="Since"
              description={moment(selectedMember.fromDate).format('YYYY-MM-DD')}
            />
            <Meta title="Father" description={selectedMember.father} />
            <Meta title="Mother" description={selectedMember.mother} />
          </Card>
        )}
      </Drawer>
      <Modal
        title="Add Member"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ remember: true }}
        >
          <Form.Item name="id" label="Id" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="surname"
            label="Surname"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item name="dateOfBirth" label="Date of Birth">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="baptised" label="Baptised">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="memberOf" label="Member Of">
            <Input />
          </Form.Item>
          <Form.Item name="localChurch" label="Local Church">
            <Input />
          </Form.Item>
          <Form.Item name="fromDate" label="From">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="father" label="Father">
            <Input />
          </Form.Item>
          <Form.Item name="mother" label="Mother">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Upload
              beforeUpload={() => false}
              onChange={onFileChange}
              maxCount={1}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default MemberManagement;
