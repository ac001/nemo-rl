

Ext.define('RL.AccountDialog', {
	extend: 'Ext.window.Window',
	
	requires: [
        //'G2.JobBatchWindow'
    ],

	initComponent: function(){
        
		Ext.apply(this, {
			
			title: this.account_id == 0 ? 'New Account' : 'Edit Account',
			kkheight: 200,
			width: 400,
			layout: 'fit',
			items: [
				this.create_form()
			]
		}); // apply
		this.callParent();
		//alert(this.account_id);
		if(this.account_id > 0){
			this.frm.load({waitTitle: "Loading"});
			
		}
		
	},
	
	create_form: function (){
		
		this.frm = 	Ext.create('Ext.form.Panel', 
		{
			bodyPadding:20,
			frame: true,
			waitMsgTarget: true,
			layout: 'anchor',
			defaults: {
				anchor: '100%',
				labelAlign: 'right',
				labelWidth: 120
			},
			url: '/api/account/' + this.account_id,
			method: 'GET',
			reader: Ext.create('Ext.data.reader.Json', {
				type: 'json',
				model: 'Account',
				root: 'account'
					   
			}),
			defaultType: 'textfield',
			items: [
				{fieldLabel: 'Email', name: 'email', required: true},
				{fieldLabel: 'Contact Name', name: 'contact'},
				{fieldLabel: 'Company', name: 'company', required: true},
				{fieldLabel: 'Address', name: 'address', xtype: "textarea", required: true},
				{fieldLabel: 'Postcode', name: 'postcode', required: true, anchor: '70%'},
				{fieldLabel: 'Tel', name: 'tel', anchor: '80%'},
				{fieldLabel: 'Active', name: 'active', xtype: 'checkbox', inputValue: 1},
			],
			buttons: [
				this.init_cancel_button(),
				this.init_save_button()
			],
			listeners: { scope: this,
						actioncomplete: this.on_action_complete
			}
		});
		return this.frm;
	},
	
	on_action_complete: function(frm, action, opts){
		//if(action.type == "submit"){
		//	console.log(action.result.account[0]);
		//	this.fireEvent("account", action.result.account[0]);
		//}
	},
	
	init_save_button: function(){
		var self = this;
		this.saveJobButton = Ext.create("Ext.Button", {
			text: 'Save',
			iconCls: 'icoBlue',
			handler: function(){
				var f = self.frm.getForm();
				if (f.isValid()) {
					//var V = self.jobForm.getForm().getValues();
					f.submit({
						url: "/api/account/" + self.account_id,
						method: 'POST',
						//params:{ vars: V },
						waitMsg:'Saving Account',
						failure: function(form, action) {
							console.log(action);
							//Ext.MessageBox.alert('Error Message', action.result.errorInfo);
						},
						success: function(form, action) {
							//self.saveJobButton.setIconCls('icoClean');
							//self.saveJobButton.setText('Save');
							self.fireEvent("account", action.result.account[0]);
							self.close();
						}
					});
				} else{
					Ext.MessageBox.alert('Errors', 'Please fix the errors noted.');
				}
			}
		});
		return this.saveJobButton;
	},
	init_cancel_button: function(){
		var self = this;
		this.cancelButton =Ext. create("Ext.Button", {
			text: 'Cancel', 
			iconCls: 'icoBlack',
			handler: function(){
				self.close()
			}	
		});
		return this.cancelButton;
	}
});