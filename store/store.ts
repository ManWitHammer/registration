import { create } from 'zustand';

interface IUser {
    email: string;
    nickname: string;
    password: string;
    confirmPassword: string;
}

interface FormStore {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  errors: {
    email?: string;
    nickname?: string;
    password?: string;
    confirmPassword?: string;
  };
  setField: (field: keyof IUser, value: string) => void;
  validate: () => boolean;
  validateField: (field: keyof FormStore, value: string) => void;
}

const useStore = create<FormStore>((set, get) => ({
  email: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  errors: {},

  setField: (field, value) => set({ [field]: value }),

  validateField: (field, value) => {
    const errors = { ...get().errors };

    switch (field) {
      case 'email':
        if (!value) {
          errors.email = 'Нужен email';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errors.email = 'Invalid email format';
        } else {
          delete errors.email;
        }
        break;

      case 'nickname':
        if (!value) {
          errors.nickname = 'Нужен Никнейм';
        } else if (value.length < 2) {
            errors.password = 'Никнейм должен состоять из минимум 2 символов';
        } else {
          delete errors.nickname;
        }
        break;

      case 'password':
        if (!value) {
          errors.password = 'Нужен пароль';
        } else if (value.length < 6) {
          errors.password = 'Пароль должен состоять из минимум 6 символов';
        } else {
          delete errors.password;
        }
        break;

      case 'confirmPassword':
        if (value !== get().password) {
          errors.confirmPassword = 'Пароль не подходит';
        } else {
          delete errors.confirmPassword;
        }
        break;

      default:
        break;
    }

    set({ errors });
  },

  validate: () => {
    const { email, nickname, password, confirmPassword, validateField } = get();

    validateField('email', email);
    validateField('nickname', nickname);
    validateField('password', password);
    validateField('confirmPassword', confirmPassword);

    return Object.keys(get().errors).length === 0;
  },
}));

export default useStore;