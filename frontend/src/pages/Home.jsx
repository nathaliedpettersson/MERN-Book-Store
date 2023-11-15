import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { BsInfoCircleFill } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { BsFillPlusCircleFill } from 'react-icons/bs';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/books')
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-5xl uppercase my-8 text-custom-grey'>Books List</h1>
                <Link to='/books/create'>
                    <BsFillPlusCircleFill className='text-custom-orange text-4xl mr-2 hover:scale-150' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border-2 border-custom-snow text-custom-orange uppercase rounded-md'>No</th>
                            <th className='border-2 border-custom-snow text-custom-orange uppercase rounded-md'>Title</th>
                            <th className='border-2 border-custom-snow text-custom-orange uppercase rounded-md max-md:hidden'>Author</th>
                            <th className='border-2 border-custom-snow text-custom-orange uppercase rounded-md max-md:hidden'>Published year</th>
                            <th className='border-2 border-custom-snow text-custom-orange uppercase rounded-md'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book._id} className='h-8'>
                                <td className='border-2 border-custom-snow text-custom-orange font-bold rounded-md text-center'>
                                    {index + 1}
                                </td>
                                <td className='border-2 border-custom-snow text-custom-snow rounded-md text-center'>
                                    {book.title}
                                </td>
                                <td className='border-2 border-custom-snow text-custom-snow rounded-md text-center max-md:hidden'>
                                    {book.author}
                                </td>
                                <td className='border-2 border-custom-snow text-custom-snow rounded-md text-center max-md:hidden'>{book.publishYear}</td>
                                <td className='border-2 border-custom-snow text-custom-snow bg-custom-snow rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/books/details/${book._id}`}>
                                            <BsInfoCircleFill className='text-2xl text-green-800' />
                                        </Link>
                                        <Link to={`/books/edit/${book._id}`}>
                                            <BiEdit className='text-2xl text-yellow-600' />
                                        </Link>
                                        <Link to={`/books/delete/${book._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-600' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Home;