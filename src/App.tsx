import { useEffect, useState } from 'react';
import Select from '@mui/material/Select'
import './App.css';
import PhotoList from "./components/PhotoList";
import { getBreedImages, getBreedList, getSubBreedList } from "./services/breed";
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material';


function App() {
  const [breed, setBreed] = useState<string>('')
  const [subBreed, setSubBreed] = useState<string>('')
  const [number, setNumber] = useState<string>('')
  const [images, setImages] = useState<Array<string>>([])

  const [breedsOptions, setBreedsOptions] = useState<Array<string>>([])
  const [subBreedOtions, setSubBreedOptions] = useState<Array<string>>([])
  const [breedError, setBreedError] = useState<boolean>(false)
  const [numberError, setNumberError] = useState<boolean>(false)

  useEffect(() => {
    getBreedList().then(breeds => setBreedsOptions(breeds));
  }, [])

  useEffect(() => {
    breed && getSubBreedList(breed).then(subBreeds => setSubBreedOptions(subBreeds))
  }, [breed])

  const handleClick = async () => {

    if (!breed) {
      setBreedError(true)
      return
    }
    if (!number) {
      setNumberError(true)
      return
    }
    const images = await getBreedImages(breed, number, subBreed);
    setImages(images)
  }

  const handleBreedChange = (event: SelectChangeEvent) => {
    setBreed(event.target.value as string)
    setBreedError(false)
  }


  const handleSubBreedChange = (event: SelectChangeEvent) => {
    setSubBreed(event.target.value as string)
  }

  const handleImagesAmount = (event: SelectChangeEvent) => {
    setNumber(event.target.value)
    setNumberError(false)

  }


  return (
    <div className="App">
        <div className="App-search">
          <FormControl required sx={{ m: 1, minWidth: 150 }} error={breedError}>
            <InputLabel>Breed</InputLabel>
            <Select
              value={breed}
              onChange={handleBreedChange}
              required
            >
              {breedsOptions.map(breedOption => <MenuItem key={breedOption} value={breedOption}>{breedOption}</MenuItem>)}
            </Select>
            {!!breedError && <FormHelperText>Select Breed</FormHelperText>}
          </FormControl>
          {!!subBreedOtions.length && (
            <FormControl sx={{ m: 1, minWidth: 150 }} >
            <InputLabel>Subbreed</InputLabel>
              <Select
                value={subBreed}
                onChange={handleSubBreedChange}
              >
                {subBreedOtions.map(subBreedOption => <MenuItem key={subBreedOption} value={subBreedOption}>{subBreedOption}</MenuItem>)}
              </Select>
            </FormControl>
          )
          }
          <FormControl required sx={{ m: 1, minWidth: 150 }} error={numberError}>
            <InputLabel>Number of images</InputLabel>
            <Select
              value={number}
              onChange={handleImagesAmount}
            >
              {[1, 2, 3].map(number => <MenuItem key={number} value={number}>{number}</MenuItem>)}
            </Select>
            {!!numberError && <FormHelperText>Select number of images</FormHelperText>}
          </FormControl>
          <Button onClick={handleClick} variant="outlined">View images</Button>
        </div>

      <PhotoList images={images} />

    </div>
  );
}

export default App;
