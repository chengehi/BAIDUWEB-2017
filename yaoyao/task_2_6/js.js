!function(){
	function extend(o1,o2){
	for(var k in o2){
		if( typeof o1[k]==='undefined'){
			o1[k]=o2[k];
		}
	}
	return o1;
	}

	function html2node(str){
		var container = document.createElement('div');
		container.innerHTML = str;
		return container.children[0]
	}

var template =	
'<div class="m-mask" >\
	<div class="align"></div>\
	<div class="wrap animated">\
		<div class="head">这是一个浮出层</div>\
		<div class="body">这是一个浮出层</div>\
		<div class="foot">\
			<div class="btn confirm">确定</div>\
			<div class="btn cancel">取消</div>\
		</div>\
	</div>\
</div>';

	function Modal(option){
		this.container = html2node(template);
		this.head = this.container.querySelector(".head");
		this.wrap = this.container.querySelector(".wrap");
		this.body = this.container.querySelector(".body");
		this.confirm = this.container.querySelector(".confirm");
		this.cancel = this.container.querySelector(".cancel");
		extend(this,option);

		this._initEvent();
	}

	extend(Modal.prototype,{
		write:function(str1,str2){
			this.head.textContent = str1;
			this.body.textContent = str2;
		},
		show:function(){
			this.write(this.lenged,this.content);
			document.body.appendChild(this.container);
			animateClass(this.wrap,this.animate.enter);
		},
		hide:function(){
			var con = this.container;	
			animateClass(this.wrap,this.animate.outer,function(){
				document.body.removeChild(con);
			});
		},

		_initEvent:function(){
			this.confirm.addEventListener('click',this._onConfirm.bind(this));
			this.cancel.addEventListener('click',this._onCancel.bind(this));
			this.container.addEventListener('click',this.hide.bind(this));
			this.wrap.addEventListener('click',function(event){
				event.stopPropagation();
			})
		},

		_onConfirm:function(){
			this.emit('confirm');
			this.hide();
		},

		_onCancel:function(){
			this.emit('cancel');
			this.hide();
		}

	})

// .....................................................................

var emitter = {
  // 注册事件
  on: function(event, fn) {
    var handles = this._handles || (this._handles = {}),
      calls = handles[event] || (handles[event] = []);

    // 找到对应名字的栈
    calls.push(fn);

    return this;
  },
  // 解绑事件
  off: function(event, fn) {
    if(!event || !this._handles) this._handles = {};
    if(!this._handles) return;

    var handles = this._handles , calls;

    if (calls = handles[event]) {
      if (!fn) {
        handles[event] = [];
        return this;
      }
      // 找到栈内对应listener 并移除
      for (var i = 0, len = calls.length; i < len; i++) {
        if (fn === calls[i]) {
          calls.splice(i, 1);
          return this;
        }
      }
    }
    return this;
  },
  // 触发事件
  emit: function(event){
    var args = [].slice.call(arguments, 1),
      handles = this._handles, calls;

    if (!handles || !(calls = handles[event])) return this;
    // 触发所有对应名字的listeners
    for (var i = 0, len = calls.length; i < len; i++) {
    }
    return this;
  }
}

	extend(Modal.prototype,emitter);

	window.Modal = Modal;
}()