#!/usr/bin/env python3

from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, User, Book, Address, Cart_Items, user_book

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        
        print("Deleting all records...")
        db.session.execute(user_book.delete())
        Book.query.delete()
        User.query.delete()
        Address.query.delete()
        Cart_Items.query.delete()
      
        
        print("Starting seed...")        
        print("Creating users...")
        users = []
        emails = []

        for i in range(30):
            email = fake.email()
            while email in emails:
                email = fake.email()
            emails.append(email)
            user = User(
                email=email,
                full_name= fake.name()
            )
            user.password_hash = user.full_name + 'pass'
            user.is_admin = fake.boolean()
            users.append(user)
            
        db.session.add_all(users)
        
        print("Creating Books...")        
        books = []
        isbns = []        
        for i in range(50):
            isbn = fake.isbn13()
            while isbn in isbns:
                isbn = fake.isbn13()
            isbns.append(isbn)            
            price = fake.pyfloat(right_digits=2, positive=True, max_value=100.99)           
            book = Book(
                title= fake.sentence(nb_words = 4),
                isbn_13= isbn,
                author= fake.name(),
                price= price,
                image= fake.url(),
                publisher= fake.company(),
                description=fake.paragraph(nb_sentences=8),
                category= "N/A",
            )
            books.append(book)
        db.session.add_all(books)        
        print("Generating Addresses...")        
        addresses = [] 
        for i in range(30):            
            address = Address(
                street = fake.street_address(),
                city = fake.city(),
                state = fake.state(),
                postal_code = fake.postcode(),
                country = fake.current_country(),
            )            
            address.user = rc(users)      
            addresses.append(address)        
        db.session.add_all(addresses)   
                   
        
        
        print("Making Virtual carts...")
        carts = []
        for i in range(15):            
            cart = Cart_Items(
                quantity = randint(1,5)
            )            
            cart.user = rc(users)            
            cart.book = rc(books)                    
            
            carts.append(cart)   
            
                     
        db.session.add_all(carts)
        
        
        for i in range(5):             
            rc(users).books.append(rc(books))
            
        db.session.commit()
        
        print("All done seeding.")

