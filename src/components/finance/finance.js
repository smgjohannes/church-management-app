import React, { useState } from 'react';
import { Table, Button } from 'antd';

const FinancePage = () => {
  const [financeData, setFinanceData] = useState([
    {
      key: '1',
      month: 'January',
      pastoralFunds: false,
      membershipCard: true,
    },
    {
      key: '2',
      month: 'February',
      pastoralFunds: true,
      membershipCard: false,
    },
    {
      key: '3',
      month: 'March',
      pastoralFunds: false,
      membershipCard: true,
    },
    {
      key: '4',
      month: 'April',
      pastoralFunds: true,
      membershipCard: true,
    },
    {
      key: '5',
      month: 'May',
      pastoralFunds: false,
      membershipCard: true,
    },
    {
      key: '6',
      month: 'June',
      pastoralFunds: true,
      membershipCard: false,
    },
    {
      key: '7',
      month: 'July',
      pastoralFunds: true,
      membershipCard: true,
    },
    {
      key: '8',
      month: 'August',
      pastoralFunds: false,
      membershipCard: true,
    },
    {
      key: '9',
      month: 'September',
      pastoralFunds: true,
      membershipCard: false,
    },
    {
      key: '10',
      month: 'October',
      pastoralFunds: true,
      membershipCard: true,
    },
    {
      key: '11',
      month: 'November',
      pastoralFunds: false,
      membershipCard: true,
    },
    {
      key: '12',
      month: 'December',
      pastoralFunds: true,
      membershipCard: false,
    },
  ]);

  const togglePaymentStatus = (record, field) => {
    const newData = [...financeData];
    const index = newData.findIndex((item) => item.key === record.key);
    if (index > -1) {
      newData[index][field] = !newData[index][field];
      setFinanceData(newData);
    }
  };

  const columns = [
    {
      title: 'Months',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Pastoral Funds',
      dataIndex: 'pastoralFunds',
      key: 'pastoralFunds',
      render: (text, record) => (
        <Button onClick={() => togglePaymentStatus(record, 'pastoralFunds')}>
          {text ? 'Paid' : 'Not Paid'}
        </Button>
      ),
    },
    {
      title: 'Membership Card',
      dataIndex: 'membershipCard',
      key: 'membershipCard',
      render: (text, record) => (
        <Button onClick={() => togglePaymentStatus(record, 'membershipCard')}>
          {text ? 'Paid' : 'Not Paid'}
        </Button>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>Finance Page</h1>
      <h2> Michael Johnson</h2>
      <Table columns={columns} dataSource={financeData} />
    </div>
  );
};

export default FinancePage;
