
function Method(){
//	this.baseUrl = "http://192.168.1.158:8090/";
	// this.baseUrl = "http://localhost:8080/";
//	 this.baseUrl = "http://192.168.1.10:8090/";
	
}

Method.prototype.ifRes = function (res) {
  if (res.data.code == 0) {
    return true;
  } else {
    mui.toast(res.data.message);
    return false;
  }
}
Method.prototype.isEmptyObject = function (obj) {
  let hasattr = false;
  for (let key in obj) {
    hasattr = true;
    break;
  }
  return hasattr;
}

Method.prototype.$pad = function (num, n) {
  let data = Array(n).join(0) + num;
  return data.slice(-n);
};
Method.prototype.$timeTransition = function (dates) {
  let time = new Date(dates);
  return time.getFullYear() + '-' + this.$pad((time.getMonth() + 1), 2) + '-' + this.$pad(time.getDate(), 2);
  // return
};
Method.prototype.$getDot = function (obj, str) {
  str = str.split('.');
  //根据mid请求到的data
  let data = obj;
  for (let i = 0, leng = str.length; i < leng; i++) {
    if( data  === null ){
      data = {};
      
    }
    data = data[str[i]];
  }
  return data;
}
Method.prototype.$setDot = function (obj, str, val) {
  str = str.split('.');
  let _ = null;
  for (let i = 0, leng = str.length; i < leng; i++) {

    if (i === leng - 1) {

      obj[str[i]] = val;

    }
  }
  return obj;
}
Method.prototype.$setItem = function (name, data) {
	console.log(data);
  	this.$IE();
	var base = new Base64();
	var result = base.encode(JSON.stringify(data));
	console.log(result);
  	localStorage.setItem(name, result);
}
Method.prototype.$getItem = function (name) {
  	this.$IE();
	var base = new Base64();
  	let data = localStorage.getItem(name);
  	if (data !== null && data !== undefined && data !== "") {
	    data = JSON.parse(base.decode(data));
	    return data;
  	}
}
Method.prototype.$IE = function(){
  if(!window.localStorage){
    console.log('当前浏览器不支持 window.localStorage方法');
  }
}

Method.prototype.$scroll = function() {
  return {
      top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
      left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
  }
}

Method.prototype.$regular = function() {
  return {
    integerThanZero:  /^[1-9]\d*$/,
    rightTcode: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,8}$/,
    doubleNumMaxSix: /^[+-]?\d+(\.\d{1,6})?$/
  }
}

function Base64() {
    // private property  
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  
    // public method for encoding  
    this.encode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = _utf8_encode(input);  
        while (i < input.length) {  
            chr1 = input.charCodeAt(i++);  
            chr2 = input.charCodeAt(i++);  
            chr3 = input.charCodeAt(i++);  
            enc1 = chr1 >> 2;  
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
            enc4 = chr3 & 63;  
            if (isNaN(chr2)) {  
                enc3 = enc4 = 64;  
            } else if (isNaN(chr3)) {  
                enc4 = 64;  
            }  
            output = output +  
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
        }  
        return output;  
    }  

    // public method for decoding  
    this.decode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3;  
        var enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
        while (i < input.length) {  
            enc1 = _keyStr.indexOf(input.charAt(i++));  
            enc2 = _keyStr.indexOf(input.charAt(i++));  
            enc3 = _keyStr.indexOf(input.charAt(i++));  
            enc4 = _keyStr.indexOf(input.charAt(i++));  
            chr1 = (enc1 << 2) | (enc2 >> 4);  
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
            chr3 = ((enc3 & 3) << 6) | enc4;  
            output = output + String.fromCharCode(chr1);  
            if (enc3 != 64) {  
                output = output + String.fromCharCode(chr2);  
            }  
            if (enc4 != 64) {  
                output = output + String.fromCharCode(chr3);  
            }  
        }  
        output = _utf8_decode(output);  
        return output;  
    }  

    // private method for UTF-8 encoding  
    var _utf8_encode = function (string) {  
        string = string.replace(/\r\n/g,"\n");  
        var utftext = "";  
        for (var n = 0; n < string.length; n++) {  
            var c = string.charCodeAt(n);  
            if (c < 128) {  
                utftext += String.fromCharCode(c);  
            } else if((c > 127) && (c < 2048)) {  
                utftext += String.fromCharCode((c >> 6) | 192);  
                utftext += String.fromCharCode((c & 63) | 128);  
            } else {  
                utftext += String.fromCharCode((c >> 12) | 224);  
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
                utftext += String.fromCharCode((c & 63) | 128);  
            }  

        }  
        return utftext;  
    }  

    // private method for UTF-8 decoding  
    var _utf8_decode = function (utftext) {  
        var string = "";  
        var i = 0;  
        var c,c1,c2,c3; 

        while ( i < utftext.length ) {  
            c = utftext.charCodeAt(i);  
            if (c < 128) {  
                string += String.fromCharCode(c);  
                i++;  
            } else if((c > 191) && (c < 224)) {  
                c2 = utftext.charCodeAt(i+1);  
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
                i += 2;  
            } else {  
                c2 = utftext.charCodeAt(i+1);  
                c3 = utftext.charCodeAt(i+2);  
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
                i += 3;  
            }  
        }  
        return string;  
    }  
}

Method.prototype.$canvasDataURL = (path, obj, callback)=>{
    var img = new Image();
    img.src = path;
    img.onload = function(){
        var that = this;
        // 默认按比例压缩
        var w = that.width,
            h = that.height,
            scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        var quality = 0.7;  // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if(obj.quality && obj.quality <= 1 && obj.quality > 0){
            quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback(base64);
    }
}

Method.prototype.$dataURLtoFile = (dataurl, filename)=>{
	var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],      
	bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);      
	while(n--){          
		u8arr[n] = bstr.charCodeAt(n);      
	}      
	return new File([u8arr], filename, {type:mime});  
}

window.$method = new Method();