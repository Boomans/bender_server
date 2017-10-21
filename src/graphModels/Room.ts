export interface IWay {
    roomId: number,
    method: 'cr' | 'st' | 'el'
}
export interface IRoom {
    roomId: number,
    floor: 1 | 2 | 3,
    ways: IWay,
    load: number,
    building: 'WinterPlace' | 'SmallHermitage' | 'NewHermitage' | 'BigHermitage' | 'Theatre'
}