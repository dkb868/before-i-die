# API Cheatsheet (Documentation)

## User routes

##### GET /api/users  
returns all users
- status: true,
- users: users,
- message:"All users fetched!",

##### GET /api/users/:userId
returns one user based on id
- status: true,
- user: user,
- message:"User found!",  

If user not found
- status: false,
- user: undefined,
- message: err message,

##### GET /api/users/dreams/:userId  
returns dreams of userId
- status: true,  
- dreams: user.dreams,
- message: "Takes your dreams baby",

If -*user*- not found (if no dreams found, status will be true with dreams = empty array [])
- status: false,
- dreams: undefined,
- message: err message,

##### POST /api/users/createAccount
creates a new user account  

*BODY* (no validation being done right now)
- email
- password

returns user on success (password is hashed)
- status: true,
- user: newUser,
- message: "Account successfully created",

If account creation fails
- status: false,
- user: undefined,
- message: err message

## Auth routes

##### POST /api/auth/login
Login the current user session  

*BODY*
- email
- password

returns user on success
- status: true,
- user: req.user,
- message: "Logged in!"

on failure
- status: false,
- user: undefined,
- message: "Invalid email or password."

##### GET /api/auth/logout
logout the current user session
- status: true,
- message: "Logged out!"

##### GET /api/auth/status
checks if user is logged in or not

if yes
- status: true

if no
- status: false

## API (Dream) routes

.... TODO
