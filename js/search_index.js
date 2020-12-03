'use strict';

function lmDomainChanged(e) {
  switch (e.target.value) {
    case 'qq':
      window.open('https://mail.qq.com');
      break;
  }
}

function getWeather() {
  var city = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  $.ajax({
    url: '/statics/Weather.php',
    data: {
      city: city
    },
    dataType: 'json',
    type: 'get',
    success: function success(res) {
      var today = res.weathers.daily[0];
      var tomorrow = res.weathers.daily[1];
      var city = res.city;

      document.querySelector('.area > span').innerHTML = city;

      document.querySelector('.weather.today .text').innerHTML = today.text_day;
      document.querySelector('.weather.today .temperature').innerHTML = today.low + '~' + today.high + '\u2103';
      document.querySelector('.weather.today img').src = getWeatherImg(today.text_day);

      document.querySelector('.weather.tomorrow .text').innerHTML = tomorrow.text_day;
      document.querySelector('.weather.tomorrow .temperature').innerHTML = tomorrow.low + '~' + tomorrow.high + '\u2103';
      document.querySelector('.weather.tomorrow img').src = getWeatherImg(tomorrow.text_day);
	  
	  $('#weathershow').show();
    }
  });
}

function getWeatherImg(weather) {
  var img = '/assets/images/weather';
  if (weather.indexOf('多云') !== -1 || weather.indexOf('晴') !== -1) {
    img += '/3.png';
  } else if (weather.indexOf('多云') !== -1 && weather.indexOf('阴') !== -1) {
    img += '/1.png';
  } else if (weather.indexOf('阴') !== -1 && weather.indexOf('雨') !== -1) {
    img += '/7.png';
  } else if (weather.indexOf('晴') !== -1 && weather.indexOf('雨') !== -1) {
    img += '/6.png';
  } else if (weather.indexOf('晴') !== -1 && weather.indexOf('雾') !== -1) {
    img += '/19.png';
  } else if (weather.indexOf('晴') !== -1) {
    img += '/0.png';
  } else if (weather.indexOf('多云') !== -1) {
    img += '/2.png';
  } else if (weather.indexOf('雷阵雨') !== -1) {
    img += '/4.png';
  } else if (weather.indexOf('阵雨') !== -1) {
    img += '/7.png';
  } else if (weather.indexOf('小雨') !== -1) {
    img += '/7.png';
  } else if (weather.indexOf('中雨') !== -1) {
    img += '/7.png';
  } else if (weather.indexOf('大雨') !== -1) {
    img += '/8.png';
  } else if (weather.indexOf('暴雨') !== -1) {
    img += '/8.png';
  } else if (weather.indexOf('冰雹') !== -1) {
    img += '/17.png';
  } else if (weather.indexOf('小雪') !== -1) {
    img += '/9.png';
  } else if (weather.indexOf('中雪') !== -1) {
    img += '/10.png';
  } else if (weather.indexOf('大雪') !== -1) {
    img += '/11.png';
  } else if (weather.indexOf('暴雪') !== -1) {
    img += '/11.png';
  } else if (weather.indexOf('扬沙') !== -1) {
    img += '/18.png';
  } else if (weather.indexOf('沙尘') !== -1) {
    img += '/18.png';
  } else if (weather.indexOf('风') !== -1) {
    img += '/18.png';
  } else if (weather.indexOf('雾') !== -1) {
    img += '/19.png';
  } else {
    img += '/1.png';
  }

  return img;
}

function doSearch() {
  var keyword = document.getElementById('search-keyword').value.trim();
  var searchSite = document.querySelector('.search > .se_nav > a.on').attributes.site.value;

  console.log(keyword, searchSite);

  switch (searchSite) {
    case 'baidu':
      window.open('https://www.baidu.com/s?word=' + encodeURI(keyword));
      break;
    case 'so':
      window.open('https://www.so.com/s?q=' + encodeURI(keyword));
      break;
    case 'baidu-image':
      window.open('https://image.baidu.com/search/index?tn=baiduimage&word=' + encodeURI(keyword));
      break;
    case 'baidu-music':
      window.open('http://music.taihe.com/search?key=' + encodeURI(keyword));
      break;
    case 'baidu-video':
      window.open('http://v.baidu.com/v?word=' + encodeURI(keyword) + '&ie=utf-8');
      break;
    case 'taobao':
      window.open('https://s.taobao.com/search?q=' + encodeURI(keyword));
      break;
    case 'jd':
      window.open('https://search.jd.com/Search?enc=utf-8&keyword=' + encodeURI(keyword));
      break;
  }
}

function lm(e) {
  var loginMailForm = document.loginMailForm;
  var username = loginMailForm.emailUsername;
  var password = loginMailForm.emailPassword;
  var domain = loginMailForm.emailDomain;

  if (!username.value) {
    alert('请输入用户名');
    return false;
  }
  if (!password.value) {
    alert('请输入密码');
    return false;
  }

  switch (domain.value) {
    case '163':
      loginMailForm.action = 'http://reg.163.com/CheckUser.jsp';
      setVal('url', 'http://entry.mail.163.com/coremail/fcg/ntesdoor2?lightweight=1&verifycookie=1&language=-1&style=15');
      if (username.value.slice(username.value.lastIndexOf('@')) === '@163.com') {
        setVal('username', username.value);
      } else {
        setVal('username', username.value + '@163.com');
      }
      setVal('password', password.value);
      break;
    case '126':
      loginMailForm.action = 'https://reg.163.com/logins.jsp?type=1&product=mail126&url=http://entry.mail.126.com/cgi/ntesdoor?lightweight%3D1%26verifycookie%3D1%26language%3D0%26style%3D-1';
      setVal('domain', '126.com');
      if (username.value.slice(username.value.lastIndexOf('@')) === '@126.com') {
        setVal('username', username.value);
      } else {
        setVal('username', username.value + '@126.com');
      }
      setVal('password', password.value);
      break;
    case 'vip163':
      loginMailForm.action = 'https://ssl1.vip.163.com/logon.m?language=-1&style=-1';
      if (username.value.slice(username.value.lastIndexOf('@')) === '@vip.163.com') {
        setVal('username', username.value);
      } else {
        setVal('username', username.value + '@vip.163.com');
      }
      setVal('password', password.value);
      setVal('enterVip', 'true');
      break;
    case 'sohu':
      loginMailForm.action = 'http://passport.sohu.com/login.jsp';
      if (username.value.slice(username.value.lastIndexOf('@')) === '@sohu.com') {
        setVal('loginid', username.value);
      } else {
        setVal('loginid', username.value + '@sohu.com');
      }
      setVal('appid', '1000');
      setVal('ct', '1173080990');
      setVal('fl', '1');
      setVal('ru', 'http://login.mail.sohu.com/servlet/LoginServlet');
      setVal('sg', '5082635c77272088ae7241ccdf7cf062');
      setVal('vr', '1|1');
      setVal('passwd', password.value);
      break;
    case 'tom':
      loginMailForm.action = 'http://web.mail.tom.com/webmail/login/loginServicePost.action';
      if (username.value.slice(username.value.lastIndexOf('@')) === '@tom.com') {
        setVal('username', username.value);
      } else {
        setVal('username', username.value + '@tom.com');
      }
      setVal('password', password.value);
      break;
    case '21cn':
      loginMailForm.action = 'http://passport.21cn.com/maillogin.jsp';
      setVal('LoginName', username.value);
      setVal('passwd', password.value);
      setVal('domainname', '21cn.com');
      if (username.value.slice(username.value.lastIndexOf('@')) === '@21cn.com') {
        setVal('UserName', username.value);
      } else {
        setVal('UserName', username.value + '@21cn.com');
      }
      break;
    case 'sina':
      loginMailForm.action = 'https://login.sina.com.cn/sso/login.php';
      setVal('encoding', 'UTF-8');
      setVal('entry', 'freemail');
      setVal('gateway', '0');
      setVal('returntype', 'META');
      setVal('url', 'http://mail.sina.com.cn/');
      if (username.value.slice(username.value.lastIndexOf('@')) === '@sina.com') {
        setVal('username', username.value);
      } else {
        setVal('username', username.value + '@sina.com');
      }
      setVal('password', password.value);
      break;
    case 'yeah':
      loginMailForm.action = 'https://reg.163.com/logins.jsp?type=1&product=mailyeah&url=http://entry.mail.yeah.net/cgi/ntesdoor?lightweight%3D1%26verifycookie%3D1%26style%3D-1';
      setVal('domain', 'yeah.net');
      if (username.value.slice(username.value.lastIndexOf('@')) === '@yeah.net') {
        setVal('username', username.value);
      } else {
        setVal('username', username.value + '@yeah.net');
      }
      setVal('password', password.value);
      break;
    case 'vipsina':
      loginMailForm.action = 'http://vip.sina.com.cn/cgi-bin/login.php';
      setVal('domain', 'vip.sina.com');
      if (username.value.slice(username.value.lastIndexOf('@')) === '@vip.sina.com') {
        setVal('u', username.value);
      } else {
        setVal('u', username.value + '@vip.sina.com');
      }
      setVal('psw', password.value);
      break;
    case '189':
      loginMailForm.action = 'http://mail.189.cn/webmail/login2.perform';
      setVal('domain', 'mail.189.cn');
      setVal('UserName', username.value);
      setVal('passwd', password.value);
      break;
  }

  password.value = '';

  return true;
}

/**
 * 设置loginMailForm表单的隐藏值
 * @param name 表单值的名称
 * @param value 表单值得值
 */
function setVal(name, value) {
  var ele = document.getElementById('__' + name);

  if (!ele) {
    ele = document.createElement('input');
    ele.type = 'hidden';
    ele.id = '__' + name;
    ele.name = name;
    document.getElementById('loginMailHiddenBox').appendChild(ele);
  }

  ele.value = value;
}