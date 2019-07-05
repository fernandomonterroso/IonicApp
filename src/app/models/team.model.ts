export class Team {
	constructor(
		public _id: string,
		public name: string,
		public description: string,
		public integrants: [
			{
				users: string;
				rol: string;
			}
		]
	) {}
}
