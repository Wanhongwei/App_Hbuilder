(function($, window) {
//	console.log(window.location.href);
//	let a = document.createElement('a');
//	a.href="components/login/login.html";
//	a.click();
	var setting=localStorage.getItem('$settings');
	$.baseUrl='http://'+JSON.parse(setting).ip+':'+JSON.parse(setting).port+'/webapi/'
	//显示加载框
    $.showLoading = function(message,type) {
        if ($.os.plus && type !== 'div') {
            $.plusReady(function() {
                plus.nativeUI.showWaiting(message);
            });
        } else {
            var html = '';
            html += '<i class="mui-spinner mui-spinner-white"></i>';
            html += '<p class="text">' + (message || "数据加载中") + '</p>';

            //遮罩层
            var mask=document.getElementsByClassName("mui-show-loading-mask");
            if(mask.length==0){
                mask = document.createElement('div');
                mask.classList.add("mui-show-loading-mask");
                document.body.appendChild(mask);
                mask.addEventListener("touchmove", function(e){e.stopPropagation();e.preventDefault();});
            }else{
                mask[0].classList.remove("mui-show-loading-mask-hidden");
            }
            //加载框
            var toast=document.getElementsByClassName("mui-show-loading");
            if(toast.length==0){
                toast = document.createElement('div');
                toast.classList.add("mui-show-loading");
                toast.classList.add('loading-visible');
                document.body.appendChild(toast);
                toast.innerHTML = html;
                toast.addEventListener("touchmove", function(e){e.stopPropagation();e.preventDefault();});
            }else{
                toast[0].innerHTML = html;
                toast[0].classList.add("loading-visible");
            }
        }   
    };

    //隐藏加载框
      $.hideLoading = function(callback) {
        if ($.os.plus) {
            $.plusReady(function() {
				plus.nativeUI.closeWaiting();
            });
        } 
        var mask=document.getElementsByClassName("mui-show-loading-mask");
        var toast=document.getElementsByClassName("mui-show-loading");
        if(mask.length>0){
            mask[0].classList.add("mui-show-loading-mask-hidden");
        }
        if(toast.length>0){
            toast[0].classList.remove("loading-visible");
            callback && callback();
        }
      }
      
      
    $.uploadImg=function(url,formData,callback){
		var xhr = new XMLHttpRequest();xhr.open("post",window.$method.baseUrl+url);
		xhr.send(formData);
		xhr.onreadystatechange=function(data){  //事件监听请求执行到哪一步
		   	if(xhr.readyState===4){
		       	if(xhr.status===200){
        			callback(data);
		       	}
		  	}
		};
//		xhr.start();
    }
    
  // 	$.$ajax = function(type = "get",obj = {
  // 		url:"",
  // 		data:{},
  // 		success:function(){},
  // 		error:function(){},
  // 		loading:true,
  // 	},ContentType){
  // 		if(obj.loading === undefined || obj.loading){
  // 			mui.showLoading("正在加载..","div");
  // 		}
		// mui.ajax({
		//     url: window.$method.baseUrl + obj.url,
		//     type: type,
		//     data: obj.data,
		//     headers:{
		//     	'Content-Type':ContentType || 'application/json'
		//     },
		//     success: function(data) {
		//     	if(obj.loading === undefined || obj.loading){
		//   			mui.hideLoading();
		//   		}
		//         if(data.code === 0){
		// 	        obj.success(data);
		//         }else if(data.code === 998){
	 //        		mui.toast(data.message,{ duration:'long', type:'div' });

		// 			var wvB=plus.webview.currentWebview();//获取当前窗口的WebviewObject对象，即B  
		//             var wvA=wvB.opener();//获取当前窗口的创建者，即A  
		//             wvB.close();//关闭B
		//         }else {
		//         	mui.toast(data.message,{ duration:'long', type:'div' });
		// 	        try{
		// 	        	obj.error(data);
		// 	        } catch (error) {
  //           			console.log(error);
  //   				}
		//         }
		//     },
		//     error: function(xhr, type, errorThrown) {
		//         // 请求失败
		//     	if(obj.loading === undefined || obj.loading){
		//   			mui.hideLoading();
		//   		}
		//         mui.toast("当前网络异常，请刷新重试。",{ duration:'long', type:'div' }) 
		//     }
		// });
  // 	}
  
  /**
   * ajax封装
   * 
   */
   mui.extend({
         ajaxRequest: function(url , options){
             var defaults = commonDefaules(options);
             var options = mui.extend(defaults, options);
             options.beforeSend = defaults.onBeforeSend;
             options.success = defaults.onSuccess;
             options.error = defaults.onError;
			 // console.log(JSON.stringify(options))
             mui.ajax($.baseUrl+url, options);
        } 
     })
	function commonDefaules(options){
	      //默认参数定义
	      var defaults = {
	        dataType: "json",
	        type: "post",
	        timeout: 10000,
	        wait: true,
	        waitMessage: "努力加载中...",
	        onBeforeSend : function(xhr){
	           if(defaults.wait == true){
				   // $.showLoading("正在加载..","div");
	              // $.showLoading(defaults.waitMessage);
	       }
	           if(options.beforeSend){
	             options.beforeSend(xhr);
	           }
	        },
	        onSuccess : function(data){
	           if(defaults.wait == true){
	              $.hideLoading();
	           }
	           //后台抛出Exception异常的情况
	           if(data && data.exceptionType && (data.exceptionType.indexOf("class com.frame.modules.base.exceptions.") != -1)){
	              plus.nativeUI.alert(data.message , function(){} , "提示：" , "取消");
	              return;
	           }
	           if(data && data.result && (data.result === "input")){
	              plus.nativeUI.alert(data.message , function(){} , "提示：" , "取消");
	              return;
	           }
	           if(options.success){
	              options.success(data);
	            }
	        },
	        onError : function(xhr,type,errorThrown){
	           $.hideLoading();
	           if(options.error){
	              options.error(xhr,type,errorThrown);
	         }
	        }
	      };
	      return defaults;
	   } 
})(mui, window);

