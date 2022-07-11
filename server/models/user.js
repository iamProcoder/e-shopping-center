const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		toJSON: false,
	},
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	birthday: {
		type: Date
	},
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre("save", async function (next) {
	try {
		if (this.isNew) {
			const salt = await bcrypt.genSalt(10);
			const hashed = await bcrypt.hash(this.password, salt);
			this.password = hashed;
		}

		next();
	} catch (e) {
		next(error);
	}
});

UserSchema.methods.isValidPass = async function (pass) {
	return await bcrypt.compare(pass, this.password);
};

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
});

module.exports = mongoose.model("user", UserSchema);
