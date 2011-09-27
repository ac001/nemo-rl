"""The application's model objects"""
from redletter.model.meta import Session, metadata


def init_model(engine):
    """Call me before using any of the tables or classes in the model"""
    Session.configure(bind=engine)

"""
class Account(db.Model):
	acc_type	= db
	contact		= db.StringProperty(indexed=True)
	company		= db.StringProperty(indexed=True)
	address 	= db.StringProperty()
	postcode 	= db.StringProperty(indexed=True)
	status 		= db.StringProperty()	

class Debtor(db.Model):
	account		= db.ReferenceRoperty('Account')	
	contact		= db.StringProperty(indexed=True)
	company		= db.StringProperty(indexed=True)
	address 	= db.StringProperty()
	postcode 	= db.StringProperty(indexed=True)
	status 		= db.StringProperty()

	def dic(self):
		return {
				'group': str(self.group), 
				'status': str(self.status),
				'name': str(self.name), 
				'unit': str(self.unit), 
				'description': str(self.description),
				'example': str(self.example), 
				'data_type': str(self.data_type), 
				'sort_order': int(self.sort_order)
				}
"""