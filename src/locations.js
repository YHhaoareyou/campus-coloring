const locations = {
  garden: {
    name: '中庭',
    description: 'テスト用',
    range: {
      minLat: 35.0,
      maxLat: 36.0,
      minLong: 139.0,
      maxLong: 140.0
    }
  },
  '51': {
    name: '51号館',
    description: '北門寄りの空中通路からの視点',
    range: {
      minLat: 35.7061,
      maxLat: 35.7066,
      minLong: 139.7065,
      maxLong: 139.7070
    }
  },
  '55': {
    name: '55号館外',
    description: '外の廊下から、中庭向き；雨天OK',
    range: {
      minLat: 35.7056,
      maxLat: 35.7062,
      minLong: 139.7078,
      maxLong: 139.7083
    }
  },
  '51_60_top': {
    name: '51、60号館の間',
    description: '59号館側の空中通路からの視点',
    range: {
      minLat: 35.7056,
      maxLat: 35.7060,
      minLong: 139.7061,
      maxLong: 139.7065
    }
  },
  '60_61': {
    name: '60、61号館の間',
    description: '59号館側の地面通路からの視点；雨天OK',
    range: {
      minLat: 35.7056,
      maxLat: 35.7060,
      minLong: 139.7057,
      maxLong: 139.7061
    }
  }
};

  // '52': {
  //   name: '52号館正面',
  //   range: {
  //     minLat: 35.7059,
  //     maxLat: 35.7061,
  //     minLong: 139.70695,
  //     maxLong: 139.70725
  //   }
  // },
  // '62': {
  //   name: '62号館壁',
  //   range: {
  //     minLat: 35.70625,
  //     maxLat: 35.70645,
  //     minLong: 139.7054,
  //     maxLong: 139.7057
  //   }
  // },

export default locations;