const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const cors = require('cors');
const app = express();
const DB = require('./database');

const authCookieName = 'token';

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
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    DB.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

app.post('/joke', async (req, res) => {
  try {
    const { email, joke } = req.body;

    if (!email || !joke) {
      return res.status(400).json({ msg: 'Email and joke are required' });
    }

    console.log(`Adding joke for user: ${email}`);

    // Create the joke object with a timestamp
    const newJoke = { email, joke, timestamp: new Date() };

    // Add the joke to the database
    const updatedJokes = await updateJokes(newJoke);

    console.log(`Joke added successfully for ${email}`);

    res.status(201).json({ msg: 'Joke added successfully', jokes: updatedJokes });
  } catch (error) {
    console.error('Error adding joke:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/jokes', async (req, res) => {
  const { username } = req.query;
  if (username) {
    const userJokes = await DB.getSaves(username);
  }
  // Return all jokes if no username filter is provided.
  res.json(jokes);
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  console.log("Serving default page");
  res.sendFile('index.html', { root: 'public' });
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  
  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);
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
  

async function updateJokes(newJoke) {
    await DB.addSave(newJoke);
    return DB.getSaves();
  }
  
