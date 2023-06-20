/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let usersettings;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      usersettings = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to update username', () => {
    cy.register();
    const newUsername = 'newusername';

    settingsPage.visit();

    settingsPage.usernameInput.type(newUsername);
    settingsPage.updateSettingsBtn.click();
  });

  it('should provide an ability to update bio', () => {
    const newBio = 'This is my updated bio';

    settingsPage.bioTextarea.clear().type(newBio);
    settingsPage.updateSettingsBtn.click();
  });

  it('should provide an ability to update an email', () => {
    const newEmail = 'newemail@example.com';

    settingsPage.emailInput.clear().type(newEmail);
    settingsPage.updateSettingsBtn.click();
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'newpassword';

    settingsPage.passwordInput.clear().type(newPassword);
    settingsPage.updateSettingsBtn.click();

    cy.logout();
    cy.login(usersettings.email, newPassword);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logoutBtn.click();

    cy.url().should('include', '/login');
  });
});
