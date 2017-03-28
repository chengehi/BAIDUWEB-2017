	// 兼容的绑定事件
	function addEvent(element,event,listener){
		if(element.addEventListener){
			element.addEventListener(event,listener,false);
		}else if(element.attachEvent){
			element.attachEvent("on"+event,listener);
		}else{
			element["on"+event]=listener;
		}
	}

	var rootNode = document.getElementById("root");
	var btns = document.getElementsByTagName("input");
	var preBtn = btns[0];
	var inBtn = btns[1];
	var postBtn = btns[2];
	var searchBtn = btns[4];
	var indexArr = [];
	var timeer = null;

	// 加载
	addEvent(window,"load",function(){
		addEvent(preBtn,"click",function(){
			resect();
			preOrder(arr,rootNode);
			changeColor();
		});
		addEvent(inBtn,"click",function(){
			resect();
			inOrder(arr,rootNode);
			changeColor();
		});
		addEvent(postBtn,"click",function(){
			resect();
			postOrder(arr,rootNode);
			changeColor();
		});
		addEvent(searchBtn,"click",function(){
			resect();
			preOrder(arr,rootNode);
			search();
		})
	})


	// 前序搜索
	function preOrder(callback,rootNode){
		(function recurse(currentNode){
			callback(currentNode);
			for(var i=0,length=currentNode.children.length;i<length;i++){
				recurse(currentNode.children[i]);
			}		
		})(rootNode);
	}

	// 中序搜索
	function inOrder(callback,rootNode){
		(function recurse(currentNode){
			if(!(currentNode == null)){
				recurse(currentNode.children[0]);
				callback(currentNode);
				recurse(currentNode.children[1]);
			}
		})(rootNode);
	}

	// 深度搜索-后序
	function postOrder(callback,rootNode){
		(function recurse(currentNode){
			for(var i=0,length=currentNode.children.length;i<length;i++){
				recurse(currentNode.children[i]);
			}
			callback(currentNode);	
		})(rootNode);
	}

	//变色
	function changeColor(){
		var i = 0;
		indexArr[i].style.backgroundColor = "blue";	
		var step = function(){
			i++;
			indexArr[i-1].style.backgroundColor = "#fff";
			if(i<indexArr.length){		
				indexArr[i].style.backgroundColor = "blue";
			}else{
				clearInterval(timeer);
			}

		}
		timeer = setInterval(step,1000)
	}

	// 查询
	function search(){
		var i = 0;
		var sign = 0;
		var arrText = rootNode.innerText.split(/[\n\s]*/g);
		var iptValue = document.getElementById("search").value;
		if(arrText[i]==iptValue){
			indexArr[i].style.backgroundColor = "red";
			sign = 1;
		}else{
			indexArr[i].style.backgroundColor = "blue";
		}	
		var step = function(){
			i++;
			if(arrText[i-1]!=iptValue){
					indexArr[i-1].style.backgroundColor = "#fff";
			}
			if(i<indexArr.length){
				if(arrText[i]==iptValue){
					indexArr[i].style.backgroundColor = "red";
					sign = 1;
				}else{
					indexArr[i].style.backgroundColor = "blue";
				} 	
			}else{
				clearInterval(timeer);
				if(sign == 0){
					alert("没找到");
				}
			}	
		}
		timeer = setInterval(step,1000)
	}


	// callback函数,获得节点数组
	function arr(node){
		indexArr.push(node);
	}

	// 复位
	function resect(){
		indexArr = [];
		clearInterval(timeer);
		var divs = document.getElementsByTagName("div");
		for(var i=0;i<divs.length;i++){
			divs[i].style.backgroundColor = "#fff";
		}
	}

	
	var divs =document.getElementsByTagName("div");
	var delBtn = document.getElementById("delBtn")
	var addInput =document.getElementById("addInput");
	var addBtn = document.getElementById("addBtn");
	var arrs =[];

	// 选择边框变色
	for(var i=0;i<divs.length;i++){
		divs[i].onclick = function(event){
		event.target.style.borderColor = "green";
		arrs.push(event.target);
		event.stopPropagation();
		}
	}
	// 删除
	delBtn.onclick = function(){
		for(var i=0;i<arrs.length;i++){
			var node = arrs[i];
			var parent = arrs[i].parentNode;
			var n = Array.prototype.indexOf.call(parent.children,arrs[i]);
			parent.removeChild(arrs[i]);
		}
		arrs = [];
	}
	// 添加
	addBtn.onclick = function(){
		if(!!arrs[0]){
			var addValue = addInput.value;
			var node = document.createElement("div");
			node.innerText = addValue;
			node.className = "c4";
			arrs[0].appendChild(node);
		}
		
	}

	