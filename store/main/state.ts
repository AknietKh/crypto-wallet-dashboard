export interface IMainState {
  isLoading: boolean,
}

export const initState = (): IMainState => ({
  isLoading: true
})

export default initState
