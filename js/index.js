//在observer和watcher初步完成后, 将二者结合起来就呢个实现一个简单的数据双向绑定

function SelfVue(data, el, exp){
    this.data = data;
    observe(data);
    el.innerHTML = this.data[exp] ; //初始化模板数据的值
    new Watcher(this, exp, function(value){
        el.innerHTML = value
    });
    return this;
}