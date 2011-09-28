"""The application's model objects"""
from redletter.model.meta import Session, metadata, Base
from sqlalchemy import Column, Boolean, SmallInteger, Integer, Float, String, Text, DateTime, Date, Index, Boolean


def init_model(engine):
    """Call me before using any of the tables or classes in the model"""
    Session.configure(bind=engine)


"""
class Address(Base):
    __tablename__ = 'addresses'

    id = Column(Integer, primary_key=True)
    email = Column(String(50))
    user_id = Column(Integer, ForeignKey('users.id'))
"""    

class Account(Base):
	__tablename__ = 'accounts'
	account_id 	= Column(Integer, primary_key=True)
	contact		= Column(String(50))
	entity		= Column(String(50))
	address		= Column(String(255))
	postcode	= Column(String(20))
	email		= Column(String(100))
	secret		= Column(String(20))
	
	def dic(self):
		return {'account_id': self.account_id,
				'contact': self.contact,
				'entity': self.entity, 
				'address': self.address,
				'postcode': self.postcode,
				'email': self.email
				}
	
	
class Debtor(Base):
	__tablename__ = 'debtors'
	debtor_id 	= Column(Integer, primary_key=True)
	account_id 	= Column(Integer)
	contact		= Column(String(50))
	entity		= Column(String(50))
	address		= Column(String(255))
	postcode	= Column(String(20))
	amount		= Column(Float())
		
	def dic(self):
		return {'account_id': self.account_id,
				'debtor_id': self.debtor_id, 
				'contact': self.contact,
				'entity': self.entity, 
				'address': self.address,
				'postcode': self.postcode,
				'amount': self.amount
				}
