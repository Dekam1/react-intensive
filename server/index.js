import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";

import { users } from "./db.js";
import checkAuth from "./utils/checkAuth.js";

const app = express();

app.use(express.json());
app.use(cors());


app.post('/auth/login', async (req, res) => {
	const foundUser = users.find(u => req.body.email === u.email);
	try {
		if (!foundUser) {
			return res
				.status(404)
				.json({
					message: "Неправильный логин или пароль"
				})
		};

		const isValidPassword = await bcrypt.compare(req.body.password, foundUser.passwordHash);

		if (!isValidPassword) {
			return res
				.status(404)
				.json({
					message: "Неправильный логин или пароль"
				})
		};

		const token = jwt.sign(
			{
				id: foundUser.id
			},
			'secret',
			{
				expiresIn: "30d"
			}
		)

		const { passwordHash, ...userData } = foundUser;

		res.json({
			...userData,
			token
		});

	} catch (error) {
		return res
			.status(500)
			.json({
				message: "При авторизации произошла ошибка"
			})
	}

});

app.get('/auth/me', checkAuth, (req, res) => {
	try {
		const user = users.find(u => req.userId === u.id);

		if (!user) {
			return res
				.status(404)
				.json({
					message: "Пользователь не найден"
				})
		}

		const { passwordHash, ...userData } = user;
		res.json(userData);

	} catch (error) {
		return res
			.status(500)
			.json({
				message: "Нет доступа"
			})
	}
});

app.listen(4444, (err) => {
	if (err) {
		return console.log(err);
	}

	console.log('Server work...');
});