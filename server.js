/*
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express') // Express web server framework
var request = require('request') // "Request" library
var querystring = require('querystring')
var cookieParser = require('cookie-parser')
var path = require('path')
var webpackHotMiddleware = require('webpack-hot-middleware')

process.env.PWD = process.cwd()

var clientId = '96d2092fa0ad4ceca884cc06551b3446' // spotify client id
var clientSecret = 'f6632cdf53b44729ad860f414b04424f' // spotify secret
var redirectUri = 'https://localhost:8080/callback' // Your redirect uri

var port = process.env.PORT || 8080
var environment = process.env.ENV || 'dev'

if (environment === 'dev') { redirectUri = 'http://localhost:8080/callback' }

// determine the base url to use based on the environment
// we have to do this to deal maintain staying on the browsersync proxy
var baseUri = environment === 'dev' ? 'http://localhost:8080' : ''

var stateKey = 'spotify_auth_state'
var app = express()

// only load this middleware in dev mode
if (environment === 'dev') {
	var webpackMiddleware = require('webpack-dev-middleware')
	var webpack = require('webpack')
	var config = require('./build/webpack.dev.conf')
	var compiler = webpack(config)

	app.use(webpackMiddleware(compiler, {
		publicPath: '/',
		quiet: true,
		headers: {'X-Custom-Webpack-Header': 'yes'},
		stats: {
			colors: true
		}
	}))

	app.use(webpackHotMiddleware(compiler))

	app.get(/.+\.(html|css|js)/, (req, res, next) => {
		compiler.outputFileSystem.readFile('src/index.html', (err, result) => {
			if (err) {
				return next(err)
			}
			res.set('content-type', 'text/html')
			res.send(result)
			res.end()
		})
	})
}

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
	var text = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}

//
// setup static express directories to serve up
//
app.use(express.static(path.join(process.env.PWD, 'dist')))
   .use(cookieParser())
   .use(function (req, res, next) {
      // enable CORS for dev so that we can work on browsersync's port
	if (environment === 'dev') {
		res.header('Access-Control-Allow-Origin', '*')
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	}
	next()
})

//
// login: redirects to spotify auth server with client id
//
app.get('/login', function (req, res) {
	var state = generateRandomString(16)
	console.log(state)
	res.cookie(stateKey, state)

  // your application requests authorization
	var scope = 'user-read-private user-read-email user-follow-read playlist-read-private user-library-read'

	let query = querystring.stringify(
		{
			'response_type': 'code',
			'client_id': clientId,
			'scope': scope,
			'redirect_uri': redirectUri,
			'state': state
		})

	res.redirect('https://accounts.spotify.com/authorize?' + query)
})

//
// logout: simply removes the statekey cookie which will force
//  reauthentication on next request
//
app.get('/logout', function (req, res) {
	res.clearCookie(stateKey)
	res.redirect(`${baseUri}/#/home`)
})

//
// callback
//
app.get('/callback', function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

	var code = req.query.code || null
	var state = req.query.state || null
	var storedState = req.cookies ? req.cookies[stateKey] : null

	if (state === null || state !== storedState) {
		res.redirect('/#' +
      querystring.stringify({error: 'state_mismatch'}))
	} else {
		res.clearCookie(stateKey)
		var authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			form: {
				'code': code,
				'redirect_uri': redirectUri,
				'grant_type': 'authorization_code'
			},
			headers: {
				'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
			},
			json: true
		}
		request.post(authOptions, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				var accessToken = body['access_token']
				var refreshToken = body['refresh_token']

        // we can also pass the token to the browser to make requests from there
				res.redirect(`${baseUri}/#/auth/${accessToken}/${refreshToken}`)
			} else {
        // redirect back to the client with invalid status
				res.redirect('/#' + querystring.stringify({ error: 'invalid_token' }))
			}
		})
	}
})

//
// refreshToken
//
app.get('/refreshToken', function (req, res) {
  // requesting access token from refresh token
	var refreshToken = req.query.refreshToken
	var authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers: { 'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64')) },
		form: {
			'grant_type': 'refreshToken',
			'refresh_token': refreshToken
		},
		json: true
	}

	request.post(authOptions, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var accessToken = body.accessToken
			res.send({
				'access_token': accessToken
			})
		}
	})
})

console.log('environment: ' + environment)
console.log('redirect_url: ' + redirectUri)
console.log('process.env.PWD: ' + process.env.PWD)
console.log('Listening on ' + port)
app.listen(port)
