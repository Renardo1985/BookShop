from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'    
    serialize_rules = ('-address_.user', '-_password_hash','-cart_items.user',)
    id = db.Column(db.Integer, primary_key=True)
    _password_hash= db.Column(db.String)
    email = db.Column(db.String(100), unique=True, nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    
    cart_items = db.relationship('Cart_Items', lazy = True)
    address_ = db.relationship('Address', lazy = True)

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
    
class Address(db.Model, SerializerMixin):
    __tablename__ = 'addresses'
    id = db.Column(db.Integer, primary_key=True)
    street = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    postal_code = db.Column(db.String(20), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'
    serialize_rules = ('-cart_items',)
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    isbn_13 = db.Column(db.String,unique=True)
    author = db.Column(db.String(100))
    price = db.Column(db.Float)
    image = db.Column(db.String(100))
    publisher = db.Column(db.String(100))
    description = db.Column(db.String)
    category = db.Column(db.String)
    
    cart_items = db.relationship('Cart_Items', backref='book', lazy = True)

class Cart_Items(db.Model,SerializerMixin):
    __tablename__ = 'cart'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    quantity = db.Column(db.Integer, default=1)  # Default to 1 book
    added_date = db.Column(db.DateTime, server_default=db.func.now())
