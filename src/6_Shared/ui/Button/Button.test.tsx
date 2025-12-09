import { render, screen } from '@testing-library/react';
import {Button} from "6_Shared/ui/Button/Button";

describe('Button', () => {
  test('test render', () => {
    render(<Button>TEST</Button>);
    // @ts-ignore
    expect(screen.getByText('TEST')).toBeInTheDocument();
  })
})
