

Ext.define('RL.DebtorDialog', {
	extend: 'Ext.window.Window',
	
	requires: [
        //'G2.JobBatchWindow'
    ],

	initComponent: function(){
        
		Ext.apply(this, {
			
			title: 'Hello',
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
			//title: 'Simple Form',
			bodyPadding:20,
			frame: true,
			MMwidth: 350,

			// The form will submit an AJAX request to this URL when submitted
			url: 'save-form.php',

			// Fields will be arranged vertically, stretched to full width
			layout: 'anchor',
			defaults: {
				anchor: '100%',
				labelAlign: 'right',
				labelWidth: 120
			},

			// The fields
			defaultType: 'textfield',
			items: [
				{fieldLabel: 'Full Name', name: 'contact'},
				{fieldLabel: 'Company / Person', name: 'company'},
				{fieldLabel: 'Address', name: 'address', xtype: "textarea"},
				{fieldLabel: 'Postcode', name: 'postcode'},
				{fieldLabel: 'Tel', name: 'tel'},
				{fieldLabel: 'Amount', name: 'amount', xtype: 'numberfield'}
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
						url: "/api/debtor/" + self.debtor_id,
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