const JWT = require('jsonwebtoken');
const Boom = require('@hapi/boom');

const redis = require('../redis/redisConfig');
const crypto = require('../helpers/encodeDecode');

const generateToken = (data) => {
    return new Promise((resolve, reject) => {
		const payload = {
			...data,
		};

		const options = {
			expiresIn: "3h",
			issuer: "e-shopping-center",
		};

		JWT.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
			if (err) {
				console.log(err);
				reject(Boom.internal(err.message));
			}
			const cr_token = crypto.encrypt(token);
			resolve(cr_token);
		});
	});
};

const verifyToken = (req, authorizationToken) => {
	let isVerify = false;
	if (!authorizationToken) {
		return isVerify;
	}
	const decrypt_token = crypto.decrypt(authorizationToken);
	JWT.verify(decrypt_token, process.env.JWT_SECRET, (err, payload) => {
		if (err) return isVerify;
	
		req.activeUser = payload;
		isVerify = true;
		return isVerify;
	});

	return isVerify;
};

const generateRefreshToken = (userId) => {
	return new Promise((resolve, reject) => {
		const payload = {
			userId,
		};
		const options = {
			expiresIn: "180d",
			issuer: "e-shopping-center",
		};

		JWT.sign(payload, process.env.JWT_REFRESH_SECRET, options, (err, token) => {
			if (err) {
				console.log(err);
				reject(Boom.internal(err.message));
			}

			const cr_token = crypto.encrypt(token);
			redis.set(userId, token, "EX", 180 * 24 * 60 * 60);
			resolve(cr_token);
		});
	});
};

const verifyRefreshToken = (refresh_token) => {
	return new Promise(async (resolve, reject) => {
		const decrypt_token = crypto.decrypt(refresh_token);
		JWT.verify(
			decrypt_token,
			process.env.JWT_REFRESH_SECRET,
			async (err, payload) => {
				if (err) {
					return reject(Boom.unauthorized());
				}

				const { userId } = payload;
				const redis_user_token = await redis.get(userId);

				if (!redis_user_token) {
					return reject(Boom.unauthorized());
				}

				if (decrypt_token === redis_user_token) {
					return resolve(userId);
				}
			}
		);
	});
};

module.exports = {
  generateToken,
  verifyToken,
  generateRefreshToken,
  verifyRefreshToken
};