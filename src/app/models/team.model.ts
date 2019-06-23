export class Team {
	constructor(
		public name: string,
		public teamManager: [string],
		public integrants: [
			{
				users: string;
				rol: string;
			}
		]
	) {}
}
