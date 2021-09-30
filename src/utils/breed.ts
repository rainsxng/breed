import {BreedResponse} from "../types/breed";
import {Selector} from "../types/selector";

const processBreedResponse = (data: BreedResponse): Selector[] => {
    return Object.keys(data.message).map(dog => ({ value: dog, label: dog }))
}

export {
    processBreedResponse
}
