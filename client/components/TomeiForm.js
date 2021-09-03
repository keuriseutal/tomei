import { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import styles from '../styles/TomeiForm.module.css';

import { connect } from 'react-redux';
import { getUserAccount } from '../redux/actions/userAccountActions';

const TomeiForm = ({ title, message, formDetails, setFormDetails, error, setError, user, getUserAccount }) => {

  const [avatar, setAvatar] = useState("");

  const onUploadAvatar = (event) => {
    const file = event.target.files[0];

    if(!file.type.startsWith("image")) {
      setError({...error, avatar: "File must be an image"});
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      // set avatar to show
      setAvatar(e.target.result);

      // set avatar to upload
      let formData = new FormData();
      formData.append("avatar", event.target.files[0]);

      setFormDetails({...formDetails, avatar: formData});      
    };
    reader.readAsDataURL(event.target.files[0]);
    setError({...error, avatar: ""});

  };

  const onChangeFieldValue = (event) => {
    setFormDetails({ ...formDetails, [event.target.name]: event.target.value });
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
            <Avatar className={styles.avatar} alt="Avatar" src={`${avatar === "" ? '/Avatar.png' : avatar}`} />
            <label>
              <input type="file" onChange={onUploadAvatar} />
              Upload
            </label>
            {error.avatar !== "" && <p className="help is-danger">{error.avatar}</p>}
          </div>
        </div>
        <div className="column is-two-fifths">
          <div className="field">
            <label className={`label ${error.name !== "" && styles.error} ${styles.label}`}>Name
              {error.name !== "" && <span className="icon is-small pl-4">
                <i className={`fas fa-exclamation-triangle ${styles.errorIcon}`}></i> 
              </span>}
            </label>
            <div className={`control ${styles.controlInput}`}>
              <input className={`input ${error.name !== "" && "is-danger"}`} type="text" name="name" onChange={onChangeFieldValue} placeholder={error.name} />
            </div>
          </div>
          <div className="field">
            <label className={`label ${error.password !== "" && styles.error} ${styles.label}`}>Password
              {error.password !== "" && <span className="icon is-small pl-4">
                <i className={`fas fa-exclamation-triangle ${styles.errorIcon}`}></i>
              </span>}
            </label>
            <div className={`control ${styles.controlInput}`}>
              <input className={`input ${error.password !== "" && "is-danger"}`} type="password" name="password" onChange={onChangeFieldValue} placeholder={error.password} />
            </div>
          </div>
        </div>
        <div className="column is-two-fifths">
          <div className="field">
            <label className={`label ${error.email !== "" && styles.error} ${styles.label}`}>Email
              {error.email !== "" && <span className="icon is-small pl-4">
                <i className={`fas fa-exclamation-triangle ${styles.errorIcon}`}></i>
              </span>}
            </label>
            <div className={`control ${styles.controlInput}`}>
              <input className={`input ${error.email !== "" && "is-danger"}`} type="text" name="email" onChange={onChangeFieldValue} placeholder={error.email} />
            </div>
          </div>
          <div className="field">
            <label className={`label ${error.confirmPassword !== "" && styles.error} ${styles.label}`}>Confirm Password
            {error.confirmPassword !== "" && <span className="icon is-small pl-4">
                <i className={`fas fa-exclamation-triangle ${styles.errorIcon}`}></i>
              </span>}
            </label>
            <div className={`control ${styles.controlInput}`}>
              <input className={`input ${error.confirmPassword !== "" && "is-danger"}`} type="password" name="confirmPassword" onChange={onChangeFieldValue} placeholder={error.confirmPassword} />
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionToProps = {
  getUserAccount,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(TomeiForm);