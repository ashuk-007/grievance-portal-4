const validate = (values) => {
  const errors = {};
  /* validating first name */
  if (!values.firstName) {
    errors.firstName = "First name is required";
  } else if (values.firstName.length < 1) {
    errors.firstName = "Invalid First name";
  } else {
    errors.firstName = "Nice first name 😃";
  }

  /* validating last name */
  if (!values.lastName) {
    errors.lastName = "Last name is required";
  } else if (values.lastName.length < 1) {
    errors.lastName = "Invalid Last name";
  } else {
    errors.lastName = "Awesome last name 😁";
  }

  /* validating email using regex to pass email */
  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  /* validating passwords */
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length <= 6) {
    errors.password = "Password length is weak 😩";
  } else {
    errors.password = "Password strength is ok 💪";
  }

  /* validating password verification with initial */
  if (!values.Vpassword) {
    errors.Vpassword = "Invalid password verification";
  } else if (values.Vpassword !== values.password) {
    errors.Vpassword = "Passwords don't match 😟";
  } else {
    errors.Vpassword = "Passwords match 👏";
  }

  return errors;
};

export default validate;
