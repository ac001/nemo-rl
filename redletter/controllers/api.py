#import logging

from pylons import request, response, session
from pylons.controllers.util import abort, redirect
from pylons.decorators import jsonify

from redletter.lib.base import BaseController, render



#log = logging.getLogger(__name__)

from redletter.model import Debtor



class ApiController(BaseController):

	def debtors(self):
		
		dic = {}
		
		dic['debtors'] = {}
		
		return render('/%s.html' % c.page)
		
	@jsonify
	def debtor(self, debtor_id):
		
		debtor_id = int(debtor_id)
		payload = {}
		
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