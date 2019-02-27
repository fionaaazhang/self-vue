//实现一个监听器: 要对所有属性实行监听的话,可以通过递归遍历所有属性值, 并通过 Object.defineProperty()对其进行处理

function defineReactive(data, key, val){
    observe(val); //递归遍历所有属性

    var dep = new Dep()   //1. 植入订阅器

    Object.defineProperty(data, key, {
        enumerable: true,   //可枚举
        configurable : true, //可配置(删除和改变)
        get: function(){  // 获取属性时触发
            if(Dep.target){
                dep.addSub(Dep.target);  //2. 在这里添加订阅者
            }
            return val;
        },
        set: function(newVal){  //设置属性时触发
            if(val === newVal){
                return 
            }
            val = newVal;
            console.log('属性'+ key + '已经被监听了, 现在的值为: ' +newVal.toString());

            dep.notify();  //3. 数据变化, 通知所有订阅者
        }
    })
}

Dep.target = null;

function observe(data){
    if(!data || typeof data != 'object'){
        return ;
    }
    Object.keys(data).forEach(function(key){
        defineReactive(data, key, data[key]);
    })
}

function Dep(){
    this.subs = []
}

Dep.prototype = {
    addSub : function(sub){
        this.subs.push(sub)
    },
    notify: function(){
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

var library = {
    book1 : {
        name : ''
    },
    book2: ''
};

observe(library);
library.book1.name = 'javascript语言精粹'
library.book2.name = 'vue 权威指南'
