# The BookShop
![Home](https://github.com/Renardo1985/Phase-5-Project/blob/c76a4c47a2d25db72b186ce479e5526b9fd43a8b/media/Screenshot%202023-10-08%20142541.png)

## Description
Bookstore web application that provides users with the ability to browse books, add books to cart, and purchase books. 

### Entity Relationship Diagram
![ER Diagram](https://github.com/Renardo1985/Phase-5-Project/blob/c76a4c47a2d25db72b186ce479e5526b9fd43a8b/media/ER%20Diagram.png)






## Technologies
<ul>
    <li>Python</li>
    <li>Java-script</li>
    <li>Flask</li>
    <li>Flask-SQLalchemy</li>
    <li>React</li>
    <li>React-bootstrap</li>   
</ul>

## Installation

**NOTE:** Python v3.8, Node.js and `pipenv` are required to use this application. Please see the official Python, Node.js and `pipenv` documentation for instructions on how to ensure these are installed and configured on your machine.

## Getting Started
### Clone the repo
```bash
git@github.com:Renardo1985/Phase-5-Project.git
```
### Backend setup  
### `pipenv install` run from server directory
### `pipenv shell` run from server directory
### `python3 seed.py` run from server directory in the virtual environment
**NOTE:** running seed.py will populate the books table in the database and deletes all other data.
### then `python3 app.py` server directory in the virtual environment

### Frontend setup
### `npm install --prefix client` from directory
### `npm start --prefix client` from directory this should auto open the app in your browser

**NOTE:** Use separate terminals!!

## Screenshots

![Login/Signup](https://github.com/Renardo1985/Phase-5-Project/blob/c76a4c47a2d25db72b186ce479e5526b9fd43a8b/media/Screenshot%202023-10-08%20124327.png)
![Books](https://github.com/Renardo1985/Phase-5-Project/blob/c76a4c47a2d25db72b186ce479e5526b9fd43a8b/media/Screenshot%202023-10-08%20142557.png)
![Cart](https://github.com/Renardo1985/Phase-5-Project/blob/c76a4c47a2d25db72b186ce479e5526b9fd43a8b/media/Screenshot%202023-10-08%20124138.png)
![Profile](https://github.com/Renardo1985/Phase-5-Project/blob/c76a4c47a2d25db72b186ce479e5526b9fd43a8b/media/Screenshot%202023-10-08%20124258.png)

USER STORY

## Registration:

Fill out the Signup form with your Full name, unique email, and a secure password.
Submit the registration form.
Upon successful registration, the user is automatically logged in, and redirected to the homepage.

Browsing:

After registration and login, users can browse the Books.

Adding Books to Cart:

To purchase a book, users can click an "Add to Cart" button on the books page.
The book is then added to their shopping cart.

Viewing Cart:

Users can navigate to their cart page to view all the items they've added for purchase.
They can update the quantity of items or remove items from the cart.

Checkout:

Users can proceed to the checkout page from the cart.

After confirming the order, they finalize the purchase.

Logging Out:

When finished, users can log out by clicking the "Logout" link or button.
They are then logged out and redirected to the login page.




Models:

Table Name: Users
Attributes:
id (Primary Key): Unique identifier for each user.
email: User's unique key for authentication.
password: hashed.
Additional attributes like username, full_name, address etc.
Relationships:
User-Wishlist: One-to-Many relationship with the Wishlist model.
User-CartItem: One-to-Many relationship with the CartItem model.

Table Name: books
Attributes:
id (Primary Key): Unique identifier for each book.
title: Title of the book.
author: Author of the book.
price: Price of the book.
Additional attributes like description, genre, etc.
Relationships:
Book-Wishlist: One-to-Many relationship with the Wishlist model.
Book-CartItem: One-to-Many relationship with the CartItem model.

Table Name: wishlists
Attributes:
id (Primary Key): Unique identifier for each wishlist item.
added_date:
user_id (Foreign Key): References the id field of the User model
book_id (Foreign Key): References the id field of the Book model

Table Name: cart_items
Attributes:
id (Primary Key): Unique identifier for each cart item.
added_date: To track when the book was added to the cart
user_id (Foreign Key): References the id field of the User model
book_id (Foreign Key): References the id field of the Book model
quantity: Quantity of the book in the cart.


1. User Authentication Routes:

/register (POST): Register a new user.
/login (POST): Log in an existing user.
/logout (GET or POST): Log out the currently authenticated user.

2. Bookstore Routes:

/books (GET): Retrieve a list of all available books in the bookstore.
/books/<int:book_id> (GET): Retrieve details for a specific book by its ID.


3. Cart Routes:

/cart (GET): Retrieve the user's shopping cart.
/cart/add/<int:book_id> (POST): Add a book to the user's shopping cart.
/cart/remove/<int:book_id> (POST): Remove a book from the user's shopping cart.
/cart/update/<int:cart_item_id> (POST): Update the quantity of a book in the user's shopping cart.


Login Page/Registration Page:

A form for users to register for an account.
Input fields for username, password, email, and other user-specific information.
A form for users to log in to their accounts.
Input fields for username and password.

Home Page:

Display a list of available books from the bookstore.
Allow users to browse and view book details.
Provide options to add books to the wishlist and cart.

4. Cart Page:

Display the user's shopping cart with items they've added.
Allow users to update the quantity or remove items from the cart.
Provide a button to proceed to the checkout page.
Collect user information (e.g., shipping address).
**Provide options for payment (e.g., credit card, PayPal).
Confirm the order and show a summary.

User Authentication

Validations & Constraints here
email looks email
bcrypt
password hashing

## Resources

- [Setting up a respository - Atlassian](https://www.atlassian.com/git/tutorials/setting-up-a-repository)
- [Create a repo- GitHub Docs](https://docs.github.com/en/get-started/quickstart/create-a-repo)
- [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)
- [Python Circular Imports - StackAbuse](https://stackabuse.com/python-circular-imports/)
- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/)
