import React, {useState, useEffect} from 'react'
import axios from "axios";
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { CiEdit } from "react-icons/ci"
import { BsBook } from "react-icons/bs"


const home = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/book')
        .then((res) => {
          setBook(res.data.data);
          setLoading(false);
        }).catch((error) => {
           console.log(error);
        })
  }, [])
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Book List</h1>
        <Link to={'/books/create'}>
          <AiOutlineEdit className='text-sky-800 text-4xl'/>
        </Link>
      </div>    
      {loading ? (
        <Spinner/>
      ):(
         <table className='w-full border-separate border-spacing-2'>
            <thead>
              <tr>
                <th className='border border-black-600 rounded-md'>No</th>
                <th className='border border-black-600 rounded-md'>Title</th>
                <th className='border border-black-600 rounded-md max-md:hidden'>Author</th>
                <th className='border border-black-600 rounded-md max-md:hidden'>Publish Year</th>
                <th className='border border-black-600 rounded-md '>Operation</th>
              </tr>
            </thead>
            <tbody>
              {
                book.map((book, index) => (
                  <tr className='h-8' key={book._id}>
                    <td className='border border-black-700 rounded-md text-center'>{index+1}</td>
                    <td className='border border-black-700 rounded-md text-center'>{book.title}</td>
                    <td className='border border-black-700 rounded-md text-center max-md:hidden'>{book.author}</td>
                    <td className='border border-black-700 rounded-md text-center max-md:hidden'>{book.publishYear}</td>
                    <td className='border border-black-700 rounded-md text-center'>
                      <div className='flex justify-center gap-x-4'>
                        <Link to={`/books/details/${book._id}`}>
                            <BsBook className='text-2xl text-blue-500'/> 
                        </Link>
                        <Link to={`/books/edit/${book._id}`}>
                              <CiEdit className='text-2xl text-yellow-700' />
                        </Link>
                        <Link to={`/books/delete/${book._id}`}>
                              <MdOutlineDeleteOutline className='text-2xl text-red-700'/>    
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
         </table>
      )}
    </div>
  )
}

export default home