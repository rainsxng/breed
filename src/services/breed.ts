import api from "../config/api";
import {Selector} from "../types/selector";
import {processBreedResponse} from "../utils/breed";
import {BreedResponse} from "../types/breed";

const getBreedList = async (): Promise<Selector[]> => {
    try {
        const response = await api.get<BreedResponse>('');
        return processBreedResponse(response.data);
    }
    catch (e: any) {
        console.log('An error occurred', e.message);
        return [];
    }
};

export {
    getBreedList,
}
