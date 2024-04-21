declare namespace Express{
    export interface Request{
        user:any
    }
    export interface Response{
        user:any
    }
}

export interface UserAuthInfoRequest extends Request {
    // Come back to this
    user?: any;
    params?:any,
    body?:any
  }

export type FoodRequest= {
    donorId: string;
    foodName: string;
    description: string;
    quantity: number;
    location: string;
    donationDate: Date;
  }