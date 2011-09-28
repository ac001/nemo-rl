

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
	},
	
	create_form: function (){
		
		this.frm = 	Ext.create('Ext.form.Panel', 
		{
			bodyPadding:20,
			frame: true,

			layout: 'anchor',
			defaults: {
				anchor: '100%',
				labelAlign: 'right',
				labelWidth: 120
			},

			// The fields
			defaultType: 'textfield',
			items: [
				{fieldLabel: 'Contact Name', name: 'contact'},
				{fieldLabel: 'Company / Person', name: 'entity', required: true},
				{fieldLabel: 'Address', name: 'address', xtype: "textarea", required: true},
				{fieldLabel: 'Postcode', name: 'postcode', required: true},
				{fieldLabel: 'Tel', name: 'tel'},
				{fieldLabel: 'Email', name: 'email', required: true}
			],
			buttons: [
				this.init_cancel_button(),
				this.init_save_button()
			]
		});
		return this.frm;
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
						waitMsg:'Saving Job',
						failure: function(form, action) {
							console.log(action);
							//Ext.MessageBox.alert('Error Message', action.result.errorInfo);
						},
						success: function(form, action) {
							self.saveJobButton.setIconCls('icoClean');
							self.saveJobButton.setText('Save');
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