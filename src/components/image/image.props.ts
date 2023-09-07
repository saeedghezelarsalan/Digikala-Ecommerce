declare type SafeNumber = number | `${number}`;
declare const VALID_LAYOUT_VALUES: readonly ["fill", "fixed", "intrinsic", "responsive", undefined];
declare type LayoutValue = typeof VALID_LAYOUT_VALUES[number];

export interface ImageProps {
  alt: string;

  src: string;

  className?: string;

  width?: SafeNumber;

  height?: SafeNumber;

  layout?: LayoutValue;

  objectFit?: 'contain' | 'cover' | 'fill' | 'inherit' | 'unset' | 'none' | 'scale-down' | 'initial' | 'revert' | '-moz-initial';

  title?: string;

  priority?: boolean;

  itemProp?: string;

  legacy?: boolean;

  sizes?: string;

  fill?: boolean;

  loader?: undefined;

  placeholder?: 'empty' | 'blur';

  blurDataURL?: { r: number, g: number, b: number };

  id?: string;

  referrerPolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';
}