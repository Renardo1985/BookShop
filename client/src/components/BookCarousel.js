import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';





function BookCarousel({ books }) {

if(books){

	return(
			<Carousel>
			  {books.map((book, index) => (
				<Carousel.Item key={index}>
				  <div className='book'>
					<img src={book.image} alt={book.title}/>
					<h3>{book.title}</h3>
				  </div>
				</Carousel.Item>
			  ))}
			</Carousel>
		  );


	
}
};

export default BookCarousel;