# Class
javascript class inheritance


````
var Person = Class({
	constructor: function(fname, lname){
        this.fname = fname;
        this.lname = lname;
	},
	prototype : {
		introduce: function(){
            return ["Hi my name is", this.fname, this.lname].join(' ');
		},
        fullName : function(){
            return [this.fname, this.lname].join(' ');  
        }
	}
});

var Student = Class({
	constructor: function(fname, lname, nickname, grade){
	    this._super(fname, lname);
		this.nickname = nickname;
        this.grade = grade;
	},
	prototype : {
		introduce: function(){
            return this._super_introduce() +  " " + this.nickname; 	 
		},
        getGrade: function() {
            return this.grade;
        }
	}
}).inherit(Person);

var Worker = Class({
	constructor: function(fname, lname, nickname, grade, profession){
	   this._super(fname, lname, nickname, grade); 
	   this.profession = profession;
	},
	prototype : {
		work: function() {
			return this.fname + " works as " + this.profession;
		},
        introduce: function(){
            return this._super_introduce() +  "  I'm a " + this.profession; 	 
		}
	}
}).inherit(Student);

var instances = [
                new Person('John', 'Smit'),
                new Student('Victor', 'Matfield', 'Vic', 'six grade'),
                new Worker('Mark', 'Fish', 'Feesh', 'final grade', 'footballer')
];

instances.forEach(function(instance){
    
    console.log(instance.introduce())
    if(instance instanceof Student){
        console.log(instance.getGrade())  
    }
    if(instance instanceof Worker){
        console.log(instance.work())  
    }
    console.log('\n')
});
````
Console output:

````
Hi my name is John Smit

Hi my name is Victor Matfield Vic
six grade
 
Hi my name is Mark Fish  I'm a footballer
Mark works as footballer
````

