"use client"
import { IActions } from '@/types/context';
import { ActionMapDefaultReducer, IInitialPosition } from '@/types/context/position';
import React, { ReactNode, Reducer, createContext, useReducer } from 'react';

// Initial position state
const initialState: IInitialPosition = {
	paginator : {
		limit : 12,
		page  : 1,
		q     : ''
	}

};

// Create Reducer
const mainReducer = (
	state: IInitialPosition,
	action: IActions<ActionMapDefaultReducer>
): IInitialPosition => positionReducer( state, action );

// create Context provider
export const PositionContext = createContext<{
    state: IInitialPosition;
    dispatch: React.Dispatch<IActions<ActionMapDefaultReducer>>;
  }>( {
  	state    : initialState,
  	dispatch : () => null,
  } );

//   Create provider Component
interface Props{
    children: ReactNode
}
export function PositionProvider( { children }: Props ) {

	const [state, dispatch] = useReducer( mainReducer, initialState );

	return (
		<PositionContext.Provider value={{ state, dispatch }}>
			{children}
		</PositionContext.Provider>
	);
}

// Create Reducer function
const positionReducer: Reducer<
IInitialPosition,
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
