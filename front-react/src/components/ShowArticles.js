
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';

const ShowArticles = () => {
    const url = 'http://192.168.1.14:8000/';
    const urlAddArticle = 'http://192.168.1.14:8000/articles';
    //const urlUpdateArticle = 'http://192.168.1.14:8000/articles/';
    const [urlUpdateArticle,setUrlUpdateArticle] = useState('');
    const [articles, setArticles] = useState([]);
    const [id,setId] = useState('');
    const [title,setTitle] = useState('');
    const [pageName,setPageName] = useState('');
    const [body,setBody] = useState('');
    const [operation,setOperation] = useState('1');
    const [authenticityToken, setAuthenticityToken] = useState('');

    const openModal = (op, id, title, body) =>{
        setId('');
        setTitle('');
        setBody('');
        setOperation(op);
        if (op === 1) {
            setPageName('Registrar Articulo')
        }
        else if (op === 2 ) {
            setPageName('Editar Articulo');
            setId(id);
            setTitle(title);
            setBody(body);
        }
        window.setTimeout(function(){
            document.getElementById('title').focus();
        },500);
        
    }

    const validar = () => {
        var parametros;
        var metodo;
        


        if (title.trim() === '') {
            show_alerta('Escribe el titulo', 'warning');
        }
        else if (body.trim() === '') {
            show_alerta('Escribe el cuerpo del articulo', 'warning');            
        }
        else{
            if (operation === 1) {
                parametros = {title:title.trim(),body:body.trim()};
                metodo = 'POST';
            }
            else {
                parametros = {title:title.trim(),body:body.trim()};
                metodo = 'PUT';
            }
            enviarSolicitud(metodo, parametros);
        }
    }
    
    const enviarSolicitud = async (metodo, parametros) => {
        var urlAll ;
        if (operation === 1 ) {
            urlAll = 'http://192.168.1.14:8000/articles';
            console.log("----url " +urlUpdateArticle);
        }
        else{
            urlAll = 'http://192.168.1.14:8000/articles/'+id;
            console.log("1----url " +urlAll);
        }
            await axios({method:metodo, url:urlAll, data:parametros}).then(function(respuesta){
                var tipo = respuesta.status;
                var msj = respuesta.data[1];
                console.log("----" +tipo);
                console.log("----asd " +msj);
                console.log("2----url " +urlUpdateArticle);
                //show_alerta(msj,tipo);
               
                    if (tipo == 200) {
                        show_alerta("Operacion = "+operation+" Status = "+tipo,'success');
                        document.getElementById('btnCerrar').click();       
                        getArticles();
                    
                    } else if (tipo == 204) {
                        show_alerta("Operacion = "+operation+" Status = "+tipo,'success');
                        document.getElementById('btnCerrar').click();       
                        getArticles();
                    }
               
            })
            .catch(function(error){
                show_alerta('Error en la solicitud', 'error');
                console.log(error);
            });

    }

const deleteArticle = (id) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:'¿Seguro de eliminar el articulo id = '+ id +' ?',
        icon: 'question', text:'No se podra dar marcha a atras',
        showCancelButton:true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            setId(id);
            enviarSolicitud('DELETE',{id:id})
        }
        else{
            show_alerta('El Articulo no fue eliminado', 'info');
        }
    });
} 

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
                    <button onClick={()=>openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalArticles'>
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
                                        <button onClick={()=>openModal(2, article.id, article.attributes.title,article.attributes.body)} 
                                            className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalArticles'>
                                            <i className='fa-solid fa-edit'></i>
                                        </button>
                                        &nbsp;
                                        <button onClick={()=>deleteArticle(article.id)} className='btn btn-danger'>
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
                    <label className='h5'>{pageName}</label>
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
                        <button onClick={() => validar()} className='btn btn-success'>
                            <i className='fa-solid fa-floppy-disk'></i> Guardar
                        </button>
                    </div>
                </div>
                <div className='modal-footer'>
                    <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ShowArticles
