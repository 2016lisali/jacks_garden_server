# Backend of Jack's Garden online Store.

This is the backend code of Jack's Garden Online Store. The online server is hosted on [https://jacks-garden-server.herokuapp.com](https://jacks-garden-server.herokuapp.com)

You can find the e-shop code on [https://github.com/2016lisali/jacks_garden](https://github.com/2016lisali/jacks_garden) and the admin panel code on [https://github.com/2016lisali/jacks_garden_admin_panel](https://github.com/2016lisali/jacks_garden_admin_panel)

## Requirements for Installation:

1. Node
2. MySQL or MariaDB
3. Yarn or NPM

## Installation

1. Import database.dump to your local Mysql database, and run the database server.

2. Download the zip file and unzip

3. Then open the file in your code editor, open the terminal and run

```
> npm install
```

4. Create a `.env` file in root folder and enter following fields for cloud database
   ```env
   JWT_SECRET = YOUR_JWT_SECRET
   STRIPE_TEST_KEY = YOUR_STRIPE_KEY
   HOST = YOUR_DB_HOST
   DBUSER = YOUR_DB_USER
   PASSWORD = YOUR_DB_PASSWORD
   DATABASE = YOUR_DB_NAME
   ```
5. In editor terminal run

```
> npm start
```

the server will be running on http://localhost:5000

## Technologies

- node
- express
- mysql2
- jasonwebtoken
- multer
- stripe
- bcypt
- express-validator
- express-rate-limit
- express-slow-down
- cors

## Road Map

- Limit login attempts
- access token and refresh token
- store token in cookies instead of localstorage
- generate different salt for each user password
- auth service such as firebase autho,
- graphQL
