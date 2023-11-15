import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/books/${id}`)
            .then((response) => {
                setBook(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, [])


    return (
        <div className='p-4 flex flex-col'>
            <BackButton />
            <h1 className='text-3xl text-custom-snow my-4'>Show Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-custom-snow rounded-xl text-center w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-custom-orange'>Id</span>
                        <span className='text-custom-snow'>{book._id}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-custom-orange'>Title</span>
                        <span className='text-custom-snow'>{book.title}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-custom-orange'>Author</span>
                        <span className='text-custom-snow'>{book.author}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-custom-orange'>Publish Year</span>
                        <span className='text-custom-snow'>{book.publishYear}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-custom-orange'>Created At</span>
                        <span className='text-custom-snow'>{new Date(book.createdAt).toString()}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-custom-orange'>Last updated at</span>
                        <span className='text-custom-snow'>{new Date(book.updatedAt).toString()}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShowBook;