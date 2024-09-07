# Job Posting and Application Platform

The guide for APIs, running the project and test

## API Routes

Here is an overview of the available API routes:

- **POST `/register`**: Register a new user.
- **POST `/login`**: Log in to the system and receive a JWT token.
- **POST `/applications`**: Submit a new job application.
- **GET `/applications/:id`**: View applications for a specific job posting (requires authentication).
- **PUT `/applications/:id`**: Update the status of a job application (requires authentication).
- **POST `/jobs`**: Create a new job posting (requires authentication).
- **PUT `/jobs/:id`**: Update an existing job posting (requires authentication).
- **DELETE `/jobs/:id`**: Delete a job posting (requires authentication).
- **GET `/jobs`**: Fetch all job postings.

## Getting Started

### Prerequisites

- Make sure you have [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.

### Setting Up Environment Variables

Create a `.env` file in the root of your project with the following contents:
```plaintext
DB_USER=postgres
DB_HOST=db
DB_PASSWORD=example
DB_NAME=job_platform
DB_PORT=5432
JWT_SECRET=a76ca7659bee25b8d7788ca87c8875c68d9c9e745d2bc084d7fe81972127094bc44462bf08c7a17fa3bb21f222c1caa8ee4d40992f7d3aaec773902f696e474b
```
    



### Running the Application with Docker

1. Clone the repository to your local machine.
   
2. Build and start the application using Docker Compose:
   ```bash
   docker-compose up --build
3. Once the containers are up and running, you can access the application at http://localhost:3000

### Run the tests in Docker
To run the tests, use the following command and see the results of tests:
   ```bash
   npm run docker:test
   ```