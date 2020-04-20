import urllib
import urllib.request
from urllib import parse
import re
import time
import chardet
addrs = ["2001:da8:215:4074::153", "119.29.29.29"]


def getCurrentTime():
    return time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time( )))


def get_Local_ipv6_address():
    pageURL = 'http://[2001:250:3420::124]:9002/iv6'
    content = urllib.request.urlopen(pageURL).read( )
    ipv6_pattern = '(([a-f0-9]{1,4}:){7}[a-f0-9]{1,4})'
    encode_type = chardet.detect(content)
    content = content.decode(encode_type['encoding'])
    m = re.search(ipv6_pattern, content)
    if m is not None:
        print(getCurrentTime( ), 'ipv6 address captured: ' + m.group( ))
        return m.group( )
    else:
        print(getCurrentTime( ), 'Unable to locate ipv6 address,please check your ipv6 settings...')
        return None


def Login():
    print(getCurrentTime( ), 'Connecting to the Internet...')
    conf = {
        'account': 'jg3302202',
        'passwd': 'ljl2016',
        'url': 'http://202.193.80.124/drcom/login'
    }

    form = {
        'DDDDD': conf['account'],
        'upass': conf['passwd'],
        '0MKKey': '123456',
        'v6ip': get_Local_ipv6_address( ),
    }
    try:
        data = urllib.parse.urlencode(form)
        data = data.encode('utf-8')
        req = urllib.request.Request(conf['url'], data)
        res = urllib.request.urlopen(req)
        print(getCurrentTime( ) + ' Internet Connection successfully established.Please wait to recheck '
                                  'Internet connection...')
        return True
    except:
        print(getCurrentTime( ) + 'Unable to connect to the Internet, Please check your account information and '
                                  'Internet '
                                  'connection...')
        return False


def lazy_check():
    from multiping import multi_ping
    responses, no_responses = multi_ping(addrs, timeout = 1, retry = 1)
    count = len(responses)
    if count > 0:
        return True
    else:
        return False


def main():
    while True:
        if lazy_check():
            print(getCurrentTime() + ' Internet Connection is stable.Please wait for ten minuets to recheck...')
            time.sleep(600)
        else:
            print(getCurrentTime()+' Tring to establish Internet connection...')
            Login( )
        time.sleep(60)


if __name__ == '__main__':
    try:
        main( )
    except Exception as err:
        print(err)
