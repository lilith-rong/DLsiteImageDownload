// ==UserScript==
// @name         自动下载DLsite商品界面图片
// @version      0.8
// @description  提取Id，title以及下载url，来下载相关文件，需要修改油猴脚本设置里面的下载模式为api模式，否则无法生成文件夹
// @author       yuewuliuying
// ==/UserScript==

(function() {
    'use strict';

    //自定义下载函数
	function downloadImages(Id, Title, srcArray) {
		//调用Google Chrome后端action来下载相关内容
		const folderName = `[${Id}]${Title}`;
		chrome.runtime.sendMessage({
			action: "DownloadDLsiteImage",
			folderName: folderName,
			srcArray: srcArray
		});
	}

//运行入口
    //定义空变量
    var Id = "";//内容的编号
    var Title = "";//内容的标题
    const srcArray = [];// 初始化一个空数组来存储图片的url

     // 获取当前页面的 URL，从而获得游戏的Id编号
    const currentURL = window.location.href;
    const matchResult = currentURL.match(/\/product_id\/([A-Za-z0-9]+)/);
    if (matchResult) {
        // 提取的值存储在 matchResult[1] 中
        Id = matchResult[1];
    }

    //提取DLsite上的游戏的标题信息
    const h1Element = document.querySelector('h1[itemprop="name"]');
    if (h1Element) {
        // 提取<h1>元素的文本内容并存储在变量中
        Title = h1Element.textContent.trim();
    }

    // 获取包含data-src的元素，所有的图片的地址
    const Picelements = document.querySelectorAll('.product-slider-data div[data-src]');
    // 遍历元素并将data-src内容添加到数组中
    Picelements.forEach(element => {
        const src = 'https:' + element.getAttribute('data-src');
        srcArray.push(src);
    });

    //调用下载函数下载到本地文件夹
    //downloadImages(Id, Title, srcArray);
    // 控制台输出调试，查看是否获取了需要的相关信息
    //console.log(Id);
    //console.log(Title);
    //console.log(srcArray);

    //网页增加按钮
    const button = document.createElement('button');
    button.textContent = '下载图片'; // 按钮上显示的文本
    button.style.backgroundColor = '#53F3F0E6'; //
    button.style.color = 'white'; // 按钮的文本颜色
    button.style.padding = '10px'; // 按钮的内边距
    button.style.borderRadius = '5px'; // 设置边框圆角半径，可以根据需要调整值

    // 添加按钮点击事件监听器
    button.addEventListener('click', function() {
        //修改button的文字内容
        button.textContent = '正在下载'
        //调用下载函数
        downloadImages(Id, Title, srcArray);
        // 改变按钮的颜色（例如，将背景颜色改为红色）
        button.style.backgroundColor = 'blue'; // 点击后的颜色
        // 如果还想改变文本颜色，也可以设置文本颜色
        //button.style.color = 'black'; // 点击后的文本颜色
        //修改button的文字内容
        setTimeout(function() {
            button.textContent = '下载图片';
            button.style.backgroundColor = '#53F3F0E6'
        }, 3000);
    });

    // 将按钮添加到页面中的某个元素中
    document.body.appendChild(button);
    if (h1Element) {
        //将按钮附加到这部分之后
        h1Element.parentNode.insertBefore(button, h1Element.nextSibling);
    }

})();
