import { Transform } from 'class-transformer';

export const toUpperCase = (string: string): string => {
    return string.toUpperCase();
};

export const ToUpperCase = (): PropertyDecorator =>
    Transform(({ value }) => (typeof value === 'string' ? toUpperCase(value) : value));
