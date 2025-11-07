import { ref } from 'vue';

export function useFormValidation<T extends Record<string, any>>(form: T) {
  // реактивный объект, где для каждого поля формы храним флаг ошибки (true/false)
  type Errors<T> = Record<keyof T, boolean>;
  const errors = ref<Errors<T>>({} as Errors<T>);

  const validateRequired = () => {
    let isValid = true;

    // Проходимся по всем ключам объекта формы (email, password, name и т.д.)
    for (const key in form) {
      if (form[key] === '' || form[key] === null || form[key] === undefined) {
        errors.value[key] = true;
        isValid = false;
      } else {
        errors.value[key] = false;
      }
    }

    return isValid;
  };

  return {
    errors,
    validateRequired,
  };
}
