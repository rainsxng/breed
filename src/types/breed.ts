export interface BreedResponse {
    message: {
        [breed: string]: string[]
    }
}

export interface BreedImageResponse {
    message: string[],
}

export interface SubBreedResponse {
    message: string[],
}
