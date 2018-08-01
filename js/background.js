var onClickHandler = function (info, tab) {
    var data = "";
    if (info.menuItemId == "tinytools-page") {
        data = info.pageUrl;
    } else if (info.menuItemId == "tinytools-selection") {
        data = info.selectionText;
    } else if (info.menuItemId == "tinytools-link") {
        data = info.linkUrl;
    }
    data = data.replace(/"/g, '\\"');
    /*chrome.tabs.executeScript(tab.id, {"code": "typeof buildqrcode"}, function (context) {
        if (context && context[0] == "undefined") {
            chrome.tabs.executeScript(tab.id, {"file": "js/jquery.min.js"}, function () {
                chrome.tabs.executeScript(tab.id, {"file": "js/jquery.qrcode.js"}, function () {
                    chrome.tabs.executeScript(tab.id, {"file": "js/common.js"}, function () {
                        chrome.tabs.executeScript(tab.id, {"code": "buildqrcode(\"" + data + "\");"});
                    });
                });
            });
        } else {
            chrome.tabs.executeScript(tab.id, {"code": "buildqrcode(\"" + data + "\");"});
        }
    });*/
};

var onInstallHandler = function () {
    var contexts = ["page", "selection", "link"];
    var texts = ["当前页面", "所选文本", "所选链接"];
    for (var i = 0; i < contexts.length; i++) {
        var title = "为" + texts[i] + "生成二维码";
        var context = contexts[i];
        //chrome.contextMenus.create({"title": title, "contexts": [context], "id": "tinytools-" + context});
    }
};

var onBeforeRequestHandler = function (details) {
    var url = details.url;
    var domain = url.match(/^(http|https)\:\/\/([a-zA-Z0-9\.\-])+/g);
    var judge = false;
    var replaceobj = {
        'fonts.googleapis.com': 'fonts.lug.ustc.edu.cn',
        'ajax.googleapis.com': 'ajax.lug.ustc.edu.cn',
        'themes.googleusercontent.com': 'google-themes.lug.ustc.edu.cn',
        'fonts.gstatic.com': 'fonts-gstatic.lug.ustc.edu.cn',
        'www.gravatar.com': 'gravatar.lug.ustc.edu.cn'
    };
    var search = "";
    for (var key in replaceobj) {
        if (replaceobj.hasOwnProperty(key)) {
            judge = domain && domain[0].indexOf(key) > -1;
            if (judge) {
                search = key;
                break;
            }
        }
    }

    if (judge) {
        url = url.replace(search, replaceobj[search]);
        return {redirectUrl: url};
    }
};

//添加右键菜单事件
//chrome.contextMenus.onClicked.addListener(onClickHandler);
//添加事件
//chrome.runtime.onInstalled.addListener(onInstallHandler);
//替换GoogleAPI https://servers.blog.ustc.edu.cn/2015/09/google-revproxy-add-cache/
//chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestHandler, {urls: ["<all_urls>"]}, ["blocking"]);

//创建右键菜单
function genericOnClick(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
    if (info.menuItemId == "OfficialWebsite") {
        window.open("https://www.anooc.com","_blank");
    }else if(info.menuItemId == "OfficialWebsiteAdmin"){
        window.open("https://www.anooc.com/admin/index","_blank");
    }else if(info.menuItemId == "phone"){
        window.open("https://www.anooc.com/ts/phone","_blank");
    }else if(info.menuItemId == "wangbian"){
        window.open("https://www.anooc.com/ts/wangbian","_blank");
    }else if(info.menuItemId == "ip"){
        window.open("https://www.anooc.com/ts/ip","_blank");
    }else if(info.menuItemId == "md5"){
        window.open("https://www.anooc.com/ts/md5","_blank");
    }else if(info.menuItemId == "jsonFormat"){
        window.open("https://www.anooc.com/ts/json","_blank");
    }
    
  }
  
  // Create one test item for each context type.
  var contexts = ["page","selection","link","editable","image","video",
                  "audio"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var id = chrome.contextMenus.create({"title": "官网", "contexts":[context],
                                         "onclick": genericOnClick,"id":"OfficialWebsite"});
    console.log("'" + context + "' item:" + id);
  }
  
  //创建后台
  var adminId = chrome.contextMenus.create({"title": "管理后台","id":"OfficialWebsiteAdmin","onclick": genericOnClick});

  // Create a parent item and two children.
  var parent = chrome.contextMenus.create({"title": "常用工具"});
  var child1 = chrome.contextMenus.create(
    {"id":"phone","title": "手机号归属地查询", "parentId": parent, "onclick": genericOnClick});
  var child2 = chrome.contextMenus.create(
    {"id":"wangbian","title": "超级网络编辑工具", "parentId": parent, "onclick": genericOnClick});
  var child3 = chrome.contextMenus.create(
        {"id":"ip","title": "IP查询", "parentId": parent, "onclick": genericOnClick});
  var child4 = chrome.contextMenus.create(
            {"id":"md5","title": "md5加密解密", "parentId": parent, "onclick": genericOnClick});
  var child5 = chrome.contextMenus.create(
        {"id":"jsonFormat","title": "Json格式化", "parentId": parent, "onclick": genericOnClick});

//版本信息
var parent = chrome.contextMenus.create({"title": "关于AnoocTool"});
var child1 = chrome.contextMenus.create(
  {"title": "官网:www.anooc.com", "parentId": parent, "onclick": genericOnClick});
var child2 = chrome.contextMenus.create(
  {"title": "作者:邹慧刚", "parentId": parent, "onclick": genericOnClick});
var child3 = chrome.contextMenus.create(
    {"title": "联系方式:zouhuigang888@gmail.com", "parentId": parent, "onclick": genericOnClick});
var child4 = chrome.contextMenus.create(
        {"title": "版本号:1.0.0", "parentId": parent, "onclick": genericOnClick});


//=================通知=======================
 /* function showNofity(body){
    var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
    var hour = time[1] % 12 || 12;               // The prettyprinted hour.
    var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
    new Notification(hour + time[2] + ' ' + period, {
      icon: '/img/icons/png/Compas.png',
      body: body
    });
}
  
  // Conditionally initialize the options.
  if (!localStorage.isInitialized) {
    localStorage.isActivated = true;   // The display activation.
    localStorage.frequency = 1;        // The display frequency, in minutes.
    localStorage.isInitialized = true; // The option initialization.
  }
  
  // Test for notification support.
if (window.Notification) {
    // While activated, show notifications at the display frequency.
    if (JSON.parse(localStorage.isActivated)) { showNofity("改写代码了，同学"); }
  
    var interval = 0; // The display interval, in minutes.
  
    setInterval(function() {
      interval++;
  
      if (
        JSON.parse(localStorage.isActivated) &&
          localStorage.frequency <= interval
      ) {
        showNofity("改写代码了，同学");
        interval = 0;
      }
    }, 60000);
  }
*/
