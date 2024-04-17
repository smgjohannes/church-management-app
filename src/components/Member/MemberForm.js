import React, { useState } from 'react';
import axios from 'axios';
import './MemberForm.css';

function MemberForm() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('name', name);
      formData.append('surname', surname);
      formData.append('age', age);
      formData.append('email', email);
      formData.append('image', image);
      formData.append(
        'dateOfBirth',
        document.getElementById('dateOfBirth').value
      );
      formData.append('baptised', document.getElementById('baptised').value);
      formData.append('memberOf', document.getElementById('memberOf').value);
      formData.append(
        'localChurch',
        document.getElementById('localChurch').value
      );
      formData.append('fromDate', document.getElementById('fromDate').value);
      formData.append('father', document.getElementById('father').value);
      formData.append('mother', document.getElementById('mother').value);

      await axios.post('/api/members', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Clear form fields after successful submission
      setId('');
      setName('');
      setSurname('');
      setAge('');
      setEmail('');
      setImage(null);
    } catch (error) {
      console.error('Error saving member details:', error);
    }
  };
  return (
    <div>
      <h2>Add New Member</h2>
      <div className='form_MAinContainer'>
        <form className='form_MainContainer' onSubmit={handleSubmit}>
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='id'>Id:</label>
              <input
                type='number'
                id='id'
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='surname'>Surname:</label>
              <input
                type='text'
                id='surname'
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='age'>Age:</label>
              <input
                type='number'
                id='age'
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='email'>Email:</label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='image'>Image:</label>
              <input
                type='file'
                id='image'
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='dateOfBirth'>Date of Birth:</label>
              <input type='date' id='dateOfBirth' />
            </div>
            <div className='form-group'>
              <label htmlFor='baptised'>Baptised:</label>
              <input type='date' id='baptised' />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='memberOf'>Member Of:</label>
              <input type='text' id='memberOf' />
            </div>
            <div className='form-group'>
              <label htmlFor='localChurch'>Local Church:</label>
              <input type='text' id='localChurch' />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='fromDate'>From:</label>
              <input type='date' id='fromDate' />
            </div>
            <div className='form-group'>
              <label htmlFor='father'>Father:</label>
              <input type='text' id='father' />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='mother'>Mother:</label>
              <input type='text' id='mother' />
            </div>
          </div>
          <div className='centerButton'>
            <button className='submitButton' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MemberForm;
