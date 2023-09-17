
//监听消息并调用downloadImage函数来下载图片
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message.action === "DownloadDLsiteImage") {
		downloadDLsiteImage(message.srcArray, message.folderName);
	}
  
  
});

//获取监听消息传来的内容开始下载文件
//下载图片到指定文件夹当中
function downloadDLsiteImage(srcArray, folderName) {
	srcArray.forEach((imageUrl) => {
		chrome.downloads.download({
			url: imageUrl,
			filename: folderName + "/" + imageUrl.split("/").pop(), // 设置文件保存的路径和名称
		});
	})
}