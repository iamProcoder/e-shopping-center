const Boom = require('@hapi/boom');
const validator = require('../../../middleware/validator');
const validationUser = require('../../../validations/user.validation');
const {generateToken, generateRefreshToken, verifyRefreshToken } = require('../../../helpers/jwt');
const redis = require("../../../redis/redisConfig");

module.exports = {
    Login: async (parent, args, { User }) => {
        const input = args.data;
        validator(validationUser);
        try {
            const user = await User.findOne({ email: input.email });
            if (!user) throw Boom.notFound("The email address was not found.");

            const isMatched = await user.isValidPass(input.password);
            if (!isMatched) throw Boom.unauthorized("The password not correct");
           
            const userData = user.toObject();
            delete userData.password;
            delete userData.__v;
    
            const accessToken = await generateToken({user: userData});
            const refreshToken = await generateRefreshToken(user._id);

            return { accessToken, refreshToken };

        } catch (e) {            
            console.log(e);
            return e;
        }
    },

    Register: async (parent, args, { User }) => {
        const input = args.data;
        validator(validationUser);
        try {
            const user = await await User.findOne({ email: input.email });
            if (user) throw Boom.conflict("User already exists");

            const newUser = new User(input);
            const savedUser = await newUser.save();
            const userData = savedUser.toObject();
            delete userData.password;
            delete userData.__v;

            const accessToken = await generateToken({user: userData});
            const refreshToken = await generateRefreshToken(newUser._id);

            return { accessToken, refreshToken };

        } catch (e) {
            console.log(e);
            return e;
        }
    },

    Logout: async (parent, args) => {
        try {
            const { refresh_token } = args.data;
            if (!refresh_token) throw Boom.badRequest();
    
            const user_id = await verifyRefreshToken(refresh_token);
            const data = await redis.del(user_id);
    
            if (!data) {
                throw Boom.badRequest();
            }

            return 'Success';

        } catch (e) {
            console.log(e);
            return e;
        }
    },

    RefreshToken: async (parent, args, { User }) => {
        const { refresh_token } = args.data;
    
        try {
            if (!refresh_token) throw Boom.badRequest();
    
            const user_id = await verifyRefreshToken(refresh_token);
            if (!user_id) return Boom.badRequest();

            const user = await User.findOne({_id: user_id});
            if (!user) return Boom.badRequest();

            const userData = user.toObject();
            delete userData.password;
            delete userData.__v;
            const accessToken = await generateToken({user: userData});
            const refreshToken = await generateRefreshToken(user_id);
    
            return  { accessToken, refreshToken };
        } catch (e) {
            console.log(e);
            return e;
        }
    }
}