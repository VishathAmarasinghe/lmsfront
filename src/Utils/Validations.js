// Validate first name and last name
function validateName(name) {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(name) && validateAddress(name);
}

// Validate address
function validateAddress(address) {
  return address.trim() !== "";
}

// Validate email
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validate school
function validateSchool(school) {
  return school.trim() !== "";
}

// Validate phone number
function validatePhone(phone) {
  const regex = /^\d{10}$/;
  return regex.test(phone);
}

function PerformValidations(
  formData,
  setErrorValidator,
  errorValidator,
  currentValue
) {
  const errors = {};
  let errorStatus = false;

  if (currentValue == 0) {
    if (!validateName(formData.student.firstName)) {
      errors.studentFirstName =
        "First name should only contain letters and cannot be empty.";
      errorStatus = true;
    }
    if (!validateName(formData.student.lastName)) {
      errors.studentLastName =
        "Last name should only contain letters and cannot be empty.";
      errorStatus = true;
    }
    if (!validateAddress(formData.student.address)) {
      errors.address = "Address cannot be empty.";
      errorStatus = true;
    }
    if (!validateEmail(formData.student.email)) {
      errors.stuEmail = "Email should be in standard email format.";
      errorStatus = true;
    }
    if (!validateSchool(formData.student.school)) {
      errors.school = "School cannot be empty.";
      errorStatus = true;
    }
    if (!validatePhone(formData.student.phoneNo)) {
      errors.stuPhoneNo = "Phone number should contain only 10 numbers.";
      errorStatus = true;
    }
  }else if (currentValue==1) {
    if (!validateName(formData.parent.firstName)) {
        errors.gardientName =
          "Last name should only contain letters and cannot be empty.";
        errorStatus = true;
      }
      if (!validateAddress(formData.parent.NIC)) {
        errors.gardientNIC = "NIC cannot be empty.";
        errorStatus = true;
      }
      if (!validateEmail(formData.parent.email)) {
        errors.gardientEmail = "Email should be in standard email format.";
        errorStatus = true;
      }
      if (!validatePhone(formData.parent.phoneNo)) {
        errors.gardientPhoneNo = "Phone number should contain only 10 numbers.";
        errorStatus = true;
      }
  }

  

  console.log("error containeri ", errors);
  setErrorValidator(errors);
  return errorStatus;
}

export default PerformValidations;

