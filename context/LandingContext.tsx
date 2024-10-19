"use client"
import { IActions } from '@/types/context';
import { ActionMapDefaultReducer, IInitialLanding } from '@/types/context/landing';
import React, { ReactNode, Reducer, createContext, useReducer } from 'react';

// Initial landing state
const initialState: IInitialLanding = {
	navbar : {
		activeSection : 'home'
	}

};

// Create Reducer
const mainReducer = (
	state: IInitialLanding,
	action: IActions<ActionMapDefaultReducer>
): IInitialLanding => LandingReducer( state, action );

// create Context provider
export const LandingContext = createContext<{
    state: IInitialLanding;
    dispatch: React.Dispatch<IActions<ActionMapDefaultReducer>>;
  }>( {
  	state    : initialState,
  	dispatch : () => null,
  } );

//   Create provider Component
interface Props{
    children: ReactNode
}
export function LandingProvider( { children }: Props ) {

	const [state, dispatch] = useReducer( mainReducer, initialState );

	return (
		<LandingContext.Provider value={{ state, dispatch }}>
			{children}
		</LandingContext.Provider>
	);
}

// Create Reducer function
const LandingReducer: Reducer<
IInitialLanding,
IActions<ActionMapDefaultReducer>
> = ( state, action ) => {
	switch ( action.type ) {
	case 'set_active_section':{
		return {
			...state,
			navbar : {
				activeSection : action.payload
			}
		}
	}
	default: {
		throw Error( 'Unknown action' );
	}
	}
}
