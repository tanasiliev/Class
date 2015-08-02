(function(global){
     
    var createClass = function(template){
        template.constructor.prototype = template.prototype;
        template.constructor.inherit = function(parent){
            var name, 
                bname, 
                proto = {},
                base = '_super_',
                base_constructor = base.slice(0,-1),
                base_regex = new RegExp(base_constructor);
                
            for (name in this.prototype)
                proto[name] = this.prototype[name];

            for (name in parent.prototype){   
                if(name !== base_constructor && this.prototype[name]){
                    bname = base + name;
                    if(parent.prototype[bname]){
                        proto[bname] = function(){
                            var pMethod,
                                name = arguments.callee._name,
                                bname = base + name,
                                cMethod = this[bname];
                            this[bname] = parent.prototype[bname];
                            pMethod = parent.prototype[name].call(this);
                            this[bname] = cMethod;
                            return pMethod;
                        };
                        proto[bname]._name = name;   
                    } else 
                      proto[bname] = parent.prototype[name]; 
                } else { 
                    if(!base_regex.test(name))
                        proto[name] = parent.prototype[name];
                }
            }

            this.prototype = Object.create(proto);
            this._constructor = parent;		
            this.prototype[base_constructor] = function(){
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