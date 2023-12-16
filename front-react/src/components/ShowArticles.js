
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';

const ShowArticles = () => {
    const url = 'http://192.168.1.14:8000/';
    const [articles, setArticles] = useState([]);

    useEffect(()=>{
        getArticles();
    },[]);

    const getArticles = async() => {
        const respuesta = await axios.get(url);
        setArticles(respuesta.data.data);
    }

  return (
    <div className='App'>
      <div className='container-fluid'>
        <div className='row mt-3'>
            <div className='col-md-4 offset-4'>
                <div className='d-grid mx-auto'>
                    <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalArticles'>
                        <i className='fa-solid fa-circle-plus'></i> Añadir
                    </button>
                </div>
            </div>
        </div>
        <div className='row mt-3'>
            <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                <div className='table-responsive'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr><th>#</th><th>TITLE</th><th>BODY</th></tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {articles.map((article, i)=>(
                                <tr key={article.id}>
                                    <td>{(i+1)}</td>
                                    <td>{article.attributes.title}</td>
                                    <td>{article.attributes.body}</td>
                                    <td>
                                        <button className='btn btn-warning'>
                                            <i className='fa-solid fa-edit'></i>
                                        </button>
                                        &nbsp;
                                        <button className='btn btn-danger'>
                                            <i className='fa-solid fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
      <div className='modal fade'>

      </div>
    </div>
  )
}

export default ShowArticles
