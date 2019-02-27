//订阅者(watcher)在初始化的时候需要将自己进订阅器, 获取对应的属性值就可以触发oberver中的get函数, 将自己添加进订阅器


//一个注意点: 我们只需要在订阅者watcher初始化的时候才需要添加订阅者, 所有要有一个判断操作
//我们在Dep.target 上缓存订阅者, 添加成功后再将它去掉

function Watcher(vm, exp, cb){
    this.cb = cb,
    this.vm = vm,
    this.exp = exp,
    this.value = this.get();  //将自己添加到订阅器的操作
}

Watcher.prototype = {
    update:function(){
        this.run()
    },
    run: function(){
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if(value !== oldVal){
            this.value = value;
            this.cb.call(this.vm, value, oldVal)
        }
    },
    get: function(){
        Dep.target = this //缓存自己
        var value = this.vm.data[this.exp]  //强制执行监听器中的get
        Dep.target = null;  //释放自己
        return value 
    }
}