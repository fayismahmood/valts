export function min(t: number, m?: string): { min: [number, string?] } {
  return { min: [t, m] };
}

export function max(t: number, m?: string): { max: [number, string?] } {
  return { max: [t, m] };
}

export function len(t: number, m?: string): { len: [number, string?] } {
  return { len: [t, m] };
}

export function email(m?: string): { email: [boolean, string?] } {
  return { email: [true, m] };
}

export function rgexp(t: string, m?: string): { rgexp: [string, string?] } {
  return { rgexp: [t, m] };
}
