import React, { useEffect, useState } from 'react';
import axios from 'axios';

type BookType = {
    _id: string;
    title: string;
    author: string;
    quantity: number;
};

const Book: React.FC = () => {
    const [books, setBooks] = useState<BookType[]>([]);
    const [updatingBookId, setUpdatingBookId] = useState<string | null>(null);
    const [newQuantity, setNewQuantity] = useState<number | null>(null);

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

    const handleDelete = async (bookId: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/book/${bookId}`);
            setBooks(books.filter(book => book._id !== bookId));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const handleUpdateQuantity = async (bookId: string) => {
        if (newQuantity === null) return;

        try {
            const response = await axios.patch(`http://localhost:5000/api/book/${bookId}`, { quantity: newQuantity });
            if (response.status === 200) {
                setBooks(books.map(book => book._id === bookId ? { ...book, quantity: newQuantity } : book));
                setUpdatingBookId(null);
                setNewQuantity(null);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

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

                            {updatingBookId === book._id ? (
                                <div>
                                    <input
                                        type="number"
                                        value={newQuantity === null ? '' : newQuantity}
                                        onChange={(e) => setNewQuantity(Number(e.target.value))}
                                        min="0"
                                        className="border border-gray-300 rounded px-2 py-1 mb-2 mr-3"
                                        placeholder="New Quantity"
                                    />
                                    <button
                                        onClick={() => handleUpdateQuantity(book._id)}
                                        className="bg-green-500 text-white rounded py-1 px-4 mr-2"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => setUpdatingBookId(null)}
                                        className="bg-red-500 text-white rounded py-1 px-4"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => { setUpdatingBookId(book._id); setNewQuantity(book.quantity); }}
                                        className="bg-yellow-500 text-white rounded py-1 px-4 mr-2"
                                    >
                                        Update Quantity
                                    </button>
                                    <button
                                        onClick={() => handleDelete(book._id)}
                                        className="bg-red-500 text-white rounded py-1 px-4"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Book;