import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import Table from './Table';

const Users = [
  {
    id: 1,
    selected: false,
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031",
    website: "hildegard.org",
  },
  {
    id: 2,
    selected: false,
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
  },
  {
    id: 3,
    selected: false,
    name: "Clementine Bauch",
    email: "Nathan@yesenia.net",
    phone: "1-463-123-4447",
    website: "ramiro.info",
  },
  {
    id: 4,
    selected: false,
    name: "Patricia Lebsack",
    email: "Julianne.OConner@kory.org",
    phone: "493-170-9623 x156",
    website: "kale.biz",
  },
  {
    id: 5,
    selected: false,
    name: "Chelsey Dietrich",
    email: "Lucio_Hettinger@annie.ca",
    phone: "(254)954-1289",
    website: "demarco.info",
  },
];

describe('React Table app',()=>{
    test('Slected items count title', () => {
        const {getByTestId} = render(<Table data={Users}/>);
        //const linkElement = screen.getByText(/Get Selected Items /i);
        expect(getByTestId('content')).toBeInTheDocument();
      });
    
    test('Slected Row items title', () => {
        const {getByTestId} = render(<Table data={Users} />);
        //const linkElement = screen.getByText(/Selected Row Item(s) /i);
        expect(getByTestId('content rows')).toBeInTheDocument();
    });

    test('Multiple select', () => {
      const {getByTestId} = render(<Table data={Users} />);
      const multiple_heckbox = getByTestId('multiple-checkbox');
      fireEvent.click(multiple_heckbox)
      //const linkElement = screen.getByText(/Selected Row Item(s) /i);
      expect(getByTestId('multiple count').textContent).toBe("5 ");
  });
  test('Multiple  checkbox selecting', () => {
    const {getByTestId} = render(<Table data={Users} />);
 
    const multiple_heckbox = getByTestId("multiple-checkbox");
 
    // Execute the click event of the checkbox
    fireEvent.click(multiple_heckbox);
    expect(multiple_heckbox).toBeChecked();
    
  });

/**/
})
