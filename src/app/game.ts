import {IImageCard} from './imageCard';
export interface IGame{
    time:number;
    images:IImageCard[];
    user_id:string;
    currentGameDone:boolean;
}