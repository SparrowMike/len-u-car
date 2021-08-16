# len-u-car

### 1. Back-End

- cd len-u-car
- touch .env (copy everything from .env.example)
- npm i express dotenv nodemon pg cors
- npm i cloudinary multer
-
- npm i bcrypt
- npm i express-session
- npm i redis connect-redis
-
- npm install knex --save

### 2. Front-End

- npm ci
- npm i react-router react-router-dom
- npm install --save @types/react-router-dom
- npm install --save @types/react-router
- npm install @material-ui/core
- npm install @material-ui/icons

- npm install react-slick --save
- npm install slick-carousel --save
- npm i @types/react-slick --save-dev
- npm i @material-ui/lab

- npm i react-query
- npm install react-infinite-scroll-component

- npm install --save material-ui-dropzone
- npm i js-cookie
- npm i --save-dev @types/js-cookie

#### React Typesript cheatsheet

- https://github.com/typescript-cheatsheets/react

### 3. Postsres commands

- psql -U postgres or psql postgres
- \l (show all database)
- \c <fileName> (go inside specified DB)
- \dt (show all the tables inside the DB)

### 4. GIT commands

#### Must Know GIT

- git branch <== to check branch
- git branch <branchName> <== to create new branch
- git checkout -b <newBranchName> <== simultaneously creates and checks out branch
- git checkout <branchName> <== to switch branch
- git add <fileYouWorkedOn> <== example ==> git add server.js
- npx git-cz (commit)
- git push <== then copy command provided in terminal
  OR
- git push -u origin <branchName>
- go to the link from terminal and create Pull request <==> starts with ==> "Create a pull request for...."

#### Usefull GIT commands

- git status
- git log
- git log --graph --oneline --all <== show tree-view log
- git diff <== show the difference
- git branch -d <branchName> <== delete branch locally
