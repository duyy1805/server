const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../models/User')  

router.post('/register', async (req, res) => {
	const { username, password } = req.body

	// Simple validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })

	try {
		// Check for existing user
		const user = await User.findOne({ username })

		if (user)
			return res
				.status(400)
				.json({ success: false, message: 'Username already taken' })

		// All good
		const hashedPassword = await argon2.hash(password)
		const newUser = new User({ username, password: hashedPassword})
		await newUser.save()

		// Return token
		const accessToken = jwt.sign(
			{ userId: newUser._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User created successfully',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

	// login
	router.post('/login', async(req,res) => {
		const {username , password} = req.body

		if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })
		
		try {
			//cseck for existing user
			const user = await User.findOne({username})
			if(!user)
			return res.status(400).json({success : false , message : 'incorrect u'})
			
			// username found
			const passwordValid = await argon2.verify(user.password,password)
			if(!passwordValid)
				return res
				.status(400)
				.json({success : false , message : 'incorrect p'})

					// Return token
			const accessToken = jwt.sign(
				{ userId: user._id },
				process.env.ACCESS_TOKEN_SECRET
			)

			res.json({
				success: true,
				message: 'logged in successfully',
				accessToken
			})
		} catch (error) {
			console.log(error)
				res.status(500).json({ success: false, message: 'Internal server error' })
		}
	})

module.exports = router