#!/usr/bin/env python
import urllib
import urllib2
import re

def get_Local_ipv6_address():
    pageURL='http://[2001:250:3420::124]:9002/iv6'
    content = urllib2.urlopen(pageURL).read()

    ipv6_pattern = '(([a-f0-9]{1,4}:){7}[a-f0-9]{1,4})'

    m = re.search(ipv6_pattern, content)

    if m is not None:
        return m.group()
    else:
        return None

conf = {
        'account': 'xxxxxxxx', #Your Account
        'passwd': 'xxxxxxxx', #Your Password
'url': 'http://202.193.80.124/drcom/login'
}

form = {
'DDDDD': conf['account'],
'upass': conf['passwd'],
'0MKKey': '123456',
'v6ip': get_Local_ipv6_address(),
}
data = urllib.urlencode(form)
req = urllib2.Request(conf['url'], data)
res = urllib2.urlopen(req)