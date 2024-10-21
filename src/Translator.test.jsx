import { render, screen, fireEvent } from '@testing-library/react';
import Translator from './Translator';
import { translateText } from '../lib/libreTranslate';

jest.mock('../lib/libreTranslate'); // Mock de la función de traducción

test('muestra los textareas y selectores', () => {
  render(<Translator />);
  expect(screen.getByPlaceholderText(/Ingresa el texto a traducir/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Texto traducido aparecerá aquí/i)).toBeInTheDocument();
});

test('traduce el texto cuando se ingresa', async () => {
  translateText.mockResolvedValue('Hello');

  render(<Translator />);
  const inputTextarea = screen.getByPlaceholderText(/Ingresa el texto a traducir/i);
  
  fireEvent.change(inputTextarea, { target: { value: 'Hola' } });
  
  const translatedTextarea = await screen.findByPlaceholderText(/Texto traducido aparecerá aquí/i);
  expect(translatedTextarea.value).toBe('Hello');
});

test('cambia los idiomas correctamente', () => {
  render(<Translator />);
  
  const swapButton = screen.getByRole('button', { name: /↔️/i });
  fireEvent.click(swapButton);

  const sourceSelect = screen.getAllByRole('combobox')[0];
  const targetSelect = screen.getAllByRole('combobox')[1];

  expect(sourceSelect.value).toBe('ES'); // Tras el cambio, source debería ser ES
  expect(targetSelect.value).toBe('EN'); // Target debería ser EN
});
