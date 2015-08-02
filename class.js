(function(global){
     
    var createClass = function(template){
        template.constructor.prototype = template.prototype;
        template.constructor.inherit = function(parent){
            var name,
                sname,
                proto = {},
                _super = "_super_";
                
            for (name in this.prototype)
                proto[name] = this.prototype[name];

            for (name in parent.prototype){   
                if(name !== "_super" && this.prototype[name]){
                    sname = _super + name;
                    if(parent.prototype[sname]){
                       var fun = function(){
                            var name = arguments.callee._name;
                            var sname = _super + name;
                            var method = this[sname];
                            this[sname] = parent.prototype[sname];
                            var caller = parent.prototype[name].call(this);
                            this[sname] = method;
                            return caller;
                        };
                        fun._name = name;
                        proto[sname] = fun;   
                        
                    } else 
                      proto[sname] = parent.prototype[name]; 
                } else { 
                    if(!/_super_/.test(name))
                        proto[name] = parent.prototype[name];
                }
            }

            this.prototype = Object.create(proto);
            this._constructor = parent;		
            this.prototype._super = function(){
                arguments.callee.caller._constructor.apply(this, arguments); 
            };
            return template.constructor;
        };
        return template.constructor;	
    };
    
    if (typeof define === 'function' && define.amd) {
        define(function () { return createClass; });
    } else if (typeof module !== 'undefined' && module.exports){ 
        module.exports = createClass;
    } else { 
        global['Class'] = createClass;
    }
})(this);

