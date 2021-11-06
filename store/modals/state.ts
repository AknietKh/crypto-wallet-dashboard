export interface IModalOptions {
  key: string; // название компонента модалки, берется из modals.ts
  title?: string; // если название у модалки предпологается менять
  text?: string, // если текст у модалки предпологается менять
  isUnclosable?: boolean, // если true то модалка не будет закрываться при клике на бэкграунд
  status?: string, // для модалки статуса (success, error и тд)
}

export interface IModalsState {
  isShow: boolean,
  currentModalKey: string,
  options: IModalOptions,
}

export const initState = (): IModalsState => ({
  isShow: false,
  currentModalKey: '',
  options: {
    key: ''
  }
})

export default initState
