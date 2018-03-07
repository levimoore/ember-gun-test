import DS from 'ember-data';
import Ember from 'ember';
import Gun from 'npm:gun';
import then from 'npm:gun/lib/then.js'
import R from 'npm:ramda';
import RSVP from 'rsvp';
import uuid from 'npm:uuid';
import { pluralize } from 'ember-inflector';

let gun = Gun();

export default DS.Adapter.extend({
	findRecord(store, type, id, snapshot) {
		return new RSVP.Promise(function(resolve, reject){
			gun.get(`${type.modelName}`).get(`${id}`).val(function(data){
        data.id = id;
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
        if(1 === 3/*this._checkForData(storageKeyForModelName)*/){
          resolve([storageKeyForModelName] = []);
        } else {
      		gun.get(storageKeyForModelName).map().on(function(data){
      			arr.push(data);
      			console.log(data);

      			resolve(arr);
      		});
      	}
      });
	},
  createRecord(store, type, snapshot) {
    let { modelName } = type;
    let pluralModelName = pluralize(modelName);
    let modelData = this.serialize(snapshot, { includeId: true });
    var id = uuid();
    modelData.id = id;
    var record = gun.get(`${type.modelName}`).get(`${id}`).put(modelData);
    gun.get(pluralModelName).set(record);
    return modelData;
    // this._createGunRecord(type, id, modelData);
    // return new RSVP.Promise((resolve, reject) => {
    //     var record = gun.get(`${type.modelName}`).get(`${id}`).put(modelData);
    //     gun.get(pluralModelName).set(record);
    //    console.log(gun.get(`${type.modelName}`).get(`${id}`));
    //   });
  },
  _createGunRecord(type, id, modelData){
    let { modelName } = type;
    let pluralModelName = pluralize(modelName);
    var record = gun.get(`${type.modelName}`).get(`${id}`).put(modelData);
    gun.get(pluralModelName).set(record);
  },
  _checkForData(key){
    return new RSVP.Promise((resolve, reject) => {
        gun.get(key).val(function(table){
        let value = Gun.obj.empty(table, '_');
        console.log(value);
        resolve(value);
      });
    });
  }
});
