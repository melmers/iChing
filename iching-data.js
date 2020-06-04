// iChing Data patterns v1.1

// this copy never gets changed and is used to initialze and quickly restore clear data
let no_divination = {question:{value:""}, coins:["","","","","",""], time:"", hexagramNow:{number:"", name:"", lines:[-1,-1,-1,-1,-1,-1], trigram1:"", trigram2:"", key:-1}, hexagramNext:{number:"", name:"", lines:[-1,-1,-1,-1,-1,-1], trigram1:"", trigram2:"", key:-1}};

// line codes:
//
//    Change bit   Line Value
//              \ /
//               00 = 0: value 0 (yin line), not changing
//               01 = 1: value 1 (yang line), not changing
//               10 = 2: value 0 (yin line), changing to yang
//               11 = 3: value 1 (yang line), changing to yin
//    
// Line Patterns: (in order of above line type codes)  
linePatterns = ['---- ----', '---------','--- X ---', '----0----'];
// Coin patterns and their associated line types
lineValues = [
  2,  //000 = broken changing (all 0's = change bit)
  0,  //001 = broken line (majority of 0's)
  0,  //010 = broken line (majority of 0's)
  1,  //011 = solid line (majority of 1's)
  0,  //100 = broken line (majority of 0's)
  1,  //101 = solid line (majority of 1's)
  1,  //110 = solid line (majority of 1's)
  3   //111 = solid changing (all 1's = change bit)
];
const trigramNames = [
  "K'un, Kun - Earth - The Receptive",  //000
  "Chen, Zhen - Thunder - The Arousing", //001
  "Kan - Water - The Abysmal",  //010
  "Tui, Dui - Lake - The Joyousness",  //011
  "Ken, Gen - Mountain - The Stillness",  //100
  "Li - Fire - The Clinging Fire",   //101
  "Sun, Xun - Wind or Wood - The Gentleness",  //110
  "Ch'ien, Quian - Heaven - Dragon" //111
];

// Info from the www.jamesdekorne.com website
let HexagramsJamesDekorne = [
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
  {   Key: "001000",  url: "http://www.jamesdekorne.com/GBCh/hex16.htm",  Name: "16 - Enthusiasm/Self-Deception/Repose",   },  //8 001 000
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

// Info from the divination.com website
let HexagramsDivination = [
  {   Key: "111111",  url: "https://divination.com/iching/lookup/1",  Name: "1 - Creative Power",      },  //63 111 111
  {   Key: "000000",  url: "https://divination.com/iching/lookup/2",  Name: "2 - Receptive Power",     },  //00 000 000
  {   Key: "010001",  url: "https://divination.com/iching/lookup/3",  Name: "3 - Difficulty at the Beginning",       },  //17 010 001
  {   Key: "100010",  url: "https://divination.com/iching/lookup/4",  Name: "4 - Youthful Folly",     },  //34 100 010
  {   Key: "010111",  url: "https://divination.com/iching/lookup/5",  Name: "5 - Patience",          },  //23 010 111
  {   Key: "111010",  url: "https://divination.com/iching/lookup/6",  Name: "6 - Conflict",           },  //58 111 010
  {   Key: "000010",  url: "https://divination.com/iching/lookup/7",  Name: "7 - Organized Discipline",       },  //02 000 010
  {   Key: "010000",  url: "https://divination.com/iching/lookup/8",  Name: "8 - Holding Together", },  //16 010 000
  {   Key: "110111",  url: "https://divination.com/iching/lookup/9",  Name: "9 - Small Influences",  },  //55 110 111
  {   Key: "111011",  url: "https://divination.com/iching/lookup/10",  Name: "10 - Treading Carefully",  },  //59 111 011
  {   Key: "000111",  url: "https://divination.com/iching/lookup/11",  Name: "11 - Harmony",         },  //7 000 111
  {   Key: "111000",  url: "https://divination.com/iching/lookup/12",  Name: "12 - Standstill",     },  //56 111 000
  {   Key: "111101",  url: "https://divination.com/iching/lookup/13",  Name: "13 - Fellowship", },  //61 111 101
  {   Key: "101111",  url: "https://divination.com/iching/lookup/14",  Name: "14 - Affluence",          },  //47 101 111
  {   Key: "000100",  url: "https://divination.com/iching/lookup/15",  Name: "15 - Humility",      },  //4 000 100
  {   Key: "001000",  url: "https://divination.com/iching/lookup/16",  Name: "16 - Enthusiasm",   },  //8 001 000
  {   Key: "011001",  url: "https://divination.com/iching/lookup/17",  Name: "17 - Following",   },  //25 011 001
  {   Key: "100110",  url: "https://divination.com/iching/lookup/18",  Name: "18 - Repairing the Damage",    },  //38 100 110
  {   Key: "000011",  url: "https://divination.com/iching/lookup/19",  Name: "19 - Approach of Spring",  },  //3 000 011
  {   Key: "110000",  url: "https://divination.com/iching/lookup/20",  Name: "20 - Overview",   },  //48 110 000
  {   Key: "101001",  url: "https://divination.com/iching/lookup/21",  Name: "21 - Cutting Through",   },  //41 101 001
  {   Key: "100101",  url: "https://divination.com/iching/lookup/22",  Name: "22 - Grace and Beauty",   },  //37 100 101
  {   Key: "100000",  url: "https://divination.com/iching/lookup/23",  Name: "23 - Splitting Apart",    },  //32 100 000
  {   Key: "000001",  url: "https://divination.com/iching/lookup/24",  Name: "24 - Returning",    },  //1 000 001
  {   Key: "111001",  url: "https://divination.com/iching/lookup/25",  Name: "25 - Innocence",   },  //57 111 001
  {   Key: "100111",  url: "https://divination.com/iching/lookup/26",  Name: "26 - Containment of Potential",    },  //39 100 111
  {   Key: "100001",  url: "https://divination.com/iching/lookup/27",  Name: "27 - Nourishment",   },  //33 100 001
  {   Key: "011110",  url: "https://divination.com/iching/lookup/28",  Name: "28 - Excessive Pressure",   },  //30 011 110
  {   Key: "010010",  url: "https://divination.com/iching/lookup/29",  Name: "29 - Dangerous Depths",    },  //18 010 010
  {   Key: "101101",  url: "https://divination.com/iching/lookup/30",  Name: "30 - Clinging Like Fire",   },  //45 101 101
  {   Key: "011100",  url: "https://divination.com/iching/lookup/31",  Name: "31 - Mutual Attraction",  },  //28 011 100
  {   Key: "001110",  url: "https://divination.com/iching/lookup/32",  Name: "32 - Endurance",   },  //14 001 110
  {   Key: "111100",  url: "https://divination.com/iching/lookup/33",  Name: "33 - Retreat",     },  //60 111 100
  {   Key: "001111",  url: "https://divination.com/iching/lookup/34",  Name: "34 - Great Vigor", },  //15 001 111
  {   Key: "101000",  url: "https://divination.com/iching/lookup/35",  Name: "35 - Easy Progress",  },  //40 101 000
  {   Key: "000101",  url: "https://divination.com/iching/lookup/36",  Name: "36 - Darkening of the Light",    },  //5 000 101
  {   Key: "110101",  url: "https://divination.com/iching/lookup/37",  Name: "37 - Extended Family",    },  //53 110 101
  {   Key: "101011",  url: "https://divination.com/iching/lookup/38",  Name: "38 - Diverging Interests",   },  //43 101 011
  {   Key: "010100",  url: "https://divination.com/iching/lookup/39",  Name: "39 - Temporary Obstacles",   },  //20 010 100
  {   Key: "001010",  url: "https://divination.com/iching/lookup/40",  Name: "40 - Deliverance",  },  //10 001 010
  {   Key: "100011",  url: "https://divination.com/iching/lookup/41",  Name: "41 - Decrease",  },  //35 100 011
  {   Key: "110001",  url: "https://divination.com/iching/lookup/42",  Name: "42 - Increase",  },  //49 110 001
  {   Key: "011111",  url: "https://divination.com/iching/lookup/43",  Name: "43 - Determination",  },  //31 011 111
  {   Key: "111110",  url: "https://divination.com/iching/lookup/44",  Name: "44 - Liaison",  },  //62 111 110
  {   Key: "011000",  url: "https://divination.com/iching/lookup/45",  Name: "45 - Gathering Together",  },  //24 011 000
  {   Key: "000110",  url: "https://divination.com/iching/lookup/46",  Name: "46 - Pushing Upward",    },  //6 000 110
  {   Key: "011010",  url: "https://divination.com/iching/lookup/47",  Name: "47 - Oppression",    },  //26 011 010
  {   Key: "010110",  url: "https://divination.com/iching/lookup/48",  Name: "48 - The Well",    },  //22 010 110
  {   Key: "011101",  url: "https://divination.com/iching/lookup/49",  Name: "49 - Revolution",   },  //29 011 101
  {   Key: "101110",  url: "https://divination.com/iching/lookup/50",  Name: "50 - The Cauldron",  },  //46 101 110
  {   Key: "001001",  url: "https://divination.com/iching/lookup/51",  Name: "51 - Shock",   },  //9 001 001
  {   Key: "100100",  url: "https://divination.com/iching/lookup/52",  Name: "52 - Keeping Still",   },  //36 100 100
  {   Key: "110100",  url: "https://divination.com/iching/lookup/53",  Name: "53 - A Steady Pace",    },  //52 110 100
  {   Key: "001011",  url: "https://divination.com/iching/lookup/54",  Name: "54 - Careful Affection",   },  //11 001 011
  {   Key: "001101",  url: "https://divination.com/iching/lookup/55",  Name: "55 - Great Abundance",  },  //13 001 101
  {   Key: "101100",  url: "https://divination.com/iching/lookup/56",  Name: "56 - The Wanderer",  },  //44 101 100
  {   Key: "110110",  url: "https://divination.com/iching/lookup/57",  Name: "57 - Gentle Penetration",   },  //54 110 110
  {   Key: "011011",  url: "https://divination.com/iching/lookup/58",  Name: "58 - Joy",   },  //27 011 011
  {   Key: "110010",  url: "https://divination.com/iching/lookup/59",  Name: "59 - Dispersing",  },  //50 110 010
  {   Key: "010011",  url: "https://divination.com/iching/lookup/60",  Name: "60 - Limits and Connections", },  //19 010 011
  {   Key: "110011",  url: "https://divination.com/iching/lookup/61",  Name: "61 - Centering in Truth",   },  //51 110 011
  {   Key: "001100",  url: "https://divination.com/iching/lookup/62",  Name: "62 - Attention to Detail",  },  //12 001 100
  {   Key: "010101",  url: "https://divination.com/iching/lookup/63",  Name: "63 - After Completion",    },  //21 010 101
  {   Key: "101010",  url: "https://divination.com/iching/lookup/64",  Name: "64 - Nearing Completion",   }  //42 101 010
];

// Info from the the-iching.com website
let HexagramsTheiChing = [
  {   Key: "111111",  url: "http://the-iching.com/hexagram_1",  Name: "1 - Force (qián). The Creative",      },  //63 111 111
  {   Key: "000000",  url: "http://the-iching.com/hexagram_2",  Name: "2 - Receptive Power",     },  //00 000 000
  {   Key: "010001",  url: "http://the-iching.com/hexagram_3",  Name: "3 - Difficulty at the Beginning",       },  //17 010 001
  {   Key: "100010",  url: "http://the-iching.com/hexagram_4",  Name: "4 - Youthful Folly",     },  //34 100 010
  {   Key: "010111",  url: "http://the-iching.com/hexagram_5",  Name: "5 - Patience",          },  //23 010 111
  {   Key: "111010",  url: "http://the-iching.com/hexagram_6",  Name: "6 - Conflict",           },  //58 111 010
  {   Key: "000010",  url: "http://the-iching.com/hexagram_7",  Name: "7 - Organized Discipline",       },  //02 000 010
  {   Key: "010000",  url: "http://the-iching.com/hexagram_8",  Name: "8 - Holding Together", },  //16 010 000
  {   Key: "110111",  url: "http://the-iching.com/hexagram_9",  Name: "9 - Small Influences",  },  //55 110 111
  {   Key: "111011",  url: "http://the-iching.com/hexagram_10",  Name: "10 - Treading Carefully",  },  //59 111 011
  {   Key: "000111",  url: "http://the-iching.com/hexagram_11",  Name: "11 - Harmony",         },  //7 000 111
  {   Key: "111000",  url: "http://the-iching.com/hexagram_12",  Name: "12 - Standstill",     },  //56 111 000
  {   Key: "111101",  url: "http://the-iching.com/hexagram_13",  Name: "13 - Fellowship", },  //61 111 101
  {   Key: "101111",  url: "http://the-iching.com/hexagram_14",  Name: "14 - Affluence",          },  //47 101 111
  {   Key: "000100",  url: "http://the-iching.com/hexagram_15",  Name: "15 - Humility",      },  //4 000 100
  {   Key: "001000",  url: "http://the-iching.com/hexagram_16",  Name: "16 - Enthusiasm",   },  //8 001 000
  {   Key: "011001",  url: "http://the-iching.com/hexagram_17",  Name: "17 - Following",   },  //25 011 001
  {   Key: "100110",  url: "http://the-iching.com/hexagram_18",  Name: "18 - Repairing the Damage",    },  //38 100 110
  {   Key: "000011",  url: "http://the-iching.com/hexagram_19",  Name: "19 - Approach of Spring",  },  //3 000 011
  {   Key: "110000",  url: "http://the-iching.com/hexagram_20",  Name: "20 - Overview",   },  //48 110 000
  {   Key: "101001",  url: "http://the-iching.com/hexagram_21",  Name: "21 - Cutting Through",   },  //41 101 001
  {   Key: "100101",  url: "http://the-iching.com/hexagram_22",  Name: "22 - Grace and Beauty",   },  //37 100 101
  {   Key: "100000",  url: "http://the-iching.com/hexagram_23",  Name: "23 - Splitting Apart",    },  //32 100 000
  {   Key: "000001",  url: "http://the-iching.com/hexagram_24",  Name: "24 - Returning",    },  //1 000 001
  {   Key: "111001",  url: "http://the-iching.com/hexagram_25",  Name: "25 - Innocence",   },  //57 111 001
  {   Key: "100111",  url: "http://the-iching.com/hexagram_26",  Name: "26 - Containment of Potential",    },  //39 100 111
  {   Key: "100001",  url: "http://the-iching.com/hexagram_27",  Name: "27 - Nourishment",   },  //33 100 001
  {   Key: "011110",  url: "http://the-iching.com/hexagram_28",  Name: "28 - Excessive Pressure",   },  //30 011 110
  {   Key: "010010",  url: "http://the-iching.com/hexagram_29",  Name: "29 - Dangerous Depths",    },  //18 010 010
  {   Key: "101101",  url: "http://the-iching.com/hexagram_30",  Name: "30 - Clinging Like Fire",   },  //45 101 101
  {   Key: "011100",  url: "http://the-iching.com/hexagram_31",  Name: "31 - Mutual Attraction",  },  //28 011 100
  {   Key: "001110",  url: "http://the-iching.com/hexagram_32",  Name: "32 - Endurance",   },  //14 001 110
  {   Key: "111100",  url: "http://the-iching.com/hexagram_33",  Name: "33 - Retreat",     },  //60 111 100
  {   Key: "001111",  url: "http://the-iching.com/hexagram_34",  Name: "34 - Great Vigor", },  //15 001 111
  {   Key: "101000",  url: "http://the-iching.com/hexagram_35",  Name: "35 - Easy Progress",  },  //40 101 000
  {   Key: "000101",  url: "http://the-iching.com/hexagram_36",  Name: "36 - Darkening of the Light",    },  //5 000 101
  {   Key: "110101",  url: "http://the-iching.com/hexagram_37",  Name: "37 - Extended Family",    },  //53 110 101
  {   Key: "101011",  url: "http://the-iching.com/hexagram_38",  Name: "38 - Diverging Interests",   },  //43 101 011
  {   Key: "010100",  url: "http://the-iching.com/hexagram_39",  Name: "39 - Temporary Obstacles",   },  //20 010 100
  {   Key: "001010",  url: "http://the-iching.com/hexagram_40",  Name: "40 - Deliverance",  },  //10 001 010
  {   Key: "100011",  url: "http://the-iching.com/hexagram_41",  Name: "41 - Decrease",  },  //35 100 011
  {   Key: "110001",  url: "http://the-iching.com/hexagram_42",  Name: "42 - Increase",  },  //49 110 001
  {   Key: "011111",  url: "http://the-iching.com/hexagram_43",  Name: "43 - Determination",  },  //31 011 111
  {   Key: "111110",  url: "http://the-iching.com/hexagram_44",  Name: "44 - Liaison",  },  //62 111 110
  {   Key: "011000",  url: "http://the-iching.com/hexagram_45",  Name: "45 - Gathering Together",  },  //24 011 000
  {   Key: "000110",  url: "http://the-iching.com/hexagram_46",  Name: "46 - Pushing Upward",    },  //6 000 110
  {   Key: "011010",  url: "http://the-iching.com/hexagram_47",  Name: "47 - Oppression",    },  //26 011 010
  {   Key: "010110",  url: "http://the-iching.com/hexagram_48",  Name: "48 - The Well",    },  //22 010 110
  {   Key: "011101",  url: "http://the-iching.com/hexagram_49",  Name: "49 - Revolution",   },  //29 011 101
  {   Key: "101110",  url: "http://the-iching.com/hexagram_50",  Name: "50 - The Cauldron",  },  //46 101 110
  {   Key: "001001",  url: "http://the-iching.com/hexagram_51",  Name: "51 - Shock",   },  //9 001 001
  {   Key: "100100",  url: "http://the-iching.com/hexagram_52",  Name: "52 - Keeping Still",   },  //36 100 100
  {   Key: "110100",  url: "http://the-iching.com/hexagram_53",  Name: "53 - A Steady Pace",    },  //52 110 100
  {   Key: "001011",  url: "http://the-iching.com/hexagram_54",  Name: "54 - Careful Affection",   },  //11 001 011
  {   Key: "001101",  url: "http://the-iching.com/hexagram_55",  Name: "55 - Great Abundance",  },  //13 001 101
  {   Key: "101100",  url: "http://the-iching.com/hexagram_56",  Name: "56 - The Wanderer",  },  //44 101 100
  {   Key: "110110",  url: "http://the-iching.com/hexagram_57",  Name: "57 - Gentle Penetration",   },  //54 110 110
  {   Key: "011011",  url: "http://the-iching.com/hexagram_58",  Name: "58 - Joy",   },  //27 011 011
  {   Key: "110010",  url: "http://the-iching.com/hexagram_59",  Name: "59 - Dispersing",  },  //50 110 010
  {   Key: "010011",  url: "http://the-iching.com/hexagram_60",  Name: "60 - Limits and Connections", },  //19 010 011
  {   Key: "110011",  url: "http://the-iching.com/hexagram_61",  Name: "61 - Centering in Truth",   },  //51 110 011
  {   Key: "001100",  url: "http://the-iching.com/hexagram_62",  Name: "62 - Attention to Detail",  },  //12 001 100
  {   Key: "010101",  url: "http://the-iching.com/hexagram_63",  Name: "63 - After Completion",    },  //21 010 101
  {   Key: "101010",  url: "http://the-iching.com/hexagram_64",  Name: "64 - Nearing Completion",   }  //42 101 010
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
