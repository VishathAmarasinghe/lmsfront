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

export function validateBarcode(barcode) {
  if (typeof barcode !== "string") {
    return false; // Barcode is invalid
  }
  const pattern = /^\d{10}$/;
  if (pattern.test(barcode) && barcode.length === 10) {
    return true; // Barcode is valid
  } else {
    return false; // Barcode is invalid
  }
}

export const getMonthName = (monthNumber) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  monthNumber = Math.max(1, Math.min(12, monthNumber));

  return months[monthNumber - 1];
};

export function formatBarcode(barcode) {
  const numericPart = barcode?.match(/\d+/);

  if (!numericPart) {
    return undefined;
  }

  const formattedNumericPart = numericPart[0].padStart(5, "0");

  return formattedNumericPart;
}

const loginValidation = (loginData, setLoginErrorValidation) => {
  const loginErrors = {};
  let errorStatus = false;
  if (!validateAddress(loginData.userName_Email)) {
    loginErrors.userNameValidation = "UserName cannot be empty.";
    errorStatus = true;
  }
  if (!validateAddress(loginData.password)) {
    loginErrors.passwordValidation = "Password cannot be empty.";
    errorStatus = true;
  }
  setLoginErrorValidation(loginErrors);
  return errorStatus;
};

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
  } else if (currentValue == 1) {
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

const firstNameLastNameValidation = (name) => {
  const nameRegex = /^[a-zA-Z.\s]+$/;

  if (!nameRegex.test(name) || name?.length > 20) {
    return "Name must contain only letters and be characters <=20";
  }

  return "";
};

const addressValidation = (address) => {
  const addressRegex = /^[a-zA-Z0-9\s\.,#\-:]+$/;

  if (!addressRegex.test(address)) {
    return "Address is not valid or exceeds 100 characters";
  }

  return "";
};

const emailValidation = (email) => {
  console.log("email value is  ", email);

  if (email != "" && email != undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email) || email?.length > 254) {
      return "Email is not valid or exceeds 254 characters";
    }
  }

  return "";
};

const stringValidation = (inputString) => {
  const stringRegex = /^[a-zA-Z\s]*$/;

  if (!stringRegex.test(inputString)) {
    return "Cannot contain numbers or symbols";
  }

  return "";
};

const hallNameValidation = (hallname) => {
  if (hallname != "" && hallname != undefined) {
    if (hallname?.length > 40) {
      return "Hall name can have maximum 40 characters";
    }
  }
  return "";
};

const phoneNumberValidation = (phoneNumber) => {
  const phoneRegex = /^0\d{9}$/;
  console.log("incoming phone no ", phoneNumber);

  if (phoneNumber != "" && phoneNumber != undefined) {
    if (!phoneRegex.test(phoneNumber)) {
      return "Phone number must contain 10 digits";
    }
  }
  return "";
};

const salaryValidation = (salary) => {
  if (salary != undefined || salary != "") {
    if (isNaN(salary)) {
      return "Input must be a number";
    }
    if (salary < 0) {
      return "Input cannot be negative";
    }
  }
  return "";
};

const validateNIC = (nic) => {
  const nicRegex = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;

  if (nic != "" && nic != undefined) {
    if (!nicRegex.test(nic)) {
      return "NIC must in the correct format";
    }
  }

  return "";
};

const email_SMS_CredentialtemplateValidation = (templateString) => {
  const usernameRegex = /{{\s*username\s*}}/i;
  const passwordRegex = /{{\s*password\s*}}/i;
  const urlRegex = /{{\s*url\s*}}/i;

  if (!usernameRegex.test(templateString)) {
    return "Template is missing {{username}} placeholder.";
  }

  if (!passwordRegex.test(templateString)) {
    return "Template is missing {{password}} placeholder.";
  }

  if (!urlRegex.test(templateString)) {
    return "Template is missing {{URL}} placeholder.";
  }

  return null;
};

const stringEmptyValidation = (stringValue) => {
  if (!stringValue || stringValue.trim().length === 0) {
    return "String is empty or contains only whitespace";
  } else {
    return "";
  }
};

export {
  stringEmptyValidation,
  email_SMS_CredentialtemplateValidation,
  hallNameValidation,
  salaryValidation,
  PerformValidations,
  loginValidation,
  firstNameLastNameValidation,
  addressValidation,
  emailValidation,
  stringValidation,
  phoneNumberValidation,
  validateNIC,
};
