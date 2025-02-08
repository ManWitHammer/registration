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
          errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errors.email = 'Invalid email format';
        } else {
          delete errors.email;
        }
        break;

      case 'nickname':
        if (!value) {
          errors.nickname = 'Nickname is required';
        } else {
          delete errors.nickname;
        }
        break;

      case 'password':
        if (!value) {
          errors.password = 'Password is required';
        } else if (value.length < 6) {
          errors.password = 'Password must be at least 6 characters';
        } else {
          delete errors.password;
        }
        break;

      case 'confirmPassword':
        if (value !== get().password) {
          errors.confirmPassword = 'Passwords do not match';
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