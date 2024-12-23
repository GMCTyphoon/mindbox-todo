import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Todos from './Todos';

describe('Todos компонент', () => {
  test('добавление новой задачи', () => {
    render(<Todos />);
    
    // Добавляем новую задачу
    const input = screen.getByPlaceholderText('What needs to be done?');
    
    fireEvent.change(input, { target: { value: 'Новая задача' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    // Проверяем, что задача появилась в списке
    const todoItem = screen.getByText('Новая задача');
    expect(todoItem).toBeInTheDocument();
    
    // Проверяем счетчик оставшихся задач
    expect(screen.getByText('1 items left')).toBeInTheDocument();
  });

  test('отметка задачи как выполненной', () => {
    render(<Todos />);
    
    // Добавляем задачу
    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    // Находим чекбокс и отмечаем задачу как выполненную
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    // Проверяем счетчик оставшихся задач
    expect(screen.getByText('0 items left')).toBeInTheDocument();
  });

  test('не должен добавлять пустую задачу', () => {
    render(<Todos />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.keyDown(input, { key: 'Enter' });
    
    // Проверяем, что счетчик остался нулевым
    expect(screen.getByText('0 items left')).toBeInTheDocument();
  });

  test('переключение видимости списка задач', () => {
    render(<Todos />);
    
    // Добавляем задачу
    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    // Находим кнопку переключения и нажимаем на неё
    const toggleButton = screen.getByText('▼');
    fireEvent.click(toggleButton);
    
    // Проверяем, что у кнопки появился класс collapsed
    expect(toggleButton).toHaveClass('collapsed');
  });
}); 