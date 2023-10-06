#!/usr/bin/env python3
from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from marshmallow import fields

from config import app, db, api, ma
from models import User, Book, Cart_Items, Address
import ipdb


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter(User.email == email).first()
    if user:
        if user.authenticate(password):
            session['id'] = user.id
            return make_response(jsonify(user.to_dict()), 200)
    return {'error': '401 Unauthorized'}, 401


@app.route("/logout", methods=["GET"])
def logout():
    if session.get('id'):
        session['id'] = None
        return {}, 200
    return {'error': '401 Unauthorized'}, 401


@app.route("/check_session", methods=["GET"])
def check_session():
    if session.get('id'):
        user = User.query.filter(User.id == session['id']).first()
        return make_response(jsonify(user.to_dict()), 200)
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

        except AttributeError as e:
            db.session.rollback()
            session.close()
            return {'error': '422 Unprocessable Entity'}, 422


class BooksIndex(Resource):
    def get(self):
        books = [book.to_dict() for book in Book.query.all()]
        if books:
            return make_response((books), 200)
        return [{"Message": "No Books"}], 404


class BooksById(Resource):
    def get(self, id):
        book = Book.query.get_or_404(id).to_dict()
        return (book), 200


class UserCart(Resource):
    def get(self):
        if session.get('id'):
            user = User.query.get_or_404(session['id'])
            cart = [item.to_dict() for item in user.cart_items]
            return make_response(jsonify(cart), 200)
        return [{"error": "No Items in Cart"}], 404


class UserCart_CUD(Resource):

    def post(self, id):

        if session.get('id'):
            user = User.query.get_or_404(session['id'])
            book = Book.query.filter(Book.id == id).first()

            # checks if book is already an item in users cart.
            search = Cart_Items.query.filter_by(
                user_id=user.id, book_id=book.id).first()

            item = Cart_Items()
            item.user = user
            item.book = book

            if search:
                # if book is already in the cart increase quantity by 1
                search.quantity += 1
                db.session.commit()
                
            else:
                db.session.add(item)
                db.session.commit()
            
            cart = [item.to_dict() for item in user.cart_items]
            return make_response(jsonify(cart), 200)

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
                cart = [item.to_dict() for item in user.cart_items]
                return make_response(jsonify(cart), 200)
            

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
                address = Address(
                    street=data.get('street'),
                    city=data.get('city'),
                    state=data.get('state'),
                    postal_code=data.get('postal_code'),
                    country=data.get('country')
                )
            # checks if book is already an item in users cart.
            search = Address.query.filter_by(street = address.street, city = address.city, state = address.state).first()
                
            if search:
                search.user = user
            else:
                db.session.add(address)
                address.user = user

            db.session.commit()

            return {'error': '422 Unprocessable Entity'}, 200
        return {'error': '422 Unprocessable Entity'}, 422

    def get(self):

        if session.get('id'):
            user = User.query.get_or_404(session['id'])
            if user:
                try:
                    # ipdb.set_trace()
                    addresses = [address.to_dict() for address in user.address]
                    if addresses:
                        return make_response((addresses), 200)

                except AttributeError as e:
                    return {'error': '422 Unprocessable Entity'}, 422

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
            return make_response(jsonify(user.address.to_dict()), 200)

        return {'error': '422 Unprocessable Entity'}, 422

    def delete(self):

        if session.get('id'):
            data = request.get_json()
            id = data.get('id')
            user = User.query.get_or_404(session['id'])
            address = Address.query.filter_by(id = id, user_id = user.id).first()
            db.session.delete(address)
            db.session.commit()
            
            addresses = [address.to_dict() for address in user.address]
            if addresses:
                return make_response((addresses), 200)
            


api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(BooksIndex, '/books', endpoint='books')
api.add_resource(BooksById, '/books/<int:id>', endpoint='books/id')
api.add_resource(UserCart, '/cart', endpoint='/cart')
api.add_resource(UserCart_CUD, '/cart/<int:id>', endpoint='cart/id')
api.add_resource(UserAddress_CRUD, '/address', endpoint='address')


# catches errors thrown from @validates and other exceptions
@app.errorhandler(Exception)
def handle_errors(e):
    return {'error': '422 Unprocessable Entity.'}, 404


@app.errorhandler(ValueError)
def handle_errors(e):
    return {"error": "Value Error!  Please ensure all fields are correct."}, 422


if __name__ == '__main__':
    app.run(port=5555, debug=True)
