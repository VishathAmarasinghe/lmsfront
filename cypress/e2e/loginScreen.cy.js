describe('Login Functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login form', () => {
    cy.get('input[name="userName_Email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.contains('Login').should('exist');
  });

  it('should display validation error for empty fields', () => {
    cy.get('button[type="button"]').contains('Login').click();

    cy.get('.ant-message-notice-content',{timeout:20000}).should('contain', 'Validation Error. Please enter your details');

  });

  it('should display validation error for invalid credentials', () => {
    cy.get('input[name="userName_Email"]').type('invalidusername');
    cy.get('input[name="password"]').type('invalidpassword');
    cy.get('button[type="button"]').contains('Login').click();
    cy.get('.ant-notification')
  });

  it('should log in with correct credentials', () => {
    cy.get('input[name="userName_Email"]').type('teach');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="button"]').contains('Login').click();
    cy.url().should('not.include', '/login'); 
    cy.contains('Welcome').should('exist');
  });

  it('should remember user after successful login', () => {
    cy.get('input[name="userName_Email"]').type('teach');
    cy.get('input[name="password"]').type('123');
    cy.contains('Remember Me').click();
    cy.get('button[type="button"]').contains('Login').click();

    cy.clearLocalStorage();

    cy.visit('http://localhost:5173/');
    cy.contains('Welcome').should('exist');
  });

  it('should redirect to forgot password Model', () => {
    cy.contains('Forgot Password').click();
    cy.get(".ant-modal-root").get(".ant-input")

  });

  it('enter wrong email in forget model and has error', () => {
    cy.contains('Forgot Password').click();
    cy.get(".ant-modal-root").get(".ant-input").type("hello")
    cy.get(".ant-form-item-explain-error").should("contain","Email is not valid or exceeds 254 characters")
    cy.contains("Reset Password").should("be.disabled")
    


  })

  it('enter correct email in forget model and no error ', () => {
    cy.contains('Forgot Password').click();
    cy.get(".ant-modal-root").get(".ant-input").type("hello@gmail.com")
    cy.get(".ant-form-item-explain-error").should("contain","")
    cy.contains("Reset Password").should("not.disabled")
    cy.contains("Reset Password").click()


  })

  it('Teacher can login with correct credentials', () => {
    cy.get('input[name="userName_Email"]').type('teach');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="button"]').contains('Login').click();

    cy.url("http://localhost:5173/").should("contain","http://localhost:5173/")
    cy.get(".ant-layout-header").should("contain","teacher")
    cy.get(".ant-avatar").click()
    cy.get(".MuiButtonBase-root").contains("Logout").click()
    cy.url("http://localhost:5173/login").should("contain","http://localhost:5173/login")


  });


  it('staff can login with correct credentials', () => {
    cy.get('input[name="userName_Email"]').type('pathumUS3');
    cy.get('input[name="password"]').type('1234');
    cy.get('button[type="button"]').contains('Login').click();

    cy.url("http://localhost:5173/").should("contain","http://localhost:5173/")
    cy.get(".ant-layout-header").should("contain","staff")
    cy.get(".ant-avatar").click()
    cy.get(".MuiButtonBase-root").contains("Logout").click()
    cy.url("http://localhost:5173/login").should("contain","http://localhost:5173/login")


  });

  it('student can login with correct credentials', () => {
    cy.get('input[name="userName_Email"]').type('student');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="button"]').contains('Login').click();

    cy.url("http://localhost:5173/").should("contain","http://localhost:5173/")
    cy.get(".ant-layout-header").should("contain","student")
    cy.get(".ant-avatar").click()
    cy.get(".MuiButtonBase-root").contains("Logout").click()
    cy.url("http://localhost:5173/login").should("contain","http://localhost:5173/login")


  });

  it('owner can login with correct credentials', () => {
    cy.get('input[name="userName_Email"]').type('rakitha');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="button"]').contains('Login').click();

    cy.url("http://localhost:5173/").should("contain","http://localhost:5173/")
    cy.get(".ant-layout-header").should("contain","owner")
    cy.get(".ant-avatar").click()
    cy.get(".MuiButtonBase-root").contains("Logout").click()
    cy.url("http://localhost:5173/login").should("contain","http://localhost:5173/login")


  });

  it('Teacher can login with correct credentials', () => {
    cy.get('input[name="userName_Email"]').type('parent');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="button"]').contains('Login').click();

    cy.url("http://localhost:5173/").should("contain","http://localhost:5173/")
    cy.get(".ant-layout-header").should("contain","parent")
    cy.get(".ant-avatar").click()
    cy.get(".MuiButtonBase-root").contains("Logout").click()
    cy.url("http://localhost:5173/login").should("contain","http://localhost:5173/login")


  });




});
