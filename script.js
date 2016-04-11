// Script: Procedurally Generated Text Adventure
// Developer: Gage Coates
// Date: April, 2016

// global namespace
var game;

function initialize () {
	game = new Game();
	game.initialize();
}

// Game class
function Game () {
	//=======
	// public
	//=======
	this.newId = function () {
		return this.nextId++;
	}
	//=======
	// private
	//=======
	this.regionName = '';
	this.cities = [];
	this.population = [];
	this.families = [];
	this.nextId = 0;
	this.clock = new Clock();
	this.clock.start(20);
	// html
	this.main;
	this.quests;
	this.description;

	this.generate = function () {
		var self = this;
		// regionName
		self.regionName = NameGenerator.region();
		//============
		// regional population
		//============
		var singleMales = [];
		var singleFemales = [];
		// seed families
		for (var f = 0; f < 15; f++) {
			var surname = NameGenerator.surname();
			var father = new Person('male',randWithin(Config.oldest-5,Config.oldest+5),probability(Config.professions),surname);
			var mother = new Person('female',randWithin(Config.oldest-5,Config.oldest+5),probability(Config.professions),surname);
			father.spouse = mother;
			mother.spouse = father;
			self.population.push(father);
			self.population.push(mother);
			self.families.push(new Family(father,mother));
		}
		// multiply and be fruitful
		var stillMatching = true;
		while (stillMatching) {
			stillMatching = false;
			// create children
			self.families.forEach(function (family) {
				if (family.children.length == 0) {
					// for an average of children
					for (var c = randWithin(0,Config.children); c >0; c--) {
						// 20-30 years younger than youngest parent
						var age = Math.min(family.father.age,family.mother.age)-randWithin(20+c,30);
						if (age <= 0) {age = 1};
						var profession = 'none';
						if (age >= 20) {
							profession = probability(Config.professions);
						} else if (age >= 15) {
							profession = 'farmer';
						}
						var child = new Person(randWithinArray(['male','female']),age,profession,family.father.surname);
						family.father.children.push(child);
						family.mother.children.push(child);
						self.population.push(child);
						family.children.push(child);
						// single only if able to marry
						if (child.age >= Config.maryMinAge) {
							(child.gender === 'male' ? singleMales : singleFemales).push(child);
						}
					}
				}
			});
			// create new families
			singleMales.forEach( function (father,fIndex) {
				singleFemales.some( function (mother,mIndex) {
					// make sure they are not directly related
					if (mother.surname === father.surname) {return true;}
					// we found a match!
					if (Math.abs(father.age-mother.age) <= 10) {
						mother.surname = father.surname;
						self.families.push(new Family(father,mother));
						singleMales.remove(fIndex);
						singleFemales.remove(mIndex);
						stillMatching = true;
						return true;
					}
				});
			});
		}
		var male = 0;
		var female = 0;
		self.population.forEach(function (person) {
			if (person.gender == 'male') {
				male++;
			} else {
				female++;
			}
		});
		console.log('males: ' + male);
		console.log('females: ' + female);
		//=========
		// regional cities
		//=========
		var familyIndex = 0;
		for (var c = 0; c <Config.cityCount; c++ ) {
			var city = new City();
			var cityPop = Math.round(self.population.length/Config.cityCount) + randWithin(-15,15);
			for (familyIndex; familyIndex < self.families.length; familyIndex++) {
				var family = self.families[familyIndex];
				// add more families to this city
				if (city.population.length < cityPop) {
					city.families.push(family);
					family.father.city = city;
					city.population.push(family.father);
					family.mother.city = city;
					city.population.push(family.mother);
					// if the children aren't married they live with their parents
					family.children.forEach(function (child) {
						if (child.spouse === null) {
							child.city = city;
							city.population.push(child);
						}
					});
				} else {
					// finish this city
					break;
				}
			};
			familyIndexStart = familyIndex;
			city.initialize();
			self.cities.push(city);
		}
		self.population = [];
	}
	this.initialize = function () {
		var self = this;
		var body = document.getElementById('body');
		// create the HTML elements
		
		// main
		self.main = document.createElement('DIV');
		self.main.className = 'main';
		
		// quest tracker
		self.quests = document.createElement('OL');
		self.quests.className = 'group';
		self.quests.innerHTML = 'Quests';
		self.main.appendChild(self.quests);
		
		// append everything to the body
		body.appendChild(self.main);
		
		// generate the world
		self.generate();
	}
}
// Player class
function Player(name,gender,age,bio) {
	//=======
	// public
	//=======
	//=======
	// private
	//=======
	this.name = '';
	this.description = '';
	this.gender = '';
	this.age;
	this.bio = '';
	this.quests = [];
	this.inventory = [];
	
	this.initialize = function (name,gender,age,bio) {
		var self = this;
		self.name = name;
		self.gender = gender;
		self.age = age;
		self.bio = bio;
	}
	// initialize
	this.initialize(name,gender,age,bio);
}
// City class
function City() {
	//=======
	// public
	//=======
	this.initialize = function () {
		var self = this;
		// name
		self.name = NameGenerator.city();
		// create court house for mayor and sheriff
		self.buildings.push(new Building('court house',self.name + ' court house'));
		// create buildings for all professions
		Config.professions.forEach(function (profession) {
			// blacklist certain professions
			if (profession.data != 'warrior' && profession.data != 'farmer') {
				var workers = 0;
				var building;
				self.population.forEach(function (person,index) {
					if (person.profession === profession.data) {
						workers++;
						// create a building for every 4 people that have the same profession
						if ((workers-1) %  4 == 0) {
							building = new Building(profession.data,self.name + ' ' + profession.data);
							self.buildings.push(building)
						}
						// set the person's workPlace
						person.workPlace = building.id;
					}
				});
			}
		});
	}
	//=======
	// private
	//=======
	this.id = game.newId();
	this.name = '';
	this.description = '';
	this.population = [];
	this.families = [];
	this.buildings = [];
}
// Building class
function Building(type,name) {
	//=======
	// public
	//=======
	//=======
	// private
	//=======
	this.id = game.newId();
	this.name = name;
	this.description = '';
	this.type = type;
	this.rooms = [];
	this.population = [];
	this.owner;
	this.initialize = function () {
		var self = this;
		self.rooms.push(new Room(probability(Config[self.type].firstRoom),self.type)); // first room
	}
	// initialize
	this.initialize();
}
// Room class
function Room (type,buildingType) {
	//=======
	// public
	//=======
	
	//=======
	// private
	//=======
	this.type = type;
	this.description = '';
	this.population = [];
	this.initialize = function (buildingType) {
		var self = this;
		self.description = randWithinArray(Config[buildingType].rooms[self.type].description);
	}
	// initialize
	this.initialize(buildingType);
}
// Family class
function Family (father,mother) {
	//=======
	// public
	//=======
	
	//=======
	// private
	//=======
	this.father = father;
	this.mother = mother;
	this.children = [];
	this.surname = father.surname;
}
// Person class
function Person (gender,age,profession,surname) {
	//=======
	// public
	//=======
	//=======
	// private
	//=======
	this.id = game.newId();
	this.name = '';
	this.surname = surname;
	this.spouse = null;
	this.children = [];
	this.description = '';
	this.gender = gender;
	this.age = age;
	this.biography = '';
	this.profession = profession;
	this.workPlace;
	this.state = 'idle';
	this.city;
	this.quests = [];
	this.inventory = [];
	this.genBio = function () {
		var self = this;
		var bio = '';
		// add more to the bio the older the person is
		if (self.age >= 20) {
			
			if (self.age >= 40) {
				if (self.age >= 60) {
					
				}
			}
		}
		return bio;
	}
	this.initialize = function () {
		var self = this;
		self.name = NameGenerator[gender]();
		self.biography = self.genBio();
	}
	// initialize
	this.initialize();
}
// Quest class
function Quest() {
	//=======
	// public
	//=======
	
	//=======
	// private
	//=======
	this.description
	this.initialize = function () {
		
	}
	// initialize
	this.initialize();
}
function Clock() {
	//=======
	// public
	//=======
	this.start = function (delay) {
		var self = this;
		self.interval = window.setInterval(function () {
			self.minute++;
			if (self.minute >= 60) {
				self.minute = 0;
				self.hour++;
				if (self.hour >= 25) {
					self.hour = 1;
				}
			}
			console.log(self.time());
		},delay);
	}
	this.time = function () {
		var half = this.hour < 12 || this.hour == 24 ? 'AM' : 'PM';
		return (half == 'PM' ? this.hour == 12 ? this.hour:  this.hour - 12: this.hour) + ':' + (this.minute < 10 ? '0' + this.minute: this.minute) + ' ' + half;
	}
	//=======
	// private
	//=======
	this.hour = 12;
	this.minute = 0;
	this.second = 0;
	
	this.interval;
}
function randWithin(min,max) {
	return Math.round(Math.random() * (max-min) + min);
}
Array.prototype.remove = function (index) {
	// swap
	var temp = this[index];
	this[index] = this[this.length-1];
	this[this.length-1] = temp;
	// pop
	this.pop();
	return temp;
}
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
// return a value based on a set of probabilities
function probability (data) {
	var answer = null;
	while (answer === null) {
		var counts = [];
		for (var i = 0; i < 5; i++) {
			
			data.forEach(function (option,index) {
				if (counts.length-1 < index) {
					counts.push(0);
				}
				if (Math.random() <= option.probability) {
					counts[index] ++;
				}
			});
		}
		var max = Math.max(...counts);
		counts.some(function (count, index) {
			if (count == max) {
				answer = data[index].data;
				return true;
			}
		});
	}
	return answer;
}
// return true based on probability
function chance (probability) {
	if (Math.random() <= probability) {
		return true;
	}
	return false;
}
// return one element of the array
function randWithinArray (array) {
	return array[randWithin(0,array.length-1)];
}