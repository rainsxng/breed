import api from "../config/api";
import { processBreedResponse } from "../utils/breed";
import { BreedResponse, BreedImageResponse, SubBreedResponse } from "../types/breed";

const getBreedList = async (): Promise<string[]> => {
    try {
        const response = await api.get<BreedResponse>('breeds/list/all');
        return processBreedResponse(response.data);
    }
    catch (e: any) {
        console.log('An error occurred', e.message);
        return [];
    }
};

const getBreedImages = async (breed: string, imagesAmount: string, subBread?: string) => {
    try {
        const url = `breed/${breed}${subBread ? '/' + subBread : ''}/images/random/${imagesAmount}`
        const response = await api.get<BreedImageResponse>(url)
        return response.data.message;
    }
    catch (e) {
        return [];
    }
}

const getSubBreedList = async (subBread: string): Promise<string[]> => {
    try {
        const response = await api.get<SubBreedResponse>(`breed/${subBread}/list`);
        return response.data.message;
    }
    catch (e: any) {
        console.log('An error occurred', e.message);
        return [];
    }
}

export {
    getBreedList,
    getBreedImages,
    getSubBreedList,
}
