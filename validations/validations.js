import { body } from 'express-validator';

export const registerValidator = [
  body('fullName', 'Укажите имя').isLength({ min: 3 }),
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль минимум 5 символов').isLength({ min: 5 }),
  body('avatarURL', 'Неверная ссылка').optional().isURL(),
];

export const postCreateValidator = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
  body('tags', 'Неверный формат тэгов(укажите массив)').optional().isString(),
  body('imageURL', 'Неверная ссылка на изображение').optional().isString(),
];

export const loginValidator = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль минимум 5 символов').isLength({ min: 5 }),
];
