import React, { useEffect } from 'react';
import axios from 'axios';

type BookType = {
    _id: string;
    title: string;
    author: string;
    quantity: number;
};

const Book: React.FC = () => {
    const [books, setBooks] = React.useState<BookType[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/book');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-center text-5xl font-extrabold mb-8 text-gray-800">Book Collection</h1>
            {books.length === 0 ? (
                <div className="flex justify-center text-lg text-gray-600">No books available</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <div key={book._id} className="border border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-200">
                            <h3 className="font-bold text-3xl mb-2 text-center text-gray-700">{book.title}</h3>
                            <p className="text-lg text-gray-600"><strong>Author:</strong> {book.author}</p>
                            <p className="text-lg text-gray-600"><strong>Quantity:</strong> {book.quantity}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Book;