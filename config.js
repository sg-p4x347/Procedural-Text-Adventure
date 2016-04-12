var Config = {
	// global
	cityCount: 10,
	// city
	cityCount: 5,
	// families
	children: 8,
	maryMinAge: 20,
	// People
	professions: [
	{data: 'banker', probability: 0.05},
	{data: 'doctor', probability: 0.05},
	{data: 'clergy', probability: 0.05},
	{data: 'blacksmith', probability: 0.07},
	{data: 'salesman', probability: 0.07},
	{data: 'carpenter', probability: 0.1},
	{data: 'warrior', probability: 0.2},
	{data: 'farmer',probability: 0.5},
	],
	oldest: 80,
	seedFamilies: 10,
	gender: [
	{data: 'male', probability: 0.5},
	{data: 'female', probability: 0.5},
	],
	// Buildings
	/* descriptions are chosen from the array of possible descriptions */
	'home':  {
		name: ['residence', 'home', 'household', 'farm'],
		firstRoom: [
		{data: {name: 'foyer', description: ['In front and around you are doorways leading to different rooms.']}, probability: 0.5},
		{data: {name: 'hallway', description: ['On both sides there are doorways leading to different rooms.']}, probability: 0.4},
		],
		rooms: {
			'living room': {description: ['The room is full of softly padded furnature with a central fireplace.']},
			'dining room': {description: ['The dining set is very large, consisting of 8 chairs and a neatly prepared table.']},
			'kitchen': {description: ['There is a cooking fire and sink in front of you.']},
		},
		description: []
	},
	'court house': {
		name: ['court house'],
		firstRoom: [{data: {name: 'lobby', description: ['lobby description']}, probability: 1}],
		rooms: {
		}
	},
	'banker': {
		name: ['banking', 'bank', 'financial', 'finance'],
		firstRoom: [{data: {name: 'lobby', description: ['lobby description']}, probability: 1}],
		rooms: {
		}
	},
	'doctor': {
		name: ['doctor', 'medical', 'hospital', 'clinic'],
		firstRoom: [{data: {name: 'lobby', description: ['lobby description']}, probability: 1}],
		rooms: {
		}
	},
	'clergy': {
		name: ['Church of the Second Coming', 'Spoken Gospel Church', 'First United Church', 'Second United Church', 'Third United Church','Church of Truth','Church of Faith','Church of Science'],
		firstRoom: [{data: {name: 'lobby', description: ['lobby description']}, probability: 1}],
		rooms: {
		}
	},
	'blacksmith': {
		name: ['Metal Works', 'Smithing', 'Hot Iron'],
		firstRoom: [{data: {name: 'lobby', description: ['lobby description']}, probability: 1}],
		rooms: {
		}
	},
	'salesman': {
		name: ['General Store','Goods','Supplies','Farm and Home Supply','General Goods'],
		firstRoom: [{data: {name: 'lobby', description: ['lobby description']}, probability: 1}],
		rooms: {
		}
	},
	'carpenter': {
		name: ['Carpentry','Woodworking','Saw and Hammer','Lumber Supply'],
		firstRoom: [{data: {name: 'lobby', description: ['lobby description']}, probability: 1}],
		rooms: {
		}
	}
}