/********************  �������ò���  ********************/
var jsVersion='3.3.2';

var companyInfo="������Ʒ�ϵͳ�ɳ����ȵ��ṩ";// ��˾��Ϣ(�ײ�����)

var companyLink="http://www.doctorcom.com";// ��˾����

var redirectLink="http://nic.glut.edu.cn/nic/annc";// ��¼�ض���

var rebackLink="http://202.193.80.125/a79.htm?isReback=1";//�����ض���

var accountSuffix="";// �˺ź�׺

var accountPrefix=0;// �Ƿ�����˺�ǰ׺(0-����ӣ�1-���)Ĭ������˺�ǰ׺1

var enPerceive=0;// �Ƿ�֧�ֿ��ٵ�¼(0-��֧�֣�1-֧��)

var eportalv6=1;// //0����ʾ����v6������1��ʾ����v6����

var autoPerceive=0;// ���ٵ�¼�Ƿ��������ύ(0-��ʾ���ٵ�½��1-ֱ���޸�֪)

var customPerceive=0;// �Ƿ��¼mac (0-��¼��1-����¼)

var enHttps=0;// �Ƿ���ҪHttps(0-����Ҫ��1-��Ҫ)

var enMd5=0;// �Ƿ���ҪMD5(0-����Ҫ��1-��Ҫ)

var enAdvert=0;// �Ƿ���ʾ���(0-����ʾ��1-��ʾ)

var advert_host="";// ���ͳ�Ʒ�������ַ�����磺http://192.168.0.1:9080

var enSlideshow=0;// �Ƿ���ʾ�õ�Ƭ(0-����ʾ��1-��ʾ)

var machineno="";// �豸���

var onlineMonitor=0;//�Ƿ����߼���(0-9002�˿ڼ�����1-���߽ӿڼ���)

var acLogout=0;//��AC��֤������ͨ����̨�ӿ�ע������(0-ͣ�ã�1-radiusע����2-��̨ע����

var unBindmac=0;//ע��ʱʹ�ý��mac��ַ(1-����)

var findMac=0;//1-����BSȫҵ��ӿڲ�ѯ(0-Ĭ���ں˲�ѯ)

var autoThrough=0;//�Զ����

var radiusIP="202.193.80.124";//RADIUS������IP

var registerMode=1;//������ʽ(0-˽���ƿ�����1-BS������2-�Ƶ�棬3-2188�ÿ�ϵͳ)

var changePassMode=0;//�޸����뷽ʽ(0-eportalҳ�棬1-�Է���(˽���Ʋ�֧��))

var cvlanid="4095";//��CVLANID(�û��״ε�½ʱǿ���޸�����)

var enableR3=1; // �Ƿ����� r3 �������ֶ���Ӫ��

var webPayUrl="http://222.203.32.5:8080/WebPay/toRecharge"; // ��ֵ����

var isLang=1; //�Ƿ�������Ӣ�� 1-���� 0-�ر�

var ISRedirect=1; //�Ƿ��¼�ض��� 1-���� 0-�ر�

var enbaleEduroamVerify=0; // ��·���� eduroam ���ģʽ

var duodianAppHidden=0; //�Ƿ����ضߵ���Ϣ 1-���� 0-������

var storeExpireTime=86400; //�������ʱ��,��λ-��

var ipv6Delay=2000; //��ȡipv6ʧ��ʱ���ӳ�ʱ�䣬��λ-����

var enablev6=eportalv6; // ͨ���жϷ�����ҳ������ã����վ����Ƿ����� ipv6ͨ��ipv4������¼

var page = {
	kind:'pc',
	name:'test20191202 (20191209)',
	type:'ip',
	index:0,
	host:		window.location.protocol + '//' + window.location.host + '/',
	hostname:	window.location.protocol + '//' + window.location.hostname,	
	path:		window.location.protocol + '//' + window.location.host + '/drcom/',
	eportal:	window.location.protocol + '//' + window.location.hostname + ':801/eportal/',
	programUrl:	'',
	redirectLink: '',
	loginMethod:0,
	vtype:'',
	timer:null,
	run: function(_kind) {
		var me = this;
		// ����Ƿÿ�ɨ��ҳ�棬����Ƿ���Ҫ��ת���ÿ�ɨ��ҳ��
		if(!_kind){
			me.checkIsGroupScanQRCode();
		}
		// �����ն���صĲ���
		term.init(_kind,function(){
			// ����ҳ����صĲ���
			me.setArgs(function(){
				if(_kind){
					switch (_kind){
						case 1:
						case 2:
						case 3:
							me.kind = (term.type == 2 ? 'mobile_3': 'pc_')+_kind;
							me.load_loginbox(function() {
								me.render(me.load_js_css);
							});
							break;
						case '09':
						case 23:
						case 25://������֤�ص�ҳ
						case 26://program 26ΪIOS11.3΢����֤ר��
						case 27: 
						case 38:
							me.kind = (term.type == 2?'mobile_':'pc_')+_kind;
							me.load_loginbox(function() {
								me.render(me.load_js_css);
							});
							break;
						case 'eduroam':
							me.checkUserStatusAndLoginByIP(true);
							break;
					}
					
				} else {
					// ����û�״̬
					me.checkStatus();
				}
			});
		});
	},
	keepCheckState: function(){
		var me = this;
		me.timer && window.clearInterval(me.timer);
		me.timer = window.setInterval(function() {
			page.checkUserStatusAndLoginByIP();
		},8000); //ÿ8���Զ�ˢ��һ��
	},
	// ������������orδ��ˣ����ͨ��eportal��̨���ߡ�
	checkUserStatusAndLoginByIP: function(firstRender) {   // firstRender �Ƿ��״���Ⱦҳ��
		var me = this;
		me.kind = term.type == 2 ? 'mobile_31': 'pc_1';
		var callback = me.load_js_css;
		var url = me.eportal + '?c=Portal&a=v_checkUserStateByIP';
		// ��ȡ����ip
		if(term.ip=='000.000.000.000'){
			alert('��ȡ�����ն��û�IP����������״̬�����ã�');
			if(!firstRender) return;
			me.load_loginbox(function() {
				me.render(callback);
			});
		}
		util._jsonp({
			url: url,
			time:10000,
			data:{
				'program_name': page.name,
        'web_type': page.type,
        'page_index': page.index,
				'login_method': page.loginMethod,
				'wlan_user_ip': term.ip,
				'wlan_user_mac': term.mac,
				'wlan_ac_ip': term.wlanacip,
				'wlan_ac_name': term.wlanacname,
				'jsVersion': jsVersion
			},
			success: function(json) {
				if (json.result == 1 || json.result == 'ok') {
					if(typeof(json.login_result) && json.login_result == 1 || json.login_result == 2){ // ���߻��¼�ɹ�
						me.timer && window.clearInterval(me.timer);
						window.location = '3.htm'+window.location.search;
						return;
					}
					if(!firstRender) return;

					if(typeof(json.useflag)!='undefined'){
						if(json.useflag == 0){ // ͣ��
							me.kind = term.type == 2 ? 'mobile_32': 'pc_2';
							callback = function() {
								document.getElementById('message').innerHTML = '���˺���ͣ�������ֵ�������ʹ�á�';
								document.getElementById('message').setAttribute('data-localize','accountoutofservice')
								me.load_js_css();
							};
						}else{ // ����δ�����������
							if(json.auditstate == 0){ // ���ύ�������
								me.kind = term.type == 2 ? 'mobile_32': 'pc_2';
								callback = function() {
									document.getElementById('message').innerHTML = '���ύ��ˣ������ĵȴ�����֪ͨ��';
									document.getElementById('message').setAttribute('data-localize','submittedforreview')
									me.load_js_css(me.keepCheckState);
								};
							}else{ // -1 δ�ύ���
								me.kind = term.type == 2 ? 'mobile_eduroam': 'pc_eduroam';
							}
						}
					}
				}
				if(!firstRender) return;
				me.load_loginbox(function() {
					me.render(callback);
				});
			},
			error: function(){
				if(!firstRender) return;
				me.load_loginbox(function() {
					me.render(callback);
				});
			}
		});
	},
	// ����Ƿ�Ϊ����ÿ�ɨ�룬
	checkIsGroupScanQRCode:function(){
		if(term.redirect && (term.redirect.indexOf('api=groupQRCodeScan')>=0 || util.getQueryString('api')=='groupQRCodeScan')){
			var url = window.location.search;
			url+= "&" + term.redirect.substr(term.redirect.indexOf('?')+1);
			window.location = 'a30.htm'+url;
			return;
		}
	},
	// ���ں����󣬼���û�״̬ result: 0 �����ߣ�1 ����
	checkStatus: function(data_format) {
		var me = this;
		var url = me.path + 'chkstatus';
		util._jsonp({
			url: url,
			time:5000,
			success: function(json) {
				if('undefined' != typeof(json.ss4) && json.ss4!='000000000000' && json.ss4!=''){
					// ������url�����MacΪ׼
					term.mac =(term.mac == '000000000000' || term.mac == '111111111111') ? json.ss4:term.mac;
				}
				// �����ߣ��Ƿ������޸�֪
				if (json.result == 0 && enPerceive == 1) {
					me.checkMac();
					return false;
				}
				// ����(�˴��������)
				if (json.result == 1) {
					json.uid && (term.account = json.uid);
					term.online = json;
					me.kind = term.type == 2 ? 'mobile_31': 'pc_1';
					// ������� ��·eduroam��ˣ������˺������ @�ģ�����ú�̨�ӿڲ�ѯ�Ƿ���Ҫ���
					if(enbaleEduroamVerify == 1 && json.uid.indexOf('@') != -1){
						me.checkUserStatusAndLoginByIP(true);
						return;
					}
				}

				me.firstRender();
			},
			error: function(){
				document.getElementsByTagName('body')[0].innerHTML = '�ں˽ӿڲ����ã������ں�������ں˰汾��';
			}
		});
	},
	checkMac: function() {
		var me = this;
		var localurl = me.path + 'login';
		var portalurl = me.eportal + '?c=Portal&a=perceive';
		var url = portalurl;
		if(term.mac == '000000000000' || term.mac == '111111111111'){
			// alert('��ȡ�û�MAC��ַʧ�ܣ�');
			me.firstRender();
			return;
		}
		var data = {};		
		data.login_method = page.loginMethod;
		data.wlan_user_ip = term.ip;
		data.wlan_user_ipv6 = term.ipv6;
		data.wlan_vlan_id = term.vlan;
		data.wlan_user_mac 	= term.mac;
		data.wlan_ac_ip = term.wlanacip;
		data.wlan_ac_name = term.wlanacname;
		data.jsVersion = jsVersion;
		data.data_format = autoPerceive?2:0; // 2 �޸�֪��¼  0 �����޸�֪״̬
		data.suffix = term.suffix;
		data.ssid = term.ssid;
		util._jsonp({
			url:url,
			data:data,
			success:function(json) {
				if(json.result == 1){ // �����߻�ֱ���޸�֪��¼�ɹ���ʾ�ɹ�ҳ
					me.kind = term.type == 2?'mobile_33':'pc_3';
					if(typeof(json.account) != 'undefined'){
                		term.account = json.account;
            		}
				}else if(json.result == 10){ // ��ʾ���ٵ�¼ҳ
					me.kind = term.type == 2?'mobile_10':'pc_20';
				}else{ // ����쳣��δ��MAC��ʾ��֤ҳ
					me.kind = term.type == 2?'mobile':'pc';
				}
				me.firstRender();
			},
			error: function(){
				me.firstRender();
			}
		});
	},
	firstRender: function() {
		var me = this;
		me.load_loginbox(function() {
			if (advert_time_79 > 0) { // advert_time_79 -> loginbox
				me.advert();
			} else {
				me.render(me.load_js_css);
			}
		});
	},
	// ���ҳ
	advert: function() {
		var me = this;
		me.kind = term.type == 2 ? 'mobile_79': 'pc_79';
		me.render(function() {
			var time = advert_time_79;
			var timer = setInterval(function() {
				time--;
				if (time <= 0) {
					me.kind = term.type == 2 ? 'mobile': 'pc';
					me.render();
					window.clearInterval(timer);
				} else {
					document.getElementById('advertTime').innerHTML = time;
				}
			},
			1000);
			me.load_js_css();
		});
	},
	/*  
	 * ��Ⱦҳ��
	 * ���ͼƬ����Ƶ·������
	 */
	render: function(callback) {
		var me = this;
		var url = me.pageUrl + me.kind + '.js?v=_'+fileVersion;

		util._load('js', url, function() {
			var oFragmeng = document.createDocumentFragment();
			var dom = util.string2DOM(window.bodyContent)[0];
			// �滻ͼƬ·��
			var imgs = dom.getElementsByTagName('img');
			for (var i = imgs.length - 1; i >= 0; i--) {
				var src = imgs[i].src;
				if (src && src.length > 0) {
					var index = src.indexOf('/', 10);
					if (index > 0) {
						src = src.substr(index + 1); // ȥ�� http://xxx����
						var srcAry = src.split('/');
						//EditEportal ����Ŀ¼����ҳ���ļ��滻
						if (srcAry[0] == 'EditEportal') {
							imgs[i].src = me.eportal + src;
						} else {
							imgs[i].src = me.pageUrl + srcAry[srcAry.length - 1];
						}
					}
				}
			}

			//�����Ƶ·������
			var videos = dom.getElementsByTagName('video');
			for (var i = videos.length - 1; i >= 0; i--) {
				var src = videos[i].src;
				if (src && src.length > 0) {
					var index = src.indexOf('/', 10);
					if (index > 0) {
						src = src.substr(index + 1); // ȥ�� http://xxx����
						var srcAry = src.split('/');
						videos[i].src = me.pageUrl + srcAry[srcAry.length - 1];
					}
				}
				videos[i].setAttribute('poster', me.eportal + 'EditEportal/Images/a03.jpg');
			}
			// �����ť����ͼƬ·������
			var changeBtnImgPath = function(targets) {
				for (var i = targets.length - 1; i >= 0; i--) {
					var style = targets[i].getAttribute('style');
					if (style) {
						if (style.indexOf('url("') >= 0) {
							style = style.replace('url("', 'url("' + me.pageUrl); //IE
						} else {
							style = style.replace('url(', 'url(' + me.pageUrl);
						}
					}
					targets[i].setAttribute('style', style);
				}
			}
			changeBtnImgPath(dom.getElementsByTagName('button'));
			changeBtnImgPath(dom.getElementsByTagName('input'));

			//�ߵ���ʾ����
			if((typeof(duodianAppHidden) != 'undefined') && (duodianAppHidden == 1)){
				var a = dom.getElementsByTagName('a');
				for(var i = a.length;i>=0;i--){
					if(typeof(a[i]) != 'undefined'){
						if( (a[i].getAttribute('href') == 'http://www.doctorcom.com/duodian/') || (a[i].getAttribute('data-localize') == page.kind+'.common.downloadapp') || (a[i].getAttribute('class') == 'lightbox_a') || (a[i].getAttribute('desc') == 'duodian_download') || (a[i].getAttribute('href') == 'http://www.drcom.com.cn') ){
							if((typeof(a[i].style) != 'undefined') && (typeof(a[i].style.display) != 'undefined') ){
								a[i].style.display = 'none';
							}
						}
						if(a[i].getAttribute('name') == 'openApp'){
							if((typeof(a[i].parentElement) != 'undefined') && (typeof(a[i].style) != 'undefined') && (typeof(a[i].style.display) != 'undefined') ){
								a[i].parentElement.style.display = 'none';
							}
						}
					}
				}
			}
			
			document.body.innerHTML = '';
			document.body.appendChild(dom);
			
      // ҳ���������һ���ֶΣ�����ҳ������ͣ���Ҫ��Բ�ͬ���͵�ҳ������ͬ����
			// Ŀǰ��ʱ��������ж�ҳ���Ƿ�Ϊ�ÿ�ģ�� guest visitor eduroam ����
			document.getElementById("pagetype") && (me.vtype = document.getElementById("pagetype").value);

			// ��Ⱦ��ɺ� ��һЩ��ʼ������ �Լ����ûص�����
			if(typeof(_init) != 'undefined'){
				if(isLang && typeof(language) != 'undefined'){
					language.init(null, function(){
						_init(callback);
					})
				}else{
					_init(callback);
				}
			}else{
				callback && callback();
			}
			
		});
	},
	load_loginbox: function(next) {
		// ���� loginbox.js
		var loginboxJs = this.programUrl + this.type + '/' + this.index + '/loginbox.js?v=_' + fileVersion;
		util._load('js', loginboxJs, function(){
			// ������ loginbox�����ã������Ƿ�����ipv6ͨ��ipv4������¼
			// �ж�ȫ���Ƿ�����(eportalv6)�����û���þ�ʹ��ҳ�����õ�ipv6_ipv4
			enablev6 = (eportalv6 || ipv6_ipv4)?1:0;
			next()
		});
	},
	/*  
	 * ���� ҳ����Ҫ��js ��css �ļ�
	 */
	load_js_css: function(callback) {
		util._load('css', 'b82.css'); // Bootstrap v3.2.0
		util._load('css', 'a52.css'); // lightBox, �ߵ������õ�
		util._load('css', 'a57.css'); // �Զ��嵯����ʽ(����IOS11.3)
		// ����js���� jquery,��jquery ��������ټ�������js
		util._load('js','a43.js',function(){
			util._load('js',  'a44.js');  // clipboard.js  �������ݵ�ճ������
			util._load('js',  'a51.js');  // lightBox, �ߵ������õ�
			util._load('js',  'a54.js');  // IE8/9����AJAX
			util._load('js',  'a58.js');  // �Զ��嵯������(����IOS11.3)
			util._load('js',  'a77.js?v=_' + fileVersion);  // �����̽���ض����б�
			util._load('js',  'a78.js?v=_' + fileVersion);  // �����Զ���
			util._load('js',  'a45.js',function(){   //���ȼ���a45.js(jquery.i18n.properties)��a42.js�����õ�$.i18n
				util._load('js',  'a76.js', function(){  // ���ش洢��a42 �����ڱ��ش洢����Ҫ������ż���a42.js
					util._load('js',  'a42.js?v=_' + fileVersion, callback);  // ��չ����
				});
			});
		});
	},
	/* 
	 * ����ҳ����صĲ���
	 */
	setArgs: function(callback) {
		var me = this;
		/* ������� */
		me.kind = term.type == 2 ? 'mobile': 'pc';
		me.programUrl = me.eportal+'extern/' + me.name + '/';
		util._load('js', me.programUrl+'config.js?version='+fileVersion, function(){
			me.type = getPageType(); //From config.js
			me.index = getMatchPage(term.vlan, term.ip, term.ssid, term.areaID, term.time,term.ipv6,term.apmac);//From config.js
			me.loginMethod = getLoginMethod(me.index);
			me.redirectLink = getRedirectLink(me.index); //From config.js,��3.htmʹ��
			me.pageUrl = me.programUrl + me.type + '/' + me.index + '/';
			term.suffix = util.getSuffix();
			callback && callback();
		})
	}
};
var util = {
	num : 1000,
	//����,����jsonp����ص�����
	increment : function(){
		this.num++;
		return this.num;
	},
	string2DOM: function(str) {
		var div = document.createElement("div");
		if (typeof str == "string") div.innerHTML = str;
		return div.childNodes;
	},
	getQueryString: function(name) {
		var i;
		var l = arguments.length;
		var params = window.location.search.split("?");
		if (l < 1) return '';
		var getStr = function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			for (var index in params) {
				var r = params[index].match(reg);
				if (r != null) {
					return unescape(r[2]);
				}
			}
			return null;
		};
		if (l == 1) {
			return getStr(name) || '';
		} else {
			var ret = false;
			for (var i = 0; i <= arguments.length - 1; i++) {
				ret = getStr(arguments[i]);
				if (ret) return ret;
			}
			return '';
		}
	},
	getTermType: function() { // �����豸:0-������1-PC��2-�ֻ���3-ƽ��
		var iTermType = 0;
		if (navigator.userAgent.indexOf('Android') > 0) { // ��׿
			if (navigator.userAgent.indexOf('PAD for Mobile') > 0) {
				iTermType = 3;
			} else {
				iTermType = 2;
			}
		} else if (navigator.userAgent.indexOf('BlackBerry') > 0) { // ��ݮ
			if (navigator.userAgent.indexOf('RIM Table OS') > 0) {
				iTermType = 3;
			} else {
				iTermType = 2;
			}
		} else if (navigator.userAgent.indexOf('Mac OS') > 0) { // ƻ��
			if (navigator.userAgent.indexOf('iPad') > 0) {
				iTermType = 3;
			} else if (navigator.userAgent.indexOf('iPhone') > 0) {
				iTermType = 2;
			} else {
				iTermType = 1;
			}
		} else if (navigator.userAgent.indexOf('X11') > 0) { // Linux
			iTermType = 1;
		} else if (navigator.userAgent.indexOf('SymbOS') > 0) { // ����
			iTermType = 2;
		} else if (navigator.userAgent.indexOf('Windows') > 0) { // Windows
			if (navigator.userAgent.indexOf('Windows RT') > 0) {
				iTermType = 3;
			} else if (navigator.userAgent.indexOf('Windows Phone') > 0) {
				iTermType = 2;
			} else {
				iTermType = 1;
			}
		} else {
			iTermType = 2;
		}
		//UAʶ���PCʱ���������ʾ���С�ڸ߶�������ֻ�ҳ
		if (iTermType == 1 && window.screen.width < window.screen.height) {
			iTermType = 2;
		}
		//UAʶ���ƽ��ʱ���������ʾ���С��ҳ��̶���ȴ�С1200������ֻ�ҳ
		if (iTermType == 3 && window.screen.width < 1200) {
			iTermType = 2;
		}
		return iTermType;
	},
	_jsonp: function(params) {
		var me = this;
		//��ʽ������  
		var formatParams = function(data) {
			var arr = [];
			for (var name in data) {
				if( name == 'callback'){
					arr.unshift(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
				}else{
					arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
				}
			};
			// ���һ�����������ֹ����  
			arr.push('v=' + random());
			return arr.join('&');
		};
		// ��ȡ�����  
		var random = function() {
			return Math.floor(Math.random() * 10000 + 500);
		};
		
		params = params || {};
		params.data = params.data || {};

		// jsonp����
		//����script��ǩ�����뵽ҳ����
		var callbackName = 'dr' + me.increment(); // �Զ��� callbackName
		var head = document.getElementsByTagName('head')[0];
		// ���ô��ݸ���̨�Ļص�������
		params.data['callback'] = callbackName;
		var data = formatParams(params.data);
		var script = document.createElement('script');
		head.appendChild(script);
		//����jsonp�ص�����
		window[callbackName] = function(json) {
			head.removeChild(script);
			clearTimeout(script.timer);
			window[callbackName] = null;
			params.success && params.success(json);
		};
		//��������  
		script.src = params.url + (params.url.indexOf('?') > 0 ? '&': '?') + data;
		//Ϊ�˵�֪�˴������Ƿ�ɹ������ó�ʱ����  
		if (params.time) {
			script.timer = setTimeout(function() {
				window[callbackName] = null;
				head.removeChild(script);
				params.error && params.error({
					message: '��ʱ'
				});
			}, params.time);
		}
	},
	_load: function(type, url, callback) {
		var _doc = document.getElementsByTagName('head')[0];
		if (type == "css") {
			var fileref = document.createElement("link");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", url);

			_doc.appendChild(fileref);
		} else if (type == 'js') {
			var script = document.createElement('script');
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('src', url);

			_doc.appendChild(script);
			script.onload = script.onreadystatechange = function() {
				if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
					script.onload = script.onreadystatechange = null;
					callback && callback();
				}
			};
		}
	},
	//��16����IPתΪ���ʮ���ƴ�
	hex16ToString: function(hex16IP) {
		var stringIP = parseInt(hex16IP.substr(0, 2), 16).toString(10) + "." + parseInt(hex16IP.substr(2, 2), 16).toString(10) + "." + parseInt(hex16IP.substr(4, 2), 16).toString(10) + "." + parseInt(hex16IP.substr(6, 2), 16).toString(10);
		return stringIP;
	},
	getSuffix: function(){
    var tmpSuffix = accountSuffix;
    // ��ȡ������
    var tempMachineno = getVirtualMachineno(machineno, page.index);
    // ��ȡ�����׺
    if (tempMachineno != machineno && tempMachineno.length > 4) {
        tmpSuffix = "@" + tempMachineno.substr(tempMachineno.length - 4); //�����ź���λ��Ϊ�����׺
    }
    if (tempMachineno.indexOf("@") != -1) tmpSuffix = tempMachineno; //������ֱ����Ϊ�����׺
    return tmpSuffix;
	}
};
var term = {
	account: '',
	password: '',
	type: 2,
	// �����豸:0-������1-PC��2-�ֻ���3-ƽ��
	ip: '000.000.000.000',
	ipv6: '',
	mac: '000000000000',
	vlan: 1,
	wlanacip: '000.000.000.000',
	wlanacname: '',
	wlanacmac: '000000000000',
	apmac:'000000000000',
	time:'',
	ssid: '',
	areaID: '',
	online: {},
	redirect:'',
	suffix:'',
	/*  
	 * �����ն���صĲ���
	 */
	init: function(_kind, next) {
		this.type = util.getTermType();
		this.ip = util.getQueryString('ip', 'wlanuserip', 'userip', 'user-ip', 'UserIP', 'uip', 'station_ip') || (typeof(v46ip)!='undefined'?v46ip:false) || (typeof(ss5)!='undefined'?ss5:false) || (typeof(v4ip)!='undefined'?v4ip:false) || (typeof(ss3)!='undefined'?util.hex16ToString(ss3):'000.000.000.000');
		this.mac = (util.getQueryString('mac', 'usermac', 'wlanusermac', 'umac', 'client_mac', 'station_mac') || (typeof(ss4)!='undefined'?ss4:false) || (typeof(olmac)!='undefined'?olmac:false) || '000000000000').replace(/[\-\:]/g, '');
		this.vlan = util.getQueryString('vlan', 'vlanid') || (typeof(vlanid) != 'undefined' ? vlanid: 1);
		this.session = util.getQueryString('session') || ((typeof(ss3) != 'undefined' && typeof(ss4) != 'undefined' && typeof(ss2) != 'undefined') ? ss3 + "-" + ss4 + "-" + ss2: "");
		this.wlanacip = util.getQueryString('wlanacip','acip','switchip','nasip','nas-ip') || '';
		this.wlanacname = util.getQueryString('wlanacname','sysname','nasname','nas-name') || '';
		this.wlanacmac = (util.getQueryString('wlanacmac','gw_mac') || '000000000000').replace(/[\-\:]/g, '');
		this.apmac = (util.getQueryString('apmac','ap_mac') || '000000000000').replace(/[\-\:]/g, '');
		this.ssid = util.getQueryString('ssid','essid') || '';
		this.areaID = util.getQueryString('areaID') || '';
		this.redirect = util.getQueryString('redirect','redirect-url','desurl','url','originalUrl','success_url', 'Original_url') || '';
		var me = this;
		// eduroam ���ҳ��a27.htm ֱ�Ӷ�����ip��ͨ��checkstatus �ӿڻ�ȡ
		if(_kind == 'eduroam' || _kind == 27){
			var url = page.path + 'chkstatus';
			util._jsonp({
				url: url,
				time:5000,
				success: function(json) {
					me.ip = util.getQueryString('ip', 'wlanuserip', 'userip', 'user-ip', 'UserIP', 'uip', 'station_ip')  || (typeof(json.v46ip)!='undefined'?json.v46ip:false) || (typeof(json.ss5)!='undefined'?json.ss5:false) || (typeof(json.v4ip)!='undefined'?json.v4ip:false) || (typeof(json.ss3)!='undefined'?util.hex16ToString(json.ss3):'000.000.000.000')
					me.mac =  (util.getQueryString('mac', 'usermac', 'wlanusermac', 'umac', 'client_mac', 'station_mac') || (typeof(json.ss4)!='undefined'?json.ss4:false) || (typeof(json.olmac)!='undefined'?json.olmac:false) || '000000000000').replace(/[\-\:]/g, '');
					me.vlan = util.getQueryString('vlan', 'vlanid') || (typeof(json.vlanid) != 'undefined' ? json.vlanid: 0);
					me.page_type_data(_kind,next);
				},
				error: function(){
					me.page_type_data(_kind,next);
				}
			});
		}else{
			me.page_type_data(_kind,next);
		}
	},
	page_type_data: function(_kind,next){
		var url = page.eportal + '?c=Portal&a=page_type_data';
		util._jsonp({
			url: url,
			success: function(json) {
				if (json.result == 1) { // �ɹ�
					 term.time =  json.time;
				}
				next();
			},
			error: function(){
				next();
			}
		});	
	},
};