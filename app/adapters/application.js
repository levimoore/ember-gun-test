import DS from 'ember-data';
import Ember from 'ember';
import Gun from 'npm:gun';
import R from 'npm:ramda';
import RSVP from 'rsvp';
import { pluralize } from 'ember-inflector';

let gun = Gun();

export default DS.Adapter.extend({
	findRecord(store, type, id, snapshot) {
		return new RSVP.Promise(function(resolve, reject){
			gun.get(`${id}`).val(function(data){
				resolve(data);
			});
		});
	},
	findAll(store, type /*, sinceToken, snapshotRecordArray*/){
		let { modelName } = type;
    	let storageKeyForModelName = pluralize(modelName);
    	let arr = [];
      let emptyCheck = null;
    	return new RSVP.Promise((resolve, reject) =>{
        if(this._checkForData(storageKeyForModelName)){
          resolve([storageKeyForModelName] = []);
        } else {
      		gun.get(storageKeyForModelName).map(function(data){
      			arr.push(data);
      			console.log(data);
      			resolve(arr);
      		});
      	}
      });
	},
  createRecord(store, type, snapshot) {
    console.log("Create Record type", type);
  },
  _checkForData(key){
    return new RSVP.Promise((resolve, reject) => {
        gun.get(key).val(function(table){
        let value = Gun.obj.empty(table, '_');
        resolve(value);
      });
    });
  }
});
