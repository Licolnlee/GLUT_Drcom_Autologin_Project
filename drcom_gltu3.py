#!/usr/bin/env python
# import os
# import subprocess
import urllib
import urllib.request

# from urllib import request
from urllib import parse
# from urllib.request import urlopen
#
# import numpy
# import urllib3
import re
import time
# import requests
import chardet
# import numpy as np
# class Person(object):
#     def _init_(self):
#         self.every = 15
every = 5
addrs = ["2001:da8:215:4074::153", "223.5.5.5"]
# names = ['data']
# formats = ['str']
# dtype = dict(names = names, formats = formats)
# addres = np.array(addrs, dtype = dtype)

# def pingcheck():
#     fnull = open(os.devnull, 'w')
#     print(getCurrentTime( ) + ' Searching GLUT Server...')
#     return1 = subprocess.call('ping 202.193.80.124', shell = True, stdout = fnull, stderr = fnull)
#     if return1:
#         print(getCurrentTime()+' Searching GLUT Server Failed,Please recheck your Internet.')
#         return False
#     else:
#         print(getCurrentTime( ) + ' Successfully located GLUT Server.')
#         return True


def pingcheck():
    from multiping import MultiPing
    print(getCurrentTime( ) + ' Searching GLUT Server...')
    mp = MultiPing(["202.193.80.124"])
    mp.send()
    responses, no_responses = mp.receive(1)
    # count = 0
    # for response in responses:
    #     count = count+1
    # if count == 0:
    count = len(responses)
    if count == 0:
        print(getCurrentTime()+' Searching GLUT Server Failed,Please recheck your Internet.')
        return False
    else:
        print(getCurrentTime( ) + ' Successfully located GLUT Server.')
        return True


def multi_pingcheck(addr):
    if pingcheck():
        from multiping import multi_ping
        responses, no_responses = multi_ping(addrs, timeout=2, retry=5)
        count = len(responses)
        # if responses:
        #     for response in responses:
        #         # print("reachable: %s" % response)
        #         count = count+1
        #     # print(count)
        return count
        # if no_responses:
        #     count1 = 0
        #     for no_response in no_responses:
        #         print("unreachable: %s" % no_response)
        #         count1 = count1+1
        #     print(count1)
        #     return count1


def countanalyst():
    count = multi_pingcheck(addrs)
    if count == 2:
        print(getCurrentTime()+" Your Internet has already been connected.")
        return True
    elif count == 1:
        print(getCurrentTime()+" Failed to connect to IPV6,please reconfigure your network if IPV6 is needed.")
        return False
    elif count == 0:
        print(getCurrentTime()+" Preparing to connect to Internet...")
        return False



#
# def pingcheckb():
#     fnull = open(os.devnull, 'w')
#
#     return1 = subprocess.call('ping 223.5.5.5', shell = True, stdout = fnull, stderr = fnull)
#     if return1:
#         print(getCurrentTime()+'No IPV4 Internet connection.')
#         return False
#     else:
#         return True
#
# def ping6check():
#     fnull = open(os.devnull, 'w')
#
#     return1 = subprocess.call('ping6 tv.byr.cn',shell = True, stdout = fnull, stderr = fnull)
#     if return1:
#         print(getCurrentTime()+'No IPV6 Internet connection.')
#         return False
#     else:
#         return True

#
# def checkConnect():
#     try:
#         from urllib3.util import timeout
#         q = requests.get("https://www.baidu.com", timeout = 20)
#         m = re.search(r'STATUS OK', q.text)
#         if m:
#             print(getCurrentTime(), "You have already connected to Internet.")
#             return True
#         else:
#             print(getCurrentTime(), "No Internet Connected.Please behold.")
#             return False
#     except:
#         print(getCurrentTime(), 'Unkown Internet status,Please recheck your Internet Connection.')
#         return False


def getCurrentTime():
    return time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))


def get_Local_ipv6_address():
    # if not countanalyst():
        pageURL = 'http://[2001:250:3420::124]:9002/iv6'
        # content = urllib2.urlopen(pageURL).read()
        content = urllib.request.urlopen(pageURL).read()

        ipv6_pattern = '(([a-f0-9]{1,4}:){7}[a-f0-9]{1,4})'

        encode_type = chardet.detect(content)
        content = content.decode(encode_type['encoding'])
        m = re.search(ipv6_pattern, content)

        if m is not None:
            print(getCurrentTime(), 'ipv6 address captured: ' + m.group())
            return m.group()
        else:
            print(getCurrentTime(), 'Unable to locate ipv6 address,please check your ipv6 settings...')
            return None
    # else:
    #     return None


def Login():
    # if not lazy_count():
        print(getCurrentTime(), 'Connecting to the Internet...')
        conf = {
            'account': 'xxxxxxxx',  # Your Account
            'passwd': 'xxxxxxxx',  # Your Password
            'url': 'http://202.193.80.124/drcom/login'
        }

        form = {
            'DDDDD': conf['account'],
            'upass': conf['passwd'],
            '0MKKey': '123456',
            'v6ip': get_Local_ipv6_address(),
        }
        try:
            data = urllib.parse.urlencode(form)
            # encode_type = chardet.detect(data)
            data = data.encode('utf-8')
            req = urllib.request.Request(conf['url'], data)
            # req = urllib.request.urlopen(conf['url'], data)
            # req = urllib2.Request(conf['url'], data)
            res = urllib.request.urlopen(req)
            # res = urllib.request.urlopen(req)
            # res = urllib2.urlopen(req)
            print(getCurrentTime()+' Internet Connection successfully established.Please wait to recheck '
                                   'Internet connection...')
            return True
        except Exception as err1:
            print(err1)
            print(getCurrentTime()+' Unable to connect to the Internet, Please check your account information and Internet '
                                   'connection...')
            return False
    # else:
    #     time.sleep(every)


def lazy_check(addr):
    from multiping import multi_ping
    responses, no_responses = multi_ping(addrs, timeout = 1, retry = 1)
    count = len(responses)
    return count
    # count = 0
    # if responses:
    #     for response in responses:
    #         # print("reachable: %s" % response)
    #         count = count + 1
    #     # print(count)
    # return count


def lazy_count():
    count = lazy_check(addrs)
    if count > 0:
        # print("yes")
        return True
    else:
        return False




def main():
    while True:
        if lazy_count():
            print(getCurrentTime()+' Internet Connection is stable.Please wait for ten minuets to recheck...')
            time.sleep(600)
        else:
            if not countanalyst():
                Login()
        time.sleep(every)

    # while True:
    #     if not countanalyst():
    #         Login()
    #     else:
    #         if not lazy_count():
    #         # print(getCurrentTime()+'Unable to connect to the Internet...')
    #             print(getCurrentTime()+'Internet Connection has already been successfully established.Please wait for '
    #                                    '5 '
    #                                    'minuets to recheck '
    #                                    'Internet connection...')
    #
    #     time.sleep(every)
        # Login()
        # while True:
        #     checkConnect()
        # else:
        #     print(self.getCurrentTime(), 'Please enjoy...')
#         # time.sleep(self.every)
#
if __name__ == '__main__':
    try:
       main()
    except Exception as err:

        # print('[ERROR]')
        print(err)

# multi_pingcheck()
# countanalyst()
# get_Local_ipv6_address()
# pingcheck()

# lazy_count()













# conf = {
#     'account': 'jg3302202',
#     'passwd': 'ljl2016',
#     'url': 'http://202.193.80.124/drcom/login'
# }
#
# form = {
#     'DDDDD': conf['account'],
#     'upass': conf['passwd'],
#     '0MKKey': '123456',
#     'v6ip': get_Local_ipv6_address( ),
# }

# data = urllib.urlencode(form)
# req = urllib2.Request(conf['url'], data)
# res = urllib2.urlopen(req)
