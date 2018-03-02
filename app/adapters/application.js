import DS from 'ember-data';
import Ember from 'ember';
import Gun from 'npm:gun';
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
    	return new RSVP.Promise(function(resolve, reject) {
    		gun.get(storageKeyForModelName).map(function(data){
    			arr.push(data);
    			//console.log(JSON.stringify(arr));
    			resolve(arr);
    		});
    	});
	},
});
