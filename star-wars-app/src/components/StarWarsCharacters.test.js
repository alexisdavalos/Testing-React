// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React, {useEffect} from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, wait } from '@testing-library/react';
import StarWarsCharacters from './StarWarsCharacters';
import { getData as mockGetData } from '../api';

jest.mock('../api');

test('renders component with no errors', async () => {       
mockGetData.mockResolvedValueOnce({
        count: 87,
        next: 'https://swapi.co/api/people/?page=2',
        previous: 'https://swapi.co/api/people/?page=1',
        results: [
        {
                name: "Luke Skywalker",
                url: "example url"
        }
]
})
// expect(mockGetData).toHaveBeenCalledTimes(1);
const {  getByText } = render(<StarWarsCharacters/>);
expect(mockGetData).toHaveBeenCalledTimes(1);
await wait(() => getByText(/luke Skywalker/i))

})