
interface INavbar{
    activeSection: string,
}
export interface IInitialLanding  {
    navbar: INavbar
}

export type ActionMapDefaultReducer = {
    set_active_section: string 
  };