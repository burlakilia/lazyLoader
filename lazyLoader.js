/**
* Класс реализующий отложенную загрузку файлов скриптов
* Автор: Бурлак Илья
*/
var lazyLoader = {
	
	requests: [],
	num: 0, // указатель на последний загруженный скрипт
	
	
	sumSize: 0, // сумарный размер, загружаемых файлов
	curProgress: 0, // текущий процент загрузки
			
	onAfterLoad: function() {}, // метод, который выполняется после загрузки всех скриптов
	
	/**
	* Метод добавления нового запроса
	* @param url - путь к файлу
	* @param size - его примерный размер (нужен для прогресс бара), если пустой то 0
	*/
	addRequest: function(url, size) {
		if (this.requests != undefined && url != undefined) {
			var fileSize = size | 0;
			
			this.sumSize += fileSize;
			
			this.requests.push({
				"type": "script",
				"url": url,
				"size": fileSize
			});
		} 
	},
	
	startLoad: function(callback) {
		this.onAfterLoad = callback;
		this._loadScript(this.requests[0])
	},
	
	next: function() {
		console.log(this);
		this.num++;
		
		if(this.onAfterLoad != undefined && typeof this.onAfterLoad === "function" && this.num == this.requests.length ) {
			this.onAfterLoad(); // отладка скрола
		} else {
			var rq = this.requests[this.num];
			if(rq.type == "script") {
				this._loadScript(rq);
			}
		}
	},
	
	_callbackIE: function(callback) {
		var target = window.event.srcElement;
		if(target.readyState == "loaded")
		callback.call(target);
	},
		        			
	_loadScript: function(req) {
		var self = this;
		var status = false;
		
		var script = document.createElement('script');
	   
		
		var callback = function() {
			console.log(req.url + "load ok");
			self._setProgress(req.size)
			self.next();
		}
		
		script.type = 'text/javascript';
	   	if(script.addEventListener) {
			script.addEventListener("load", callback, false);
		}
		else if(script.attachEvent) {
			script.attachEvent("onreadystatechange", function() { self.callbackIE(callback); });
	    }
	    
	    script.async = true;
	    script.src = req.url;
	    var x = document.getElementsByTagName('script')[0];
	    x.parentNode.insertBefore(script, x);
	},
	
	/**
	* Метод получения процента загрузки по размеру файла
	* @param size - размер, для которого нужно получить процент
	*/
	_setProgress: function(size) {
		this.curProgress += (size * 100) / this.sumSize;
		document.getElementById("preloaderProgress").innerHTML = parseInt(this.curProgress) + "%";
		return (size * 100) / this.sumSize;
	}
}
    		