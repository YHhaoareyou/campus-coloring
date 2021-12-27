import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

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

export const currentImgAngleState = atom({
  key: 'currentImgAngleState',
  default: 0,
});

export const currentImgSizeState = atom({
  key: 'currentImgSizeState',
  default: null,
});

export const isRemoteState = atom ({
  key: 'isRemoteState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom ({
  key: 'userState',
  default: null,
  dangerouslyAllowMutability: true,
})