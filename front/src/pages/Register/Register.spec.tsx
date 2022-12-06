import React from 'react';
import { render, screen } from '@testing-library/react';
import { Register } from './Register';
import { describe, expect, it} from '@jest/globals';

describe('<Register />', () => {
    it('should render the component', () => {
        const { baseElement } = render(<Register />);
        expect(baseElement).toBeTruthy();
    });
})