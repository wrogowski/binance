import { Dialogs } from "../pages/components/dialogs";
Cypress.Commands.add('toCamelCase', (phrase: any) =>
  phrase.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
    index === 0 ? word.toLowerCase() : word.toUpperCase()
  ).replace(/\s+/g, '')
);

Cypress.Commands.add('forceType', { prevSubject: true }, (subject: Cypress.Chainable<JQuery<HTMLElement>>, text: string) => {
  return cy.wrap(subject).invoke('val', text);
});

Cypress.Commands.add('getByTestId', (elementID: string) => cy.get(`[data-testid="${elementID}"]`));

Cypress.Commands.add('manageDialog', (operation: 'close' | 'confirm' | 'cancel') => {
  const dialog = new Dialogs();

  dialog[`${operation}Button`]().click().then(() =>
    dialog.body().should('not.exist')
  );
});
