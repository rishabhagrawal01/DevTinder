# DevTinder APIs

## authRouter
- POST/signup
- POST/login
- POST/logout

## profileRouter
- GET/profile/view
- PATCH/profile/edit
- PATCH/profile/password

## connectionRequestRouter
- POST/request/send/interested/:userID
- POST/request/send/ignored/:userID
- POST/request/review/accepted/:requestId
- POST/request/review/ignored/:requestId

## userRouter
- GET/user/connections
- GET/user/requests
- GET/user/feed => gets you profiles of other users

Status: ignored, interested, accepted, rejected