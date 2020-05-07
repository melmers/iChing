// iChing Data patterns v1.1

// this copy never gets changed and is used to initialze and quickly restore clear data
let no_divination = {question:{value:""}, coins:["","","","","",""], time:"", hexagramNow:{number:"", name:"", lines:[-1,-1,-1,-1,-1,-1], trigram1:"", trigram2:"", key:-1}, hexagramNext:{number:"", name:"", lines:[-1,-1,-1,-1,-1,-1], trigram1:"", trigram2:"", key:-1}};

// line codes:
//
//    Change bit   Line Value
//              \ /
//              00 = 0: value 0 (yin line), not changing
//              01 = 1: value 1 (yang line), not changing
//              10 = 2: value 0 (yin line), changing
//              11 = 3: value 1 (yang line), changing
//    
// Line Patterns: (in order of above line type codes)  
linePatterns = ['---- ----', '---------','--- X ---', '----0----'];
// Coin patterns and their associated line types
lineValues = [
  2,  //000 = 0 (majority of 0's with change bit (2))
  0,  //001 = 0 (majority of 0's)
  0,  //010 = 0 (majority of 0's)
  1,  //011 = 1 (majority of 1's)
  0,  //100 = 0 (majority of 0's)
  1,  //101 = 1 (majority of 1's)
  1,  //110 = 1 (majority of 1's)
  3   //111 = 1 (majority of 1's with change bit (2))
];
const trigramNames = [
  "K'un - Earth - The Receptive",  //000
  "Chen - Thunder - The Arousing", //001
  "Kan - Water - The Abysmal",  //010
  "Tui - Lake - The Joyousness",  //011
  "Ken - Mountain - The Stillness",  //100
  "Li - Fire - The Clinging Fire",   //101
  "Sun - Wind or Wood - The Gentleness",  //110
  "Ch'ien - Heaven - Dragon" //111
];

let Hexagrams = [
  {   Key: "111111",  url: "http://www.jamesdekorne.com/GBCh/hex1.htm",  Name: "1 - The Dynamic",      },  //63 111 111
  {   Key: "000000",  url: "http://www.jamesdekorne.com/GBCh/hex2.htm",  Name: "2 - The Magnetic",     },  //00 000 000
  {   Key: "010001",  url: "http://www.jamesdekorne.com/GBCh/hex3.htm",  Name: "3 - Difficulty",       },  //17 010 001
  {   Key: "100010",  url: "http://www.jamesdekorne.com/GBCh/hex4.htm",  Name: "4 - Inexperience",     },  //34 100 010
  {   Key: "010111",  url: "http://www.jamesdekorne.com/GBCh/hex5.htm",  Name: "5 - Waiting",          },  //23 010 111
  {   Key: "111010",  url: "http://www.jamesdekorne.com/GBCh/hex6.htm",  Name: "6 - Stress",           },  //58 111 010
  {   Key: "000010",  url: "http://www.jamesdekorne.com/GBCh/hex7.htm",  Name: "7 - Discipline",       },  //02 000 010
  {   Key: "010000",  url: "http://www.jamesdekorne.com/GBCh/hex8.htm",  Name: "8 - Holding Together", },  //16 010 000
  {   Key: "110111",  url: "http://www.jamesdekorne.com/GBCh/hex9.htm",  Name: "9 - Passive Restraint",  },  //55 110 111
  {   Key: "111011",  url: "http://www.jamesdekorne.com/GBCh/hex10.htm",  Name: "10 - Cautious Advance",  },  //59 111 011
  {   Key: "000111",  url: "http://www.jamesdekorne.com/GBCh/hex11.htm",  Name: "11 - Harmony",         },  //7 000 111
  {   Key: "111000",  url: "http://www.jamesdekorne.com/GBCh/hex12.htm",  Name: "12 - Divorcement",     },  //56 111 000
  {   Key: "111101",  url: "http://www.jamesdekorne.com/GBCh/hex13.htm",  Name: "13 - Union of Forces", },  //61 111 101
  {   Key: "101111",  url: "http://www.jamesdekorne.com/GBCh/hex14.htm",  Name: "14 - Wealth",          },  //47 101 111
  {   Key: "000100",  url: "http://www.jamesdekorne.com/GBCh/hex15.htm",  Name: "15 - Temperance",      },  //4 000 100
  {   Key: "001000",  url: "http://www.jamesdekorne.com/GBCh/hex16.htm",  Name: "16 -- Enthusiasm/Self-Deception/Repose",   },  //8 001 000
  {   Key: "011001",  url: "http://www.jamesdekorne.com/GBCh/hex17.htm",  Name: "17 - Following",   },  //25 011 001
  {   Key: "100110",  url: "http://www.jamesdekorne.com/GBCh/hex18.htm",  Name: "18 - Repair",    },  //38 100 110
  {   Key: "000011",  url: "http://www.jamesdekorne.com/GBCh/hex19.htm",  Name: "19 - Approach",  },  //3 000 011
  {   Key: "110000",  url: "http://www.jamesdekorne.com/GBCh/hex20.htm",  Name: "20 - Comtemplation",   },  //48 110 000
  {   Key: "101001",  url: "http://www.jamesdekorne.com/GBCh/hex21.htm",  Name: "21 - Discernment",   },  //41 101 001
  {   Key: "100101",  url: "http://www.jamesdekorne.com/GBCh/hex22.htm",  Name: "22 - Persona",   },  //37 100 101
  {   Key: "100000",  url: "http://www.jamesdekorne.com/GBCh/hex23.htm",  Name: "23 - Disintegration",    },  //32 100 000
  {   Key: "000001",  url: "http://www.jamesdekorne.com/GBCh/hex24.htm",  Name: "24 - Return",    },  //1 000 001
  {   Key: "111001",  url: "http://www.jamesdekorne.com/GBCh/hex25.htm",  Name: "25 - Innocence",   },  //57 111 001
  {   Key: "100111",  url: "http://www.jamesdekorne.com/GBCh/hex26.htm",  Name: "26 - Controlled Power",    },  //39 100 111
  {   Key: "100001",  url: "http://www.jamesdekorne.com/GBCh/hex27.htm",  Name: "27 - Nourishment",   },  //33 100 001
  {   Key: "011110",  url: "http://www.jamesdekorne.com/GBCh/hex28.htm",  Name: "28 - Critical Mass",   },  //30 011 110
  {   Key: "010010",  url: "http://www.jamesdekorne.com/GBCh/hex29.htm",  Name: "29 - Danger",    },  //18 010 010
  {   Key: "101101",  url: "http://www.jamesdekorne.com/GBCh/hex30.htm",  Name: "30 - Clarity",   },  //45 101 101
  {   Key: "011100",  url: "http://www.jamesdekorne.com/GBCh/hex31.htm",  Name: "31 - Initiative (Influence)",  },  //28 011 100
  {   Key: "001110",  url: "http://www.jamesdekorne.com/GBCh/hex32.htm",  Name: "32 - Consistency",   },  //14 001 110
  {   Key: "111100",  url: "http://www.jamesdekorne.com/GBCh/hex33.htm",  Name: "33 - Retreat",     },  //60 111 100
  {   Key: "001111",  url: "http://www.jamesdekorne.com/GBCh/hex34.htm",  Name: "34 - Great Power", },  //15 001 111
  {   Key: "101000",  url: "http://www.jamesdekorne.com/GBCh/hex35.htm",  Name: "35 - Advance of Consciousness",  },  //40 101 000
  {   Key: "000101",  url: "http://www.jamesdekorne.com/GBCh/hex36.htm",  Name: "36 - Clouded Perception",    },  //5 000 101
  {   Key: "110101",  url: "http://www.jamesdekorne.com/GBCh/hex37.htm",  Name: "37 - The Family",    },  //53 110 101
  {   Key: "101011",  url: "http://www.jamesdekorne.com/GBCh/hex38.htm",  Name: "38 - Mutual Alienation",   },  //43 101 011
  {   Key: "010100",  url: "http://www.jamesdekorne.com/GBCh/hex39.htm",  Name: "39 - Impasse",   },  //20 010 100
  {   Key: "001010",  url: "http://www.jamesdekorne.com/GBCh/hex40.htm",  Name: "40 - Liberation",  },  //10 001 010
  {   Key: "100011",  url: "http://www.jamesdekorne.com/GBCh/hex41.htm",  Name: "41 - Compensating Sacrifice",  },  //35 100 011
  {   Key: "110001",  url: "http://www.jamesdekorne.com/GBCh/hex42.htm",  Name: "42 - Increase",  },  //49 110 001
  {   Key: "011111",  url: "http://www.jamesdekorne.com/GBCh/hex43.htm",  Name: "43 - Resoluteness",  },  //31 011 111
  {   Key: "111110",  url: "http://www.jamesdekorne.com/GBCh/hex44.htm",  Name: "44 - Temptation",  },  //62 111 110
  {   Key: "011000",  url: "http://www.jamesdekorne.com/GBCh/hex45.htm",  Name: "45 - Gathering Together (Contraction)",  },  //24 011 000
  {   Key: "000110",  url: "http://www.jamesdekorne.com/GBCh/hex46.htm",  Name: "46 - Pushing Upward",    },  //6 000 110
  {   Key: "011010",  url: "http://www.jamesdekorne.com/GBCh/hex47.htm",  Name: "47 - Oppression",    },  //26 011 010
  {   Key: "010110",  url: "http://www.jamesdekorne.com/GBCh/hex48.htm",  Name: "48 - The Well",    },  //22 010 110
  {   Key: "011101",  url: "http://www.jamesdekorne.com/GBCh/hex49.htm",  Name: "49 - Metamorphosis",   },  //29 011 101
  {   Key: "101110",  url: "http://www.jamesdekorne.com/GBCh/hex50.htm",  Name: "50 - The Sacrificial Vessel",  },  //46 101 110
  {   Key: "001001",  url: "http://www.jamesdekorne.com/GBCh/hex51.htm",  Name: "51 - Shock/Thunder",   },  //9 001 001
  {   Key: "100100",  url: "http://www.jamesdekorne.com/GBCh/hex52.htm",  Name: "52 - Keeping Still",   },  //36 100 100
  {   Key: "110100",  url: "http://www.jamesdekorne.com/GBCh/hex53.htm",  Name: "53 - Gradual Progress",    },  //52 110 100
  {   Key: "001011",  url: "http://www.jamesdekorne.com/GBCh/hex54.htm",  Name: "54 - Propriety/Making-Do",   },  //11 001 011
  {   Key: "001101",  url: "http://www.jamesdekorne.com/GBCh/hex55.htm",  Name: "55 - Abundance (Expansion of Awareness)",  },  //13 001 101
  {   Key: "101100",  url: "http://www.jamesdekorne.com/GBCh/hex56.htm",  Name: "56 - Transition",  },  //44 101 100
  {   Key: "110110",  url: "http://www.jamesdekorne.com/GBCh/hex57.htm",  Name: "57 - Penetration",   },  //54 110 110
  {   Key: "011011",  url: "http://www.jamesdekorne.com/GBCh/hex58.htm",  Name: "58 - Joy (Self-indulgence)",   },  //27 011 011
  {   Key: "110010",  url: "http://www.jamesdekorne.com/GBCh/hex59.htm",  Name: "59 - Expansion (Dispersion)",  },  //50 110 010
  {   Key: "010011",  url: "http://www.jamesdekorne.com/GBCh/hex60.htm",  Name: "60 - Restrictive Regulations", },  //19 010 011
  {   Key: "110011",  url: "http://www.jamesdekorne.com/GBCh/hex61.htm",  Name: "61 - Inner Truth",   },  //51 110 011
  {   Key: "001100",  url: "http://www.jamesdekorne.com/GBCh/hex62.htm",  Name: "62 - Small Powers",  },  //12 001 100
  {   Key: "010101",  url: "http://www.jamesdekorne.com/GBCh/hex63.htm",  Name: "63 - Completion",    },  //21 010 101
  {   Key: "101010",  url: "http://www.jamesdekorne.com/GBCh/hex64.htm",  Name: "64 - Unfinished Business",   }  //42 101 010
];

let xHexagramKeys = [
  {   Key: "111111" },  //1 - this is hexagram #1
  {   Key: "000000" },  //2
  {   Key: "010001" },  //3
  {   Key: "100010" },  //4
  {   Key: "010111" },  //5
  {   Key: "111010" },
  {   Key: "000010" },
  {   Key: "010000" },
  {   Key: "110111" },
  {   Key: "111011" },  //10
  {   Key: "000111" },
  {   Key: "111000" },
  {   Key: "111101" },
  {   Key: "101111" },
  {   Key: "000100" },  //15
  {   Key: "001000" },
  {   Key: "011001" },
  {   Key: "100110" },
  {   Key: "000011" },
  {   Key: "110000" },  //20
  {   Key: "101001" },
  {   Key: "100101" },
  {   Key: "100000" },
  {   Key: "000001" },
  {   Key: "111001" },  //25
  {   Key: "100111" },
  {   Key: "100001" },
  {   Key: "011110" },
  {   Key: "010010" },
  {   Key: "101101" },  //30
  {   Key: "011100" },
  {   Key: "001110" },
  {   Key: "111100" },
  {   Key: "001111" },
  {   Key: "101000" },  //35
  {   Key: "000101" },
  {   Key: "110101" },
  {   Key: "101011" },
  {   Key: "010100" },
  {   Key: "001010" },  //40
  {   Key: "100011" },
  {   Key: "110001" },
  {   Key: "011111" },
  {   Key: "111110" },
  {   Key: "011000" },  //45
  {   Key: "000110" },
  {   Key: "011010" },
  {   Key: "010110" },
  {   Key: "011101" },
  {   Key: "101110" },  //50
  {   Key: "001001" },
  {   Key: "100100" },
  {   Key: "110100" },
  {   Key: "001011" },
  {   Key: "001101" },  //55
  {   Key: "101100" },
  {   Key: "110110" },
  {   Key: "011011" },
  {   Key: "110010" },
  {   Key: "010011" },  //60
  {   Key: "110011" },
  {   Key: "001100" },
  {   Key: "010101" },
  {   Key: "101010" }   //64
];

const xHexagramNames = [
  "1 - The Dynamic",  //63 111 111
  "2 - The Magnetic",  //0 000 000
  "24 - Return",  //1 000 001
  "7 - Discipline",  //2 000 010
  "19 - Approach",  //3 000 011
  "15 - Temperance",  //4 000 100
  "36 - Clouded Perception",  //5 000 101
  "46 - Pushing Upward",  //6 000 110
  "11 - Harmony",  //7 000 111
  "16 -- Enthusiasm/Self-Deception/Repose",  //8 001 000
  "51 - Shock/Thunder",  //9 001 001
  "40 - Liberation",  //10 001 010
  "54 - Propriety/Making-Do",  //11 001 011
  "62 - Small Powers",  //12 001 100
  "55 - Abundance (Expansion of Awareness)",  //13 001 101
  "32 - Consistency",  //14 001 110
  "34 - Great Power",  //15 001 111
  "8 - Holding Together",  //16 010 000
  "3 - Difficulty",  //17 010 001
  "29 - Danger",  //18 010 010
  "60 - Restrictive Regulations",  //19 010 011
  "39 - Impasse",  //20 010 100
  "63 - Completion",  //21 010 101
  "48 - The Well",  //22 010 110
  "5 - Waiting",  //23 010 111
  "45 - Gathering Together (Contraction)",  //24 011 000
  "17 - Following",  //25 011 001
  "47 - Oppression",  //26 011 010
  "58 - Joy (Self-indulgence)",  //27 011 011
  "31 - Initiative (Influence)",  //28 011 100
  "49 - Metamorphosis",  //29 011 101
  "28 - Critical Mass",  //30 011 110
  "43 - Resoluteness",  //31 011 111
  "23 - Disintegration",  //32 100 000
  "27 - Nourishment",  //33 100 001
  "4 - Inexperience",  //34 100 010
  "41 - Compensating Sacrifice",  //35 100 011
  "52 - Keeping Still",  //36 100 100
  "22 - Persona",  //37 100 101
  "18 - Repair",  //38 100 110
  "26 - Controlled Power",  //39 100 111
  "35 - Advance of Consciousness",  //40 101 000
  "21 - Discernment",  //41 101 001
  "64 - Unfinished Business",  //42 101 010
  "38 - Mutual Alienation",  //43 101 011
  "56 - Transition",  //44 101 100
  "30 - Clarity",  //45 101 101
  "50 - The Sacrificial Vessel",  //46 101 110
  "14 - Wealth",  //47 101 111
  "20 - Comtemplation",  //48 110 000
  "42 - Increase",  //49 110 001
  "59 - Expansion (Dispersion)",  //50 110 010
  "61 - Inner Truth",  //51 110 011
  "53 - Gradual Progress",  //52 110 100
  "37 - The Family",  //53 110 101
  "57 - Penetration",  //54 110 110
  "9 - Passive Restraint",  //55 110 111
  "12 - Divorcement",  //56 111 000
  "25 - Innocence",  //57 111 001
  "6 - Stress",  //58 111 010
  "10 - Cautious Advance",  //59 111 011
  "33 - Retreat",  //60 111 100
  "13 - Union of Forces",  //61 111 101
  "44 - Temptation",  //62 111 110
  "1 - The Dynamic"  //63 111 111
];
