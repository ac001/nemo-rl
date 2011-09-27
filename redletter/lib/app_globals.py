"""The application's Globals object"""


from beaker.cache import CacheManager
from beaker.util import parse_cache_config_options

class Globals(object):

	"""Globals acts as a container for objects available throughout the
	life of the application

	"""

	def __init__(self, config):
		"""One instance of Globals is created during application
		initialization and is available during requests via the
		'app_globals' variable

		"""
		self.cache = CacheManager(**parse_cache_config_options(config))
		
		self._front_nav = None
		self._account_nav = None
		

		self.ini = {}
		## ---------------------------------------------------------------
		## Site
		## ---------------------------------------------------------------
		self.ini['site'] = {}
		self.ini['site']['title'] = 'Nemo Letters'
		

		self.ini['smtp'] = {}


		# ---------------------------------------------------------------
		# SMS
		# ---------------------------------------------------------------
		self.ini['sms'] = {}

		# ---------------------------------------------------------------
		# Emails
		# ---------------------------------------------------------------
		self.ini['email'] = {}
		self.ini['email']['live'] = False
		self.ini['email']['admin']    = "pedromorgan@gmail.com"

		self.ini['from'] = {}
		self.ini['from']['email']  = "ac001@daffodil.uk.com"
		self.ini['from']['name']  = "XXX Mash"


		self.ini['cdn'] = {}
		self.ini['cdn']['daffo']  = "http://daffodil-cache.appspot.com"
		self.ini['cdn']['js_app']  = "/js" #"http://ffs-cache.appspot.com"
		
		self.ini['js'] = {}
		self.ini['js']['ext_version']  = "ext-4.0.2"


	def nav(self):
		return [
			{'url': "/", 'label': 'Home'},
			{'url': "/debtors", 'label': 'Debtors'},
			{'url': "/accounts", 'label': 'Accounts'},
		]


