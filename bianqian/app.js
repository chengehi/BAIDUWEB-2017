
var vm = new Vue({
	el:".m-body",
	data:{
		list:[],
		todo:"",//要添加任务
		msgNum:"0",//显示任务数
		message:"共有"
	},
	methods:{
		addTodo(){//添加
				this.list.push({
					title:this.todo,
					isChecked:false
				});
				this.todo = "";
				this.msgNum=this.list.length;
				this.message="共有";
		},
		deleteTodo(index){//删除
			this.list.splice(index,1);
			this.msgNum=this.list.length;
			this.message="共有";
		},
		total(){
			this.msgNum = this.list.length;
			this.message="共有";
		},
		finish(){
			var j=0;
			var arr = this.list
			for(var i=0;i<arr.length;i++){
				if(arr[i].isChecked){
					j++;
				}
			}
			this.msgNum = j;
			this.message="已完成";
		},
		unfinish(){
			var j=0;
			var arr = this.list
			for(var i=0;i<arr.length;i++){
				if(!arr[i].isChecked){
					j++;
				}
			}
			this.msgNum = j;
			this.message="未完成";
		}
	}
})