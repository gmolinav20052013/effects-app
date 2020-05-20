import { createReducer, on } from '@ngrx/store';
import { cargarUsuario, cargarUsuarioSuccess, cargarUsuarioError } from '../actions';
import { Usuario } from '../../models/usuario.model';

export interface UsuarioState {
    id     : string,
    user   : Usuario,
    loaded : boolean,
    loading: boolean,
    error  : any
}

export const usuarioinitialState: UsuarioState = {
    id     : null,
    user   : null,
    loaded : false,
    loading: false,
    error  : null
}

const _usuarioReducer = createReducer(usuarioinitialState,

    on( cargarUsuario, ( state, { id } ) => ({
      ...state,
      loading: true ,
      id: id
    })),

    on( cargarUsuarioSuccess, (state, { usuario }) => ({
      ...state,
      loading: false,
      loaded: true,
      user: {...usuario}
    })),

    // on( cargarUsuariosError, (state, { payload }) => ({
    //   ...state,
    //   loading: false,
    //   loaded: true,
    //   error: payload
    // })),

    on( cargarUsuarioError, (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: true,
      error: {
        url: payload.url,
        name: payload.name,
        message: payload.message
      }
    })),

);

export function usuarioReducer(state, action) {
    return _usuarioReducer(state, action);
}
