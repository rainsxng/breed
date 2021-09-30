import React, {useEffect, useMemo, useRef, useState} from 'react';
import { Button, PageHeader } from 'antd';
import Select, { OnChangeValue } from 'react-select';

import './App.css';
import {Selector} from "./types/selector";
import PhotoList from "./containers/PhotoList/PhotoList";
import {getBreedImages, getBreedList} from "./services/breed";


function App() {
  const numbers = useMemo(() => {
    return [1, 2, 3].map(number => ({
      value: number.toString(),
      label: number.toString(),
    }))
  }, [])
  const breedRef = useRef<HTMLInputElement | null | any>(null)
  const numberRef = useRef<HTMLInputElement | null | any>(null)

  const [breed, setBreed] = useState<Selector | null>(null)
  const [subBreed, setSubBreed] = useState<Selector | null>(null)
  const [number, setNumber] = useState<Selector | null>()
  const [images, setImages] = useState<Array<string>>([])

  const [breedsOptions, setBreedsOptions] = useState<Array<Selector>>([])
  const [subBreedOtions, setSubBreedOptions] = useState<Array<Selector>>([])

  const [message, setMessage] = useState('')

   useEffect(() => {
     getBreedList().then(breeds => setBreedsOptions(breeds));
   }, [])
    // TODO rewrite impl into a component
    const handleClick = async () => {
        if (!breed && breedRef.current) {
            breedRef.current.controlRef.style.border = '1px solid red'
            numberRef.current.controlRef.style.border = '1px solid black'
            setMessage('select breed')
        } else if (!number && numberRef.current) {
            numberRef.current.controlRef.style.border = '1px solid red'
            breedRef.current.controlRef.style.border = '1px solid black'
            setMessage('select number')
        } else {
            setMessage('')
            const breedInfo = breed?.value
            const subBreadInfo = subBreed?.value
            const numberInfo = number?.value
            breedRef.current.controlRef.style.border = '1px solid black'
            numberRef.current.controlRef.style.border = '1px solid black'

            if (breedInfo && numberInfo) {
                const images = await getBreedImages(breedInfo, numberInfo, subBreadInfo);
                setImages(images)
            }
        }
    }

  // @ts-ignore
    return (
      <div className="App">
        <PageHeader
            title="Title"
            className='site-page-header'
        />
        <form onSubmit={e => e.preventDefault()}>
          <div className="search">
            <Select
                value={breed}
                onChange={() => {}}
                options={breedsOptions}
                ref={breedRef}
            />

            {subBreedOtions.length ? <Select
                value={subBreed}
                onChange={() => {}}
                options={subBreedOtions}
            /> : null}

            <Select
                value={number}
                onChange={() => {}}
                options={numbers}
                ref={numberRef}
            />

            <Button onClick={handleClick} type="primary" shape="circle" size="large">view</Button>
          </div>
        </form>

        <p style={{ textAlign: 'center' }}>{message}</p>

        <PhotoList images={images} />

      </div>
  );
}

export default App;
