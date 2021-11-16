const locations = {
  garden: {
    nameJA: '中庭',
    descriptionJA: 'テスト用',
    nameEN: 'Courtyard',
    descriptionEN: 'Test',
    range: {
      minLat: 35.0,
      maxLat: 36.0,
      minLong: 139.0,
      maxLong: 140.0
    }
  },
  '55': {
    nameJA: '55号館外',
    descriptionJA: '外の廊下から、中庭向き',
    nameEN: 'Bldg. 55',
    descriptionEN: 'From the corridor outside, facing the courtyard',
    range: {
      minLat: 35.7058,
      maxLat: 35.7061,
      minLong: 139.7078,
      maxLong: 139.7083
    }
  },
  '54_55': {
    nameJA: '54、55号館の間',
    descriptionJA: '55号館の入口前から、54-55号館連絡通路向き',
    nameEN: 'Bldg. 54-55',
    descriptionEN: "From the front of Bldg. 55's entrance, facing skywalks between Bldg. 54 & 55",
    range: {
      minLat: 35.70565,
      maxLat: 35.7059,
      minLong: 139.70775,
      maxLong: 139.7082
    }
  },
  '51': {
    nameJA: '51号館',
    descriptionJA: '一階の南側入口の前から、西側の地下に向ける',
    nameEN: 'Bldg. 51',
    descriptionEN: 'From the front of south entrance (1F), facing the basement on the West side',
    range: {
      minLat: 35.70575,
      maxLat: 35.7060,
      minLong: 139.7066,
      maxLong: 139.7069
    }
  },
  '51_60_top': {
    nameJA: '51、60号館の間',
    descriptionJA: '南側の空中通路から',
    nameEN: 'Bldg. 51-60',
    descriptionEN: 'From the south passageway (1F)',
    range: {
      minLat: 35.7056,
      maxLat: 35.7060,
      minLong: 139.7061,
      maxLong: 139.7065
    }
  },
  '60_61': {
    nameJA: '60、61号館の間',
    descriptionJA: '南側の地面通路から',
    nameEN: 'Bldg. 60-61',
    descriptionEN: 'From the south skywalk (2F)',
    range: {
      minLat: 35.7056,
      maxLat: 35.7060,
      minLong: 139.7057,
      maxLong: 139.7061
    }
  }
};

export default locations;