import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MemberForm.css';

function MemberForm() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [baptised, setBaptised] = useState('');
  const [memberOf, setMemberOf] = useState('');
  const [localChurch, setLocalChurch] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('age', age);
    formData.append('email', email);
    formData.append('image', image);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('baptised', baptised);
    formData.append('memberOf', memberOf);
    formData.append('localChurch', localChurch);
    formData.append('fromDate', fromDate);
    formData.append('father', father);
    formData.append('mother', mother);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/members',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        console.log('Member added successfully');
        setUploadSuccess(true);
        // Reset all fields after successful submission
        setId('');
        setName('');
        setSurname('');
        setAge('');
        setEmail('');
        setImage(null);
        setDateOfBirth('');
        setBaptised('');
        setMemberOf('');
        setLocalChurch('');
        setFromDate('');
        setFather('');
        setMother('');
      } else {
        console.error('Error adding member:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    if (uploadSuccess) {
      const timer = setTimeout(() => {
        setUploadSuccess(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [uploadSuccess]);

  return (
    <div className='AdminContainer'>
      <h1>Add New Member</h1>
      <form onSubmit={handleSubmit} className='form-container'>
        <label>Id:</label>
        <input
          type='number'
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <label>Name:</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Surname:</label>
        <input
          type='text'
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <label>Age:</label>
        <input
          type='number'
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Image:</label>
        <input
          type='file'
          accept='image/*'
          name='image'
          onChange={handleImageChange}
          required
        />
        <label>Date of Birth:</label>
        <input
          type='date'
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <label>Baptised:</label>
        <input
          type='date'
          value={baptised}
          onChange={(e) => setBaptised(e.target.value)}
        />
        <label>Member Of:</label>
        <input
          type='text'
          value={memberOf}
          onChange={(e) => setMemberOf(e.target.value)}
        />
        <label>Local Church:</label>
        <input
          type='text'
          value={localChurch}
          onChange={(e) => setLocalChurch(e.target.value)}
        />
        <label>From:</label>
        <input
          type='date'
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <label>Father:</label>
        <input
          type='text'
          value={father}
          onChange={(e) => setFather(e.target.value)}
        />
        <label>Mother:</label>
        <input
          type='text'
          value={mother}
          onChange={(e) => setMother(e.target.value)}
        />
        <button className='submitButton' type='submit'>
          Submit
        </button>
      </form>
      {uploadSuccess && (
        <p className='success-message'>Member added successfully!</p>
      )}
    </div>
  );
}

export default MemberForm;
