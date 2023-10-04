#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from sqlalchemy.exc import SQLAlchemyError

from werkzeug.utils import secure_filename

from marshmallow import fields

from config import app, db, api, ma
from models import User, Book, Cart_Items, Address
import ipdb
import json



class User_Schema(ma.SQLAlchemySchema):
    class Meta: 
        model = User 
        include_fk = True        
    id = ma.auto_field()
    full_name = ma.auto_field()
    email = ma.auto_field()
    address = ma.auto_field()
    cart_items = ma.auto_field()
    
    
class Book_Schema(ma.SQLAlchemyAutoSchema):
    class Meta: 
        model = Book
        include_fk = True
    
class Cart_Schema(ma.SQLAlchemyAutoSchema):
    class Meta: 
        model = Cart_Items
        include_fk = True
    
class Address_Schema(ma.SQLAlchemyAutoSchema):
    class Meta: 
        model = Address
        include_fk = True    
    
   
user_schema = User_Schema()

book_schema = Book_Schema()
books_schema = Book_Schema(many = True)

cart_schema = Cart_Schema()
carts_schema = Cart_Schema(many = True)

address_schema = Address_Schema()

class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        user = User.query.filter(User.email == email).first()

        if user:
            if user.authenticate(password):
                session['id'] = user.id
                return user_schema.dump(user), 200
        
        return {'error': '401 Unauthorized'}, 401


class Logout(Resource):
    def get(self):
        if session.get('id'):
            session['id'] = None
            return {}, 200
        return {'error': '401 Unauthorized'}, 401


class CheckSession(Resource):
    def get(self):
        if session.get('id'):
            user = User.query.filter(User.id == session['id']).first()
            return user_schema.dump(user), 200
        return {'error': 'No User logged in'}, 404


class Signup(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        name = data.get('name')
        user = User(
            email=email,
            full_name=name
        )
        user.password_hash = data['password']
        db.session.add(user)
        
        try:            
            db.session.commit()
            return make_response(user.to_dict(), 200)
        
        except ValueError as e:
            db.session.rollback()
            session.close()
            return jsonify({"error":str(e)}), 422


class BooksIndex(Resource):
    def get(self):
        books =  Book.query.all()
        if books:
            return books_schema.dump(books), 200
        return [{"Message": "No Books"}], 404


class BooksById(Resource):
    def get(self, id):
        book = Book.query.get_or_404(id).to_dict()
        return book_schema.dump(book), 200


class UserCart(Resource):
    def get(self):
        if session.get('id'):
            user = User.query.get_or_404(session['id'])
            cart = [item.to_dict() for item in user.cart_items]
            return make_response(jsonify(cart), 200)


class UserCart_CUD(Resource):

    def post(self, id):
        
        if session.get('id'):
            user = User.query.get_or_404(session['id'])
            book = Book.query.filter(Book.id == id).first()
            data = request.get_json()
            quantity = data.get('quantity')

            if book and quantity:
                try:
                    cart = Cart_Items()
                    cart.user = (user)
                    cart.book = (book)
                    cart.quantity = quantity
                    db.session.add(cart)
                    db.session.commit()
                    
                    return cart.to_dict(), 200
                except IntegrityError:
                    return {"error": "422: Unprocessable Entity"}, 422

    def delete(self, id):
        
        if session.get('id'):
            user = User.query.get_or_404(session['id'])
            book = Book.query.filter(Book.id == id).first()
            cart_item = Cart_Items.query.filter_by(
                user_id=user.id, book_id=book.id).first()

            if cart_item:
                db.session.delete(cart_item)
                db.session.commit()

    def patch(self, id):
        
        if session.get('id'):
            user = User.query.get_or_404(session['id'])
            book = Book.query.filter(Book.id == id).first()
            cart_item = Cart_Items.query.filter_by(
                user_id=user.id, book_id=book.id).first()

            if cart_item:
                data = request.get_json()
                cart_item.quantity = data.get('quantity')
                db.session.commit()
                return cart_item.to_dict(), 200


class UserAddress_CRUD(Resource):

    def post(self):
        
        if session.get('id'):
            user = User.query.get_or_404(session['id'])
            data = request.get_json()
            if user and data:
                try:
                    address = Address(
                        street=data.get('street'),
                        city=data.get('city'),
                        state=data.get('state'),
                        postal_code=data.get('postal_code'),
                        country=data.get('country')
                    )
                    address.user_id = user.id
                    db.session.add(address)
                    db.session.commit()
                    return address.to_dict(), 200
                except IntegrityError:
                    return {'error': '422 Unprocessable Entity'}, 422

    def get(self):
        
        if session.get('id'):
            user = User.query.get_or_404(session['id'])
            if user:
                return make_response(jsonify(user.address.to_dict()), 200)

    def patch(self):
        
        data = request.get_json()
        user = User.query.get_or_404(session['id'])

        if data and user.address:
            user.address.street = data.get('street', user.address.street)
            user.address.city = data.get('city', user.address.city)
            user.address.state = data.get('state', user.address.state)
            user.address.postal_code = data.get(
                'postal_code', user.address.postal_code)
            user.address.country = data.get('country', user.address.country)
            db.session.commit()

    def delete(self):
        
        if session.get('id'):
            user = User.query.get_or_404(session['id'])

            if user.address:
                db.session.delete(user.address)
                db.session.commit()


api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')

api.add_resource(BooksIndex, '/books', endpoint='books')
api.add_resource(BooksById, '/books/<int:id>', endpoint='books/id')

api.add_resource(UserCart, '/cart', endpoint='/cart')
api.add_resource(UserCart_CUD, '/cart/<int:id>', endpoint='cart/id')

api.add_resource(UserAddress_CRUD, '/address', endpoint='address')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
