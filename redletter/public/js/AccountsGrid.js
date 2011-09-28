

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
	sortInfo: {field: 'entity', direction: 'ASC'}
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
});

this.show_edit = function(id){
	var d = Ext.create("RL.AccountDialog", {account_id: 999});
	d.show();
}

this.actionDelete = new Ext.Action({
	text: 'Delete',
	iconCls: 'icoDelete',
});

//this.statusBar = new Ext.ux.StatusBar({text: 'No debtores in this view'});


//************************************************************************************
this.grid = new Ext.grid.GridPanel({
	title: 'Accounts',
	hideTitle: true,
	renderTo: 'accounts_widget',
	iconCls: 'icoAgsGroups',
	border: false,
	height: window.innerHeight - 140,
	tbar: [this.actionAdd, this.actionEdit, this.actionDelete],
	columns:[
				{dataIndex: 'name', header: 'Group', width: 50},
				{dataIndex: 'entity', header: 'Company'}
				//{dataIndex: 'class', header: 'Class'},
	],
	store: this.store,
	loadMask: true,
	stripeRows: true,
	enableHdMenu: false,
	viewConfig: {forceFit: true,  deferEmptyText: false, emptyText: 'No debtors in this list'},
	//bbar: [ this.statusBar ]
});



this.initialising = false;

this.load = function(){
	if(this.initialising === false){
			//var combo = self.searchForm.getForm().findField('search_col')
			//console.log("combo",combo)
			//combo.select(2);
	}
	//self.storeClasses.load();
	
	//self.storeGroups.load();
};

//self.load();
//self.storeAbbrevs.load();
	//self.storeClasses.load();
}

/* Ags2Go_Widget() */

