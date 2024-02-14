# CRUD API Assignment Completion

## Description
I have successfully completed the CRUD API assignment as per the requirements provided. The API is implemented using Node.js with Express framework and supports operations for creating, reading, updating, and deleting user records.
## Implementation Details
- **Language:** JavaScript
- **Framework:** Express.js
- **Node.js Version:** 20 LTS

## Branches
- **development:** This branch contains the implementation where MongoDB is used as the database.
- **sqlDev:** This branch contains the implementation where MySQL is used as the database.

## Scripts
- **start:dev:** Runs the application in development mode using nodemon.
- **start:prod:** Starts the application in production mode after the build process.
- **start:multi:** Starts multiple instances of the application using Node.js Cluster for horizontal scaling.
- **test:** Test the endpoint using jest

## Instructions
1. Clone the repository: `git clone [repository_url]`
2. Switch to the desired branch: `git checkout [branch_name]`
3. Install dependencies: `npm install`
4. Run the application:
   - Development mode: `npm run start:dev`
   - Production mode: `npm run start:prod`
   - Multi-instance mode: `npm run start:multi`
   - For the Test Case:`npm run test`
5. Access the API endpoints based on the specified routes.


## Environment Variables
Before running the application, ensure you have set the following environment variables:

You can set these environment variables in a `.env` file in the root directory of the project or through your system's environment variables.

Example `.env` file:

Env variable are:-

monogoDbUrl=mongodb+srv://akash12:Akash1234@cluster0.cv5byxz.mongodb.net/?retryWrites=true&w=majority

PORT=3000

DB_DATABASE=sql6683921

DB_USER=sql6683921

DB_PASSWORD=Kzzj7rjWxH

DB_HOST=sql6.freemysqlhosting.net



## Author
Akash Kumar

## Contact
For any inquiries or assistance, please contact me at akashcse201620@gmail.com.
