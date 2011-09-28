import logging

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from redletter.lib.base import BaseController, render

log = logging.getLogger(__name__)



class WwwController(BaseController):

	def index(self):
		# Return a rendered template
		#return render('/main.mako')
		# or, return a response
		return render('/index.html')

	def debtors(self):
		
		c.page = "debtors"
		
		return render('/%s.html' % c.page)