"use client"
import { IActions } from '@/types/context';
import { ActionMapDefaultReducer, IInitialPortofolio } from '@/types/context/portofolio';
import React, { ReactNode, Reducer, createContext, useReducer } from 'react';

// Initial position state
const initialState: IInitialPortofolio = {
	paginator : {
		limit : 12,
		page  : 1,
		q     : ''
	}

};

// Create Reducer
const mainReducer = (
	state: IInitialPortofolio,
	action: IActions<ActionMapDefaultReducer>
): IInitialPortofolio => portofoliopReducer( state, action );

// create Context provider
export const PortofolioContext = createContext<{
    state: IInitialPortofolio;
    dispatch: React.Dispatch<IActions<ActionMapDefaultReducer>>;
  }>( {
  	state    : initialState,
  	dispatch : () => null,
  } );

//   Create provider Component
interface Props{
    children: ReactNode
}
export function PortofolioProvider( { children }: Props ) {

	const [state, dispatch] = useReducer( mainReducer, initialState );

	return (
		<PortofolioContext.Provider value={{ state, dispatch }}>
			{children}
		</PortofolioContext.Provider>
	);
}

// Create Reducer function
const portofoliopReducer: Reducer<
IInitialPortofolio,
IActions<ActionMapDefaultReducer>
> = ( state, action ) => {
	switch ( action.type ) {
	case 'set_paginator':{
		return {
			...state,
			paginator : action.payload
		}
	}
	default: {
		throw Error( 'Unknown action' );
	}
	}
}
