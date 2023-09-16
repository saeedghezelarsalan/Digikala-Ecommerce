declare type SafeNumber = number | `${number}`;
declare const VALID_LAYOUT_VALUES: readonly ["fill", "fixed", "intrinsic", "responsive", undefined];
declare type LayoutValue = typeof VALID_LAYOUT_VALUES[number];

export interface ImageProps {
  src: string;

  alt: string;

  className?: string;

  width?: SafeNumber;

  height?: SafeNumber;

  layout?: LayoutValue;

  objectFit?: 'contain' | 'cover' | 'fill' | 'inherit' | 'unset' | 'none' | 'scale-down' | 'initial' | 'revert' | '-moz-initial';

  priority?: boolean;

  fill?: boolean;
}