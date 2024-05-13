/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
    * Converts the provided string to camelCase expression.
    * @example cy.toCamelCase('hello world').should('eq', 'helloWorld')
    */
    toCamelCase(phrase: string): Chainable<string>

    /**
    * Allows to type empty string, like mulitple spaces, which is forbidden by cy.type() command
    * @example cy.forceType('    ')
    */
    forceType(phrase: string): Chainable<JQuery<HTMLElement>>

    /**
    * Finds an element using custom "data-testid" attribute
    * @example cy.getTestId('login')
    */
    getByTestId(elementID: string): Chainable<JQuery<HTMLElement>>

    /**
    * Allows to quickly close the dialogs like the Hot Features
    * or Transactions tests.
    */
    manageDialog(operation: string): Cypress.Chainable<JQuery<HTMLElement>>
  }
}
