export const normalize = (a: number, b:number, x_min:number, x_max:number, x: number) => {
    return (b - a) * ((x - x_min) / (x_max - x_min)) + a
}