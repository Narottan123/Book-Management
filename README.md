# Book Management Project

This project is a book management application that allows users to register, login, create books, add reviews, and perform various operations related to books.

## Technologies Used

- Node.js
- Express
- MongoDB

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js
- MongoDB

## Installation

 Clone the repository:

 1.  git clone https://github.com/Narottan123/Book-Management.git

 2. Install dependencies:  npm install

## Usage

1. Start the server:  npm start
2. Open your web browser and navigate to http://localhost:<port_number> to access the application.

## API Endpoints

## User APIs

1. POST /register: Create a user account.
2. POST /login: User login.

## Books APIs

1. POST /books: Create a book.
2. GET /books: Retrieve all books.
3. GET /books/:bookId: Retrieve a specific book.
4. PUT /books/:bookId: Update a book.
5. DELETE /books/:bookId: Delete a book.

## Review APIs

1. POST /books/:bookId/review: Add a review for a book.
2. PUT /books/:bookId/review/:reviewId: Update a review.
3. DELETE /books/:bookId/review/:reviewId: Delete a review.

## Authentication and Authorization

All book routes require authentication.
Only the owner of a book can perform create, update, and delete operations on that book.






