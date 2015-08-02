(function(global){
     
    var createClass = function(template){
        template.constructor.prototype = template.prototype;
        template.constructor.inherit = function(parent){
            var name,
                proto = {},
                _super = "_super_";
 
            for (name in this.prototype)
                proto[name] = this.prototype[name];

            for (name in parent.prototype)
               if(name != _super)
                    proto[this.prototype[name] ? _super + name : name] = parent.prototype[name];
            
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