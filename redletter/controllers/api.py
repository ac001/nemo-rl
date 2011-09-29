#import logging
import random
from pylons import request, response, session
from pylons.controllers.util import abort, redirect
from pylons.decorators import jsonify

from redletter.lib.base import BaseController, render



#log = logging.getLogger(__name__)

from redletter.model import meta, Account, Debtor


def gen_passwd():
	letters = 'abcdefhkmnprtwxyz'
	nos = '123456789'
	
	passwd = ""
	dic = {}
	i =  random.randint(1, len(letters)) - 1
	passwd += letters[ i ]
	
	i2 =  random.randint(1, len(letters)) - 1
	passwd += letters[ i2 ]
	
	passwd += str(random.randint(1, 9))
	passwd += str(random.randint(1, 9))
	
	return passwd

class ApiController(BaseController):

	@jsonify
	def accounts(self):
		
		payload = {'success': True}
		
		accs = meta.Session.query(Account).all()
		payload['accounts'] = [ob.dic() for ob in accs]
		
		return payload
		
	@jsonify
	def account(self, account_id):
		
		account_id = int(account_id)
		payload = {'success': True}
		
		if request.method == "POST":
			if account_id == 0:
				ob = Account()
				meta.Session.add(ob)
				ob.passwd = gen_passwd()
				ob.active = True
				ob.passwd_change = True
			else:
				ob = meta.Session.query(Account).get(account_id)
				ob.active = True
			ob.email = request.params["email"]	
			ob.contact = request.params["contact"]
			ob.company = request.params["company"]
			ob.address = request.params["address"]
			ob.postcode = request.params["postcode"]
			ob.tel = request.params["tel"]
			
			#ob.postcode = request.params["entity"]
			
			meta.Session.commit()
			payload['account'] = [ob.dic()]
		else:
			ob = meta.Session.query(Account).get(account_id)
			payload['account'] = [ob.dic()]
		
		return payload
		
		
		
		
		
		
		
	@jsonify	
	def debtors(self):
		
		payload = {'success': True}
		
		payload['debtors'] = {}
		
		return payload
		
	@jsonify
	def debtor(self, debtor_id):
		
		debtor_id = int(debtor_id)
		payload = {'success': True}
		
		if request.method == "POST":
			if debtor_id == 0:
				ob = Debtor()
				meta.Session.add(ob)
			else:
				meta.Session.query(Debtor).get(debtor_id)
				
			ob.contact = request.params["contact"]
			ob.entity = request.params["entity"]
			ob.address = request.params["entity"]
			ob.postcode = request.params["postcode"]
			ob.tel = request.params["tel"]
			#ob.postcode = request.params["entity"]
			
			meta.Session.commit()
		
		else:
			payload['debtor'] = [{'foo': 'bar'}]
		
		return payload
		
		
		