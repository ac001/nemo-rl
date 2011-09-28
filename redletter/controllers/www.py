import logging

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from redletter.lib.base import BaseController, render

log = logging.getLogger(__name__)



class WwwController(BaseController):

	def main(self, page=None):
		
		
		c.page = page
		
		return render('/%s.html' % c.page)


