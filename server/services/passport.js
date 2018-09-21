
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys');
const { User } = require('../models/user');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});
passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback',
	proxy: true
}, async (accessToken, refreshToken, profile, done) => {

	const existingUser = await User.findOne({ googleId: profile.id });
	if (existingUser) {
		done(null, existingUser);	
	} else {
		var user = await new User({ googleId: profile.id }).save();
		done(null, user);
	}
}));