import DS from 'ember-data';
import uuid from 'npm:uuid';

export default DS.JSONSerializer.extend({
normalizeFindAllResponse: function(store, primaryModelClass, payload, id, requestType){ 
  let contacts = this._cleanupData(payload); 
  payload = {contacts: contacts};
  console.log("Payload: " +JSON.stringify(payload, null, 2));    
  return this._super(store, primaryModelClass, payload.contacts, id, requestType); 
},
  _cleanupData(contacts){
  	return contacts.map((contact) => {
  		console.log(contact);
  		contact.id = contact.id;
  		//delete contact._
  		return contact;
  	});
  },
});