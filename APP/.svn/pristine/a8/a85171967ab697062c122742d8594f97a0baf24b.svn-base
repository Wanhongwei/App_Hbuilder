(function($, doc) {
	$.init({
		statusBarBackground: '#f7f7f7'
	});
	$.plusReady(function() {
		//判断用户是否有登录过
    	let userAccount = $method.$getItem('userAccount');
    	if(Object.prototype.toString.call(userAccount) === "[object Object]"){
    		if(Object.keys(userAccount).length !== 0){
				doc.getElementById('account').value = userAccount.loginName;
				doc.getElementById('password').value = userAccount.loginPwd;
    			submits(userAccount);
    		}
    	}
		
		plus.screen.lockOrientation("portrait-primary");
		var settings = app.getSettings();
		var state = app.getState();
		var mainPage = plus.webview.getWebviewById("main");
		var main_loaded_flag = false;
		if(!mainPage){
			mainPage = $.preload({
				"id": 'main',
				"url": '../main.html'
			});
		}else{
			main_loaded_flag = true;
		}
		mainPage.addEventListener("loaded",function () {
			main_loaded_flag = true;
		});
		var toMain = function() {
			//使用定时器的原因：
			//可能执行太快，main页面loaded事件尚未触发就执行自定义事件，此时必然会失败
			var id = setInterval(function () {
				if(main_loaded_flag){
					clearInterval(id);
					$.fire(mainPage, 'show', null);
					mainPage.show("pop-in");
				}
			},20);
		};
		//检查 "登录状态/锁屏状态" 开始
//					if (settings.autoLogin && state.token && settings.gestures) {
//						$.openWindow({
//							url: 'unlock.html',
//							id: 'unlock',
//							show: {
//								aniShow: 'pop-in'
//							},
//							waiting: {
//								autoShow: false
//							}
//						});
//					} else if (settings.autoLogin && state.token) {
//						toMain();
//					}
		// close splash
		setTimeout(function() {
			//关闭 splash
			plus.navigator.closeSplashscreen();
		}, 600);
		//检查 "登录状态/锁屏状态" 结束
		var loginButton = doc.getElementById('login');
		var accountBox = doc.getElementById('account');
		var passwordBox = doc.getElementById('password');
//					var autoLoginButton = doc.getElementById("autoLogin");
//					var regButton = doc.getElementById('reg');
//					var forgetButton = doc.getElementById('forgetPassword');
		loginButton.addEventListener('tap', function(event) {
			let userInfo = {
				loginName: accountBox.value,
				loginPwd: passwordBox.value,
				userType:"C",	
			};
			userInfo = userInfo || {};
			userInfo.loginName = userInfo.loginName || '';
			userInfo.loginPwd = userInfo.loginPwd || '';
			if (userInfo.loginName.length < 3) {
				return plus.nativeUI.toast('账号最短为 3个字符');
			}
			if (userInfo.loginPwd.length < 6) {
				return plus.nativeUI.toast('密码最短为 6 个字符');
			}
			submits(userInfo);
		});

		function submits(userInfo){
			mui.$ajax('post',{
				url:"login",
				data:userInfo,
				success:function(data){
					$method.$setItem('userAccount',userInfo);
					$method.$setItem('userInfo',data.data);
					$.openWindow({
						url: '../main.html',
						id: 'main',
						preload: true,
						show: {
							aniShow: 'pop-in'
						},
						styles: {
							popGesture: 'hide'
						},
						waiting: {
							autoShow: false
						}
					});
				}
			});
		}
		
		$.enterfocus('#login-form input', function() {
			$.trigger(loginButton, 'tap');
		});
//					autoLoginButton.classList[settings.autoLogin ? 'add' : 'remove']('mui-active')
//					autoLoginButton.addEventListener('toggle', function(event) {
//						setTimeout(function() {
//							var isActive = event.detail.isActive;
//							settings.autoLogin = isActive;
//							app.setSettings(settings);
//						}, 50);
//					}, false);
//					regButton.addEventListener('tap', function(event) {
//						$.openWindow({
//							url: 'reg.html',
//							id: 'reg',
//							preload: true,
//							show: {
//								aniShow: 'pop-in'
//							},
//							styles: {
//								popGesture: 'hide'
//							},
//							waiting: {
//								autoShow: false
//							}
//						});
//					}, false);
//					forgetButton.addEventListener('tap', function(event) {
//						$.openWindow({
//							url: 'forget_password.html',
//							id: 'forget_password',
//							preload: true,
//							show: {
//								aniShow: 'pop-in'
//							},
//							styles: {
//								popGesture: 'hide'
//							},
//							waiting: {
//								autoShow: false
//							}
//						});
//					}, false);
		//
		var backButtonPress = 0;
		$.back = function(event) {
			backButtonPress++;
			if (backButtonPress > 1) {
				plus.runtime.quit();
			} else {
				plus.nativeUI.toast('再按一次退出应用');
			}
			setTimeout(function() {
				backButtonPress = 0;
			}, 1000);
			return false;
		};
	});
}(mui, document));