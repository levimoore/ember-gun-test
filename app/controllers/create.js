import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    createContact(){
      let firstName = this.get('firstName');
      let lastName = this.get('lastName');
      let email = this.get('email');
      let phoneNumber = this.get('phoneNumber');
      this.store.createRecord('contact', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber
      });
    }
  }
});
