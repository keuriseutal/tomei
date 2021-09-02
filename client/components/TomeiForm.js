import { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import styles from '../styles/TomeiForm.module.css';

import { connect } from 'react-redux';
import { getUserAccounts } from '../redux/actions/userAccountActions';

const TomeiForm = ({ title, message, userAccount, getUserAccounts }) => {

  const { userAccounts } = userAccount;

  useEffect(() => {
    getUserAccounts();
  }, [])

  useEffect(() => {
    console.log(userAccounts);
  }, [userAccounts])

  const [avatar, setAvatar] = useState('/Avatar.png');

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
  };

  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      'myFile',
      this.state.selectedFile,
      this.state.selectedFile.name,
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    //upload
    setAvatar('');
  };

  return (
    <>
      <div className={`columns ${styles.title}`}>
        {title}
      </div>
      <div className={`columns ${styles.message}`}>
        {message}
      </div>
      {message &&
      <div className="columns px-6">
        <div className="column">
          <div className={styles.avatarContainer}>
            <Avatar className={styles.avatar} alt="Avatar" src={avatar} />
            <label>
              <input type="file" onChange={onFileChange} />
              Upload
            </label>
          </div>
        </div>
        <div className="column is-two-fifths">
          <div className="field">
            <label className={`label ${styles.label}`}>Name</label>
            <div className={`control ${styles.controlInput}`}>
              <input className="input" type="text" />
            </div>
          </div>
          <div className="field">
            <label className={`label ${styles.label}`}>Password</label>
            <div className={`control ${styles.controlInput}`}>
              <input className="input" type="password" />
            </div>
          </div>
        </div>
        <div className="column is-two-fifths">
          <div className="field">
            <label className={`label ${styles.label}`}>Email</label>
            <div className={`control ${styles.controlInput}`}>
              <input className="input" type="text" />
            </div>
          </div>
          <div className="field">
            <label className={`label ${styles.label}`}>Confirm Password</label>
            <div className={`control ${styles.controlInput}`}>
              <input className="input" type="password" />
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
};

const mapStateToProps = (state) => ({
  userAccount: state.userAccount,
});

const mapActionToProps = {
  getUserAccounts,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(TomeiForm);
