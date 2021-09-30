import api from "../config/api";
import {Selector} from "../types/selector";
import {processBreedResponse} from "../utils/breed";
import {BreedResponse, BreedImageResponse} from "../types/breed";

const getBreedList = async (): Promise<Selector[]> => {
    try {
        const response = await api.get<BreedResponse>('list/all');
        return processBreedResponse(response.data);
    }
    catch (e: any) {
        console.log('An error occurred', e.message);
        return [];
    }
};

const getBreedImages = async (breed: string, breedNumber: string, subBread?: string) => {
   try {
       const url = `breed/${breed}${subBread ? '/' + subBread : ''}/images/random/${breedNumber}`
       const response = await api.get<BreedImageResponse>(url)
       return response.data.message;
   }
   catch (e) {
       return [];
   }
}

export {
    getBreedList,
    getBreedImages,
}
