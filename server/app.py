#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Book, Cart_Items, Address
import ipdb
# Views go here!

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
        return {'error': '401 Unauthorized'}, 401

class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
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
        book = Book.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(book),200)
    
class UserCart(Resource):
    
    def get(self,id):
        user = User.query.get_or_404(id)
       
        if user:
            cart = user.cart_items   
            cart_items_json = [{
            'book_id': cart_item.book_id,
            'book_title': cart_item.book.title,
            'book_price': cart_item.book.price,            
            'quantity': cart_item.quantity,
            'date_added': cart_item.added_date,
            } for cart_item in cart] 
                    
            return jsonify({'user': user.full_name, 'cart_items': cart_items_json})
        
        return [{"Message": "Empty Cart"}], 404
    
class UserAddress(Resource):
    
    def get(self,id):
        user = User.query.get_or_404(id)
       
        if user:
            address = user.addresses  
            addresses_json = [{
            'street': addy.street,
            'city': addy.city,
            'state': addy.state,            
            'code': addy.postal_code,
            'country': addy.country,
            } for addy in address] 
                    
            return jsonify({'user': user.full_name, 'cart_items': addresses_json})
        
        return [{"Message": "Empty Cart"}], 404
    
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(BooksIndex, '/books', endpoint='books')
api.add_resource(BooksById,'/books/<int:id>', endpoint='books/id')
api.add_resource(UserCart, '/users/cart/<int:id>', endpoint='users/cart/id')
api.add_resource(UserAddress, '/users/address/<int:id>', endpoint='users/address/id')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
