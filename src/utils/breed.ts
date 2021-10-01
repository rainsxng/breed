import {BreedResponse} from "../types/breed";

const processBreedResponse = (data: BreedResponse): string[] => {
    return Object.keys(data.message).map(dog => dog)
}

export {
    processBreedResponse
}
