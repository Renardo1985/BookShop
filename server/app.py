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
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        user = User.query.filter(User.email == email).first()
        
        if user:
            if user.authenticate(password):
                session['id'] = user.id
                return user.to_dict(), 200
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
            return user.to_dict(), 200
        return {'error': 'No User logged in'}, 401

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
            return make_response(user.to_dict(), 200)
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
        session['id'] = 2
        if session.get('id'):
            user = User.query.get_or_404(session['id'])
            cart = [item.to_dict() for item in user.cart_items] 
            return make_response(jsonify(cart),200)
        
class UserCart_CUD(Resource):  
            
    def post(self,id):
        session['id'] = 2
        if session.get('id'):            
            user = User.query.get_or_404(session['id'])
            book = Book.query.filter(Book.id == id).first()
            data = request.get_json()
            quantity=data.get('quantity')
            
            if book and quantity:
                try:
                    cart = Cart_Items()
                    cart.user = (user)
                    cart.book = (book)
                    cart.quantity = quantity       
                    db.session.add(cart)
                    db.session.commit()
                    return cart.to_dict(),200
                except IntegrityError:
                    return {'error': '422 Unprocessable Entity'}, 422
    
    def delete(self,id):
        session['id'] = 2
        if session.get('id'):
            user = User.query.get_or_404(session['id'])
            book = Book.query.filter(Book.id == id).first()            
            cart_item = Cart_Items.query.filter_by(user_id=user.id, book_id=book.id).first()
            
            if cart_item:
                db.session.delete(cart_item)
                db.session.commit()
                
    def patch(self,id):
        session['id'] = 2
        if session.get('id'):
            user = User.query.get_or_404(session['id'])
            book = Book.query.filter(Book.id == id).first()            
            cart_item = Cart_Items.query.filter_by(user_id=user.id, book_id=book.id).first()
            
            if cart_item:
                data = request.get_json()
                cart_item.quantity=data.get('quantity')
                db.session.commit()
                return cart_item.to_dict(),200
                
                
class UserAddress(Resource):
    
    def get(self):
        session['id'] = 2
        if session.get('id'):
            user = User.query.get_or_404(session['id'])
            addresses = [item.to_dict() for item in user.address_] 
            return make_response(jsonify(addresses),200)
        
    def patch(self):
        pass
    
    def delete(self):
        session['id'] = 21
        if session.get('id'):
            user = User.query.get_or_404(session['id'])
            book = Book.query.filter(Book.id == id).first()            
            cart_item = Cart_Items.query.filter_by(user_id=user.id, book_id=book.id).first()
            
            if cart_item:
                db.session.delete(cart_item)
                db.session.commit()
                
                

    
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint = 'logout')

api.add_resource(BooksIndex, '/books', endpoint='books')
api.add_resource(BooksById,'/books/<int:id>', endpoint='books/id')

api.add_resource(UserCart, '/cart', endpoint='/cart')
api.add_resource(UserCart_CUD, '/cart/<int:id>', endpoint='cart/id')

api.add_resource(UserAddress, '/address', endpoint='address')




if __name__ == '__main__':
    app.run(port=5555, debug=True)
