import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { enqueueSnackbar, useSnackbar } from 'notistack'

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const deleteBook = () => {
      setLoading(true);
      axios.delete(`http://localhost:5000/book/${id}`)
      .then(() => {
          setLoading(false);
          enqueueSnackbar("Book delete successfullt!!", {variant:'success'})
          navigate('/');
      }).catch((err) => {
        setLoading(false);
        enqueueSnackbar('err', {variant:'error'})
        console.log(err);
      })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'> Delete Book </h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col items-center border-2 border-sky-500 rounded-xl mx-auto p-8 w-[600px]'>
        <h3 className='text-xl'>Are you sure, you want to delete item permanently?</h3>
        <button className='border-2 border-red-400 bg-red-500 m-8 bg-blue-400 w-20 rounded-md' onClick={deleteBook}> Delete</button>
      </div>
    </div>
  )
}

export default DeleteBook