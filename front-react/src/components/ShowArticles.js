
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';

const ShowArticles = () => {
    const url = 'http://192.168.1.14:8000/';
    const [articles, setArticles] = useState([]);
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');

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
      <div id='modalArticles' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <label className='h5'>{title}</label>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div className='modal-body'>
                    <input type='hidden' id='id'></input>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                        <input type='text' id='title' className='form-control' placeholder='Titulo' value= {title}
                        onChange={(e)=> setTitle(e.target.value)}></input>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                        <input type='text' id='body' className='form-control' placeholder='Body' value= {body}
                        onChange={(e)=> setBody(e.target.value)}></input>
                    </div>
                    <div className='d-grid col-6 mx-auto'>
                        <button className='btn btn-success'>
                            <i className='fa-solid fa-floppy-disk'></i> Guardar
                        </button>
                    </div>
                </div>
                <div className='modal-footer'>
                    <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ShowArticles
