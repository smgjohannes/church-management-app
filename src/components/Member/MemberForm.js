import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, DatePicker, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './MemberForm.css';

const MemberForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      formData.append('image', fileList[0]?.originFileObj);

      await axios.post('/api/members', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Clear form fields after successful submission
      form.resetFields();
      setFileList([]);
      message.success('Member details saved successfully!');
    } catch (error) {
      console.error('Error saving member details:', error);
      message.error('Failed to save member details.');
    }
  };

  const onFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <div>
      <h2>Add New Member</h2>
      <div className="form_MainContainer" style={{ maxWidth: '700px' }}>
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
              fileList={fileList}
              beforeUpload={() => false}
              onChange={onFileChange}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default MemberForm;
