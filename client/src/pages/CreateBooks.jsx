import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { enqueueSnackbar, useSnackbar } from 'notistack'

const CreateBooks = () => {
  const [title, setTitle] = useState(' ');
  const [author, setAuthor] = useState(' ');
  const [publishYear, setPublishYear] = useState(' ');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleBook = () => {
    const data = {
      title,
      author,
      publishYear,
    }
    setLoading(true);
    axios.post('http://localhost:5000/book/add', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book created successfully!!!", {variant:'success'})
        navigate('/');
      })
      .catch((error) => {
       setLoading(false); 
       enqueueSnackbar('error', {variant:'error'})
        console.log(error);
      })
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ?  <Spinner/> : (
        <div className='flex flex-col border-2 border-gray-800 p-4 mx-auto rounded-xl w-[600px]'>
        <div className='my-4 flex flex-col'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input 
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border-2 border-gray-500 rounded-md w-2/3 px-4 py-2 ml-16'
              ></input>
        </div>
        <div className='my-4 flex flex-col'>
        <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input 
              type='text'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='border-2 border-gray-500 rounded-md w-2/3 px-4 py-2 ml-16'
              ></input>
        </div>
        <div className='my-4 flex flex-col'>
        <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input 
              type='text'
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className='border-2 border-gray-500 rounded-md w-2/3 px-4 py-2 ml-16'
              ></input>
        </div>
        <button 
            className='border-2 border-sky-400 m-8 bg-blue-400 w-20 rounded-md'
            onClick={handleBook}>Add Book</button>
      </div>
      )}
      
    </div>
  )
}

export default CreateBooks