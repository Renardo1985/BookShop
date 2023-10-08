

Main idea: Bookstore web application that provides users with the ability to browse books, add books to wishlist, and purchase books with using a cart feature. 

USER STORY

Registration:

If not already registered, click on the "Register" link or button to create an account.
Fill out the registration form with a unique username, a secure password, and any other required information (e.g., email).
Submit the registration form.
Upon successful registration, the user is automatically logged in, and redirected to the homepage.

Browsing and Searching for Books:

After registration and login, users can browse the homepage or use the search feature to find books.
Click on a book's title or image to view its details.

Viewing Book Details:

On the book details page, users can see information such as the book's title, author, price, description, and any other relevant details.
Users can decide to add the book to their wishlist or cart from this page.

Adding Books to Wishlist:

To add a book to their wishlist, users can click an "Add to Wishlist" button on the book details page.
The book is then added to their wishlist.

Viewing Wishlist:

Users can navigate to their wishlist page to view all the books they've added for future reference.
They can remove books from the wishlist if they are no longer interested.

Adding Books to Cart:

To purchase a book, users can click an "Add to Cart" button on the book details page.
The book is then added to their shopping cart.

Viewing Cart:

Users can navigate to their cart page to view all the items they've added for purchase.
They can update the quantity of items or remove items from the cart.

Checkout:

Users can proceed to the checkout page from the cart.
They enter shipping information and choose a payment method.
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

3. Wishlist Routes:

/wishlist (GET): Retrieve the user's wishlist.
/wishlist/add/<int:book_id> (POST): Add a book to the user's wishlist.
/wishlist/remove/<int:book_id> (POST): Remove a book from the user's wishlist.

4. Cart Routes:

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

4. Wishlist Page:

Display the user's wishlist with books they've added.
Allow users to remove books from their wishlist. 

5. Cart Page:

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
