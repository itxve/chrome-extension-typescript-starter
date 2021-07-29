/**
 * 合并类型
 * https://github.com/Microsoft/TypeScript/issues/26728#issuecomment-733765326
 */

interface Clipboard {
  read(): Promise<Array<ClipboardItem>>;

  write(items: Array<ClipboardItem>): Promise<void>;
}
declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.jpeg" {
  const src: string;
  export default src;
}
declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.gif" {
  const src: string;
  export default src;
}
declare module "*.svg" {
  const src: string;
  export default src;
}
declare module "*.ico" {
  const src: string;
  export default src;
}
declare module "*.webp" {
  const src: string;
  export default src;
}

type BedConfigProps = {
  repo: string;
  branch: string;
  token: string;
  path: string;
  customUrls?: string;
};

declare type GitFormProps = Readonly<BedConfigProps>;
