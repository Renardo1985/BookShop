#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Book, Cart_Items, Address
import ipdb
import json
# Views go here!

class Login(Resource):
    def get(self):
        # data = request.get_json()
        # email = data.get('email')
        # password = data.get('password')
        # user = User.query.filter(User.email == email).first()
        user = User.query.get_or_404(3)
        if user:
            # if user.authenticate(password):
            session['id'] = user.id
            return user.to_dict(), 200
        return {'error': '401 Unauthorized'}, 401

class CheckSession(Resource):
    def get(self):
        
        if session.get('id'):
            user = User.query.filter(User.id == session['id']).first()
            return user.to_dict(), 200
        return {'error': '401 Unauthorized'}, 401

class Signup(Resource):
    def post(self):        
        data = request.get_json()
        
        email = data.get('email')
        name = data.get('name')        
        user = User(
            email = email,
            full_name = name
        )        
        user.password_hash = data['password']  
        try:
            db.session.add(user)
            db.session.commit()
            return make_response(user.to_dict(), 201)
        except IntegrityError:
            return {'error': '422 Unprocessable Entity'}, 422
        
class BooksIndex(Resource):
    def get(self):
        books = [book.to_dict() for book in Book.query.all()]
        if books:
            return make_response(jsonify(books), 200)
        return [{"Message": "No Books"}], 404
    
class BooksById(Resource):
    
    def get(self,id):
        book = Book.query.get_or_404(id).to_dict()
        return make_response(jsonify(book),200)
    
class UserCart(Resource):
    
    def get(self):
        if session.get('id'):
            user = User.query.get_or_404(session['id'])
            cart = [item.to_dict() for item in user.cart_items] 
            return make_response(jsonify(cart),200)
    
class UserAddress(Resource):
    
    def get(self):
        if session.get('id'):
            user = User.query.get_or_404(session['id'])
            addresses = [item.to_dict() for item in user.address_] 
            return make_response(jsonify(addresses),200)
    
class UserCart_Add(Resource):
    
    def get(self,book_id):
        if session.get('id'):
            
            user = User.query.get_or_404(session['id'])
            book = Book.query.filter(Book.id == book_id).first()
            
            if book:
                try:
                    cart = Cart_Items(
                        
                    )
                    cart.user = (user)
                    cart.book = (book)
                    db.session.add(cart)
                    db.session.commit()
                    return cart.to_dict(),200
                except IntegrityError:
                    return {'error': '422 Unprocessable Entity'}, 422
                
    
    
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')

api.add_resource(BooksIndex, '/books', endpoint='books')
api.add_resource(BooksById,'/books/<int:id>', endpoint='books/id')

api.add_resource(UserCart, '/users/cart', endpoint='users/cart')
api.add_resource(UserCart_Add, '/users/cart/<int:book_id>', endpoint='users/cart/book_id')
# /cart/add/<int:book_id> (POST): 
# /cart/remove/<int:book_id> (POST): 
# /cart/update/<int:cart_item_id> (POST): 

api.add_resource(UserAddress, '/users/address', endpoint='users/address')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
