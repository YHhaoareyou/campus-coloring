import { atom } from "recoil";

export const currentLocState = atom({
  key: 'currentLocState',
  default: '',
});

export const currentImgIdState = atom({
  key: 'currentImgIdState',
  default: '',
});

export const currentImgSrcState = atom({
  key: 'currentImgSrcState',
  default: '',
});

export const userState = atom ({
  key: 'userState',
  default: null,
  dangerouslyAllowMutability: true,
})