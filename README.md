# Project Name: Cooksy
## Introduction :

A full-stack web application designed for food lovers to share, discover, and organize their favorite recipes. This project includes user registration, recipe submission with ingredient checklists, timers, ratings, comments, and premium membership features.



## Features 
1. User Registration & Login: Secure user authentication with JWT.
2. Recipe Sharing: Submit and manage your own recipes with detailed instructions and images.
3. Rating & Comments: Rate recipes and comment on them.
4. Premium Membership: Subscription-based access to exclusive content using Stripe.
5. Admin Dashboard: Admins can manage recipes and user accounts.

## Technology Stack :computer:
- Frontend: React, NextJs
- Backend: Node.js, Express.js, Typescript
- Database: MongoDB

## Installation Guidelines 
- [x] clone the repository
```
git clone repolink
```
- [x] Install Dependencies
```
npm install
```

## Configuration for server site :bookmark_tabs:

- [x] First of all clone the git repository of the server of the project. Then use npm install to install necessary packages. If not all dependencies are installed you need to install these
```
        "cloudinary": "^2.5.1",
        "cookie-parser": "^1.4.6",
        "cors": "^2.8.5",
        "dotenv": "^16.4.5",
        "express": "^4.21.0",
        "http-status": "^1.7.4",
        "jsonwebtoken": "^9.0.2",
        "mongoose": "^8.7.0",
        "multer": "^1.4.5-lts.1",
        "multer-storage-cloudinary": "^4.0.0",
        "nodemailer": "^6.9.15",
        "stripe": "^17.2.0",
        "ts-node-dev": "^2.0.0",
        "zod": "^3.23.8"
```
- [x] For installing eslint and prettier for the project use the following command:
```
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev

```
```
npm install --save-dev prettier

```
```
npm install --save-dev eslint-config-prettier

```



- [x] You may need to install all the devDependencies.Your dependencies need to look like this.
```
   "@types/node": "20.5.7",
		"@types/react": "18.3.3",
		"@types/react-dom": "18.3.0",
		"@typescript-eslint/eslint-plugin": "7.2.0",
		"@typescript-eslint/parser": "7.2.0",
		"autoprefixer": "^10.4.19",
		"eslint": "^8.57.0",
		"eslint-config-next": "14.2.1",
		"eslint-config-prettier": "^8.2.0",
		"eslint-plugin-import": "^2.26.0",
		"eslint-plugin-jsx-a11y": "^6.4.1",
		"eslint-plugin-node": "^11.1.0",
		"eslint-plugin-prettier": "^5.1.3",
		"eslint-plugin-react": "^7.23.2",
		"eslint-plugin-react-hooks": "^4.6.0",
		"eslint-plugin-unused-imports": "^3.2.0",
		"postcss": "^8.4.38",
		"tailwind-variants": "0.1.20",
		"tailwindcss": "^3.4.3",
		"typescript": "5.0.4"
```

- [x] To compile you may use the command
```
npm run build
```
- [x] To start server you need to use
```
npm run start:dev
```
- [x] You may use these command using npm run 'your desired command' to get your desired functionality.These are all available in package.json file
```
    "start:prod": "node ./dist/server.js",
    "start:dev": " ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "lint": "eslint src --ignore-path .eslintignore --ext .ts",
    "fix": "npx eslint src --fix",
    "prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
    "prettier:fix": "npx prettier --write src",
    "test": "echo \"Error: no test specified\" && exit 1"
```
- [x] Create a .env file for server
```
PORT=4000
NODE_ENV=development
JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=
RESET_PASS_UI_LINK=
DATABASE_URL=




CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=


SECRET_KEY=
```

- [x] Create a .env.local file for client


NEXT_PUBLIC_STRIPE=

### Usage
- [x] To run client site use command
```
npm run dev
```
- [x] To start server you need to use
```
npm run start:dev
```
















