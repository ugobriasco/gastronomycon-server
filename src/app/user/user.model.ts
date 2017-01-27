export class User {
	constructor(
		public email: String,
		public role: String,
		public password: String,
		public profile: Profile
		){}
	
}

export class Profile {
    constructor(
    	public name: String,
        public avatar: String, 
        public cover: String
        
    ){}
}

