

function AccountsGrid( confOb ){

var self = this;
this.initialising = true;

//********************************************************************************
//** Classes
//********************************************************************************
this.store = new Ext.create("Ext.data.Store", {
	model: "Account",
	proxy: {
		type: 'ajax',
		url: '/api/accounts', 
        reader: {
            type: 'json',
            root: 'accounts'
        }
	},
	idProperty: 'account_id',
	sortInfo: {field: 'company', direction: 'ASC'}
});

/*
this.selModel = new Ext.grid.RowSelectionModel({
	singleSelect: true, hidden: true
});
*/


//***************************************

this.actionAdd = new Ext.Action({
	text: 'New',
	iconCls: 'icoAdd',
	handler: function(){
		self.show_edit(0);
	}
});
this.actionEdit = new Ext.Action({
	text: 'Edit',
	iconCls: 'icoEdit',
	handler: function(){
		if(self.grid.getSelectionModel().hasSelection() == false){
			return;
		}
		var rec = self.grid.getSelectionModel().getSelection()[0]
		self.show_edit(rec.get("account_id"));
	}
});

this.show_edit = function(acc_id){
	var self = this;
	var d = Ext.create("RL.AccountDialog", {account_id: acc_id});
	d.on("account", function(data){
		console.log("data-", data);
		var rec = self.store.getById(data.account_id);
		if(rec){
			rec.set(data);
		}else{
			var newRec = Ext.create('Account', data);
			self.store.add(newRec);
	
			
		}
	});
	d.show();
}

this.actionDelete = new Ext.Action({
	text: 'Delete',
	iconCls: 'icoDelete',
});

//this.statusBar = new Ext.ux.StatusBar({text: 'No debtores in this view'});

this.grid_double_clicked = function(view, record, item, index, e, eOpts ){
	self.actionEdit.execute();
	
},
this.on_refresh = function(){
	this.store.load();
},

//************************************************************************************
this.grid = new Ext.grid.GridPanel({
	title: 'Accounts',
	hideTitle: true,
	renderTo: 'accounts_widget',
	iconCls: 'icoAgsGroups',
	border: false,
	height: window.innerHeight - 140,
	tbar: [	this.actionAdd, this.actionEdit, this.actionDelete, 
			'->', {iconCls: 'icoRefresh2', listeners: {scope: this, click: this.on_refresh}}
	],
	columns:[	{dataIndex: 'active', header: 'Active', width: 50, renderer: RLG.render.yn, align: 'center'},
				{dataIndex: 'company', header: 'Company', flex: 1},
				{dataIndex: 'contact', header: 'Contact', flex: 1},
				{dataIndex: 'email', header: 'Email', flex: 1}
	],
	store: this.store,
	loadMask: true,
	stripeRows: true,
	enableHdMenu: false,
	viewConfig: {forceFit: true,  deferEmptyText: false, emptyText: 'No accounts in this list'},
	listeners: {
			scope: this,
			itemdblclick: this.grid_double_clicked
	}
	//bbar: [ this.statusBar ]
});





this.initialising = false;

this.store.load();
//self.storeAbbrevs.load();
	//self.storeClasses.load();
}

/* Ags2Go_Widget() */

