import React, { useState, useEffect } from 'react';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Member List</h2>
      <input
        type='text'
        placeholder='Search members...'
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Baptised</th>
            <th>Member Of</th>
            <th>Local Church</th>
            <th>From</th>
            <th>Father</th>
            <th>Mother</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.surname}</td>
              <td>{member.age}</td>
              <td>{member.email}</td>
              <td>{member.dateOfBirth}</td>
              <td>{member.baptised}</td>
              <td>{member.memberOf}</td>
              <td>{member.localChurch}</td>
              <td>{member.from}</td>
              <td>{member.father}</td>
              <td>{member.mother}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
