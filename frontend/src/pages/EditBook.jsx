import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/books/${id}`)
        .then((response) => {
            setTitle(response.data.title);
            setAuthor(response.data.author);
            setPublishYear(response.data.publishYear);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            alert('An error occured when editing data.');
            console.log(error);
        })
    }, [])

    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear,
        };
        setLoading(true);
        axios
            .put(`http://localhost:5555/books/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occured in PUT method');
                console.log(error);
            })
    }



    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl text-custom-snow text-center my-4'>Edit Book</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-custom-snow rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-custom-orange'>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                    className='rounded-lg px-4 py-2 w-full' />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-custom-orange'>Author</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
                    className='rounded-lg px-4 py-2 w-full' />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-custom-orange'>Publish Year</label>
                    <input type="text" value={publishYear} onChange={(e) => setPublishYear(e.target.value)}
                    className='rounded-lg px-4 py-2 w-full' />
                </div>
                <button className='p-2 rounded-lg bg-custom-grey text-custom-snow uppercase' onClick={handleEditBook}>Save</button>
            </div>
        </div>
    )
}

export default EditBook;