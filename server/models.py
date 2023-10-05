from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
import re


from config import db, bcrypt

cart_table = db.Table(
    'cart',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('book_id', db.Integer, db.ForeignKey('book.id'))
)


class User(db.Model, SerializerMixin):
    __tablename__ = 'user'
    serialize_rules = ('-books', '-_password_hash',
                       '-cart_items', '-books_in_cart',)
    id = db.Column(db.Integer, primary_key=True)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String(100), unique=True, nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    is_admin = db.Column(db.Boolean(), default=False)

    cart_items = db.relationship('Cart_Items', backref='user')
    address = db.relationship('Address', uselist=False, backref='user')
    books = db.relationship('Book', secondary=cart_table, backref='users')

    # books = association_proxy('books_in_cart', 'title')

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hash is not accessible")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    @validates('email')
    def validate_email(self, key, email):
        # Use a simple regular expression to check the email format
        email_regex = re.compile(r"[^@]+@[^@]+\.[^@]+")
        if not email_regex.match(email):
            raise ValueError("Please enter a valid email address")
        return email


class Address(db.Model, SerializerMixin):
    __tablename__ = 'address'
    serialize_rules = ('-user',)
    id = db.Column(db.Integer, primary_key=True)
    street = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    postal_code = db.Column(db.String(20), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True)


class Book(db.Model, SerializerMixin):
    __tablename__ = 'book'
    serialize_rules = ('-cart_items', '-users',)
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    isbn_13 = db.Column(db.String, unique=True)
    author = db.Column(db.String(100))
    price = db.Column(db.Float)
    image = db.Column(db.String(100))
    publisher = db.Column(db.String(100))
    description = db.Column(db.String)
    category = db.Column(db.String)

    cart_items = db.relationship('Cart_Items', backref='book')

    @validates('isbn_13')
    def validate_isbn_13(self, key, isbn_13):
        if isbn_13:
            # Remove hyphens and spaces
            isbn = isbn_13.replace("-", "").replace(" ", "")
            # Check if the ISBN has 13 digits
            if len(isbn) != 13:
                raise ValueError("Invalid ISBN please check")
            # Calculate ISBN13 checksum
            total = 0
            for i in range(12):
                digit = int(isbn[i])
                total += digit * (1 if i % 2 == 0 else 3)

            check_digit = (10 - (total % 10)) % 10

            if check_digit == int(isbn[12]):
                return isbn_13
        else:
            raise ValueError("Invalid ISBN")


class Cart_Items(db.Model, SerializerMixin):
    __tablename__ = 'cart_item'
    serialize_rules = ('-user',)
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, default=1)  # Default to 1 book
    added_date = db.Column(db.DateTime, server_default=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'))
