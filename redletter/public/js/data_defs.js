
var USER_DATE_FORMAT = 'd-m-Y';
var USER_TIME_FORMAT = 'H:i';
var USER_DATE_TIME_FORMAT = 'd-m-y H:i';
var USER_NICE_DATE_FORMAT = 'l, jS  F Y';
var USER_LOG_DATE_FORMAT = 'D d-m-Y H:i';

var MYSQL_DATE_FORMAT = 'Y-m-d';
var MYSQL_TIME_FORMAT = 'H:i:s';
var MYSQL_DATE_TIME_FORMAT = 'Y-m-d H:i:s';


Ext.Loader.setConfig({
	enabled: true,
	paths: {
		'RL': 'js'
		//'Ext.ux.desktop': 'desktop/js'
	}
});
		

// Account 
Ext.define('Account', {
	extend: 'Ext.data.Model',
	idProperty: 'account_id', 
	fields: [	'account_id', 'contact', 'company', 'address', 'postcode', 'tel',
				'email', 
				'admin', {name: 'active', type: 'bool'},
				'passwd_change', 'passwd'
	]
});



// Debtor ***/
Ext.define('Debtor', {
	extend: 'Ext.data.Model',
	idProperty: 'debtor_id', 
	fields: [	'debtor_id', 'contact', 'entity', 'address','postcode','tel','fax','amount'
	]
});



RLG = {}

RLG.render = {}
RLG.render.yn = function(val, meta, rec){
	return val == true ? "Y" : "-"
}
 