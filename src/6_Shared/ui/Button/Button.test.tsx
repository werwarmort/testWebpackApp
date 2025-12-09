import { render, screen } from '@testing-library/react';
import {Button} from "6_Shared/ui/Button/Button";

describe('classNames', () => {
  test('with only first parameter', () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  })
})
