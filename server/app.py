#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Book, Cart, Address

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
    
class Users(Resource):
    
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        if users:
            return make_response(jsonify(users), 200)
        return [{"Message": "No Books"}], 404
    
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
# api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(BooksIndex, '/books', endpoint='books')
api.add_resource(BooksById,'/books/<int:id>', endpoint='books/id')
api.add_resource(Users, '/users', endpoint='users')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
