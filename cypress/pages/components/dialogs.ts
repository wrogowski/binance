export class Dialogs {
  body = () => cy.get('div.style-dialog-body');
  closeButton = () => this.body().siblings().first().find('svg');
  confirmButton = () => cy.contains('button', 'Confirm');
  cancelButton = () => cy.contains('button', 'Cancel');
}