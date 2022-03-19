import BigNumber from 'bignumber.js'

export interface ICustomError extends Error {
  ok: boolean,
  code: number
}

export const error = (code: number, msg?: string, _err?: any): void => {
  const err: ICustomError = _err ?? new Error(msg ?? 'custom error')
  err.ok = false
  err.code = code

  throw err
}

export const shiftedBy = (value: string, decimals: string, isShiftedToLeft = true): string => {
  const decimalsInt = isShiftedToLeft ? -parseInt(decimals, 10) : parseInt(decimals, 10)
  return new BigNumber(value).shiftedBy(decimalsInt).toString()
}
