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
	{data: 'clergyman', probability: 0.05},
	{data: 'blacksmith', probability: 0.07},
	{data: 'salesman', probability: 0.07},
	{data: 'carpenter', probability: 0.1},
	{data: 'warrior', probability: 0.2},
	{data: 'farmer',probability: 0.5},
	],
	oldest: 80,
	gender: [
	{data: 'male', probability: 0.5},
	{data: 'female', probability: 0.5},
	],
	// Buildings
	/* descriptions are chosen from the array of possible descriptions */
	'home':  {
		firstRoom: [
		{data: 'foyer', probability: 0.5},
		{data: 'hallway', probability: 0.4},
		],
		rooms: {
			'foyer': {description: ['In front and around you are doorways leading to different rooms.']},
			'hallway': {description: ['On both sides there are doorways leading to different rooms.']},
			'living room': {description: ['The room is full of softly padded furnature with a central fireplace.']},
			'dining room': {description: ['The dining set is very large, consisting of 8 chairs and a neatly prepared table.']},
			'kitchen': {description: ['There is a cooking fire and sink in front of you.']},
		},
		description: []
	},
	'court house': {
		firstRoom: [{data: 'lobby', probability: 1}],
		rooms: {
			'lobby': {description: ['lobby description']}
		}
	},
	'banker': {
		firstRoom: [{data: 'lobby', probability: 1}],
		rooms: {
			'lobby': {description: ['lobby description']}
		}
	},
	'doctor': {
		firstRoom: [{data: 'lobby', probability: 1}],
		rooms: {
			'lobby': {description: ['lobby description']}
		}
	},
	'clergyman': {
		firstRoom: [{data: 'lobby', probability: 1}],
		rooms: {
			'lobby': {description: ['lobby description']}
		}
	},
	'blacksmith': {
		firstRoom: [{data: 'lobby', probability: 1}],
		rooms: {
			'lobby': {description: ['lobby description']}
		}
	},
	'salesman': {
		firstRoom: [{data: 'lobby', probability: 1}],
		rooms: {
			'lobby': {description: ['lobby description']}
		}
	},
	'carpenter': {
		firstRoom: [{data: 'lobby', probability: 1}],
		rooms: {
			'lobby': {description: ['lobby description']}
		}
	}
}