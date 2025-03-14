const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const cors = require('cors');
const app = express();

const authCookieName = 'token';

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = [];
let jokes = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(cors());
// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  console.log("Received request to create user:", req.body.email);
  if (await findUser('email', req.body.email)) {
    console.log("User already exists:", req.body.email);
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    console.log("User created successfully:", user.email);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  console.log("Received login request for:", req.body.email);
  const user = await findUser('email', req.body.email);
  if (user) {
    console.log("User found:", user.email);
    if (await bcrypt.compare(req.body.password, user.password)) {
      console.log("Password match for user:", user.email);
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    } else {
      console.log("Incorrect password for user:", req.body.email);
    }
  } else {
    console.log("User not found:", req.body.email);
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  console.log("Received logout request");
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    console.log("Logging out user:", user.email);
    delete user.token;
  } else {
    console.log("No user found to log out");
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  console.log("Verifying authentication");
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    console.log("User authenticated:", user.email);
    next();
  } else {
    console.log("Unauthorized access attempt");
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

app.post('/joke', (req, res) => {
  const { username, joke } = req.body;
  if (!username || !joke) {
    return res.status(400).json({ error: 'Username and joke are required.' });
  }
  // Create a joke object and add a timestamp.
  const newJoke = { username, joke, timestamp: new Date() };
  jokes.push(newJoke);
  res.status(201).json({ message: 'Joke saved successfully.', joke: newJoke });
});

app.get('/jokes', (req, res) => {
  const { username } = req.query;
  if (username) {
    const userJokes = jokes.filter(item => item.username === username);
    return res.json(userJokes);
  }
  // Return all jokes if no username filter is provided.
  res.json(jokes);
});

// Default error handler
app.use(function (err, req, res, next) {
  console.error("Error occurred:", err);
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  console.log("Serving default page");
  res.sendFile('index.html', { root: 'public' });
});

async function createUser(email, password) {
  console.log("Creating user:", email);
  const passwordHash = await bcrypt.hash(password, 10);
  
  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);
  console.log("User successfully added:", email);
  return user;
}

async function findUser(field, value) {
  console.log(`Searching for user by ${field}:`, value);
  if (!value) return null;
  const user = users.find((u) => u[field] === value);
  if (user) {
    console.log("User found:", user.email);
  } else {
    console.log("User not found");
  }
  return user;
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  console.log("Setting authentication cookie");
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

apiRouter.get('/jokes', verifyAuth, (_req, res) => {
    console.log("Fetching all jokes");
  
    if (jokes.length === 0) {
      console.log("No jokes found");
      return res.status(404).json({ msg: 'No jokes available' });
    }
  
    console.log(`Returning ${jokes.length} jokes`);
    res.status(200).json(jokes);
  });


// POST /joke - Add a new joke for a user
apiRouter.post('/joke', verifyAuth, (req, res) => { 
    const { email, joke } = req.body;
  
    if (!email || !joke) {
      return res.status(400).json({ msg: 'Email and joke are required' });
    }
  
    console.log(`Adding joke for user: ${email}`);
    
    jokes = updateJokes(email, joke);
  
    console.log(`Joke added successfully for ${email}`);
  
    res.status(201).json({ msg: 'Joke added successfully', joke });
  });
  

function updateJokes(email, joke) {
    // Ensure jokes exist for user
    if (!Array.isArray(jokes)) {
      jokes = [];
    }
  
    // Add new joke to the array
    const newJoke = { email, joke };
    jokes = [...jokes, newJoke]; // Functional update
  
    // Optional: Keep only the last 20 jokes to avoid infinite memory growth
    if (jokes.length > 20) {
      jokes = jokes.slice(-20);
    }
  
    return jokes;
  }
  
