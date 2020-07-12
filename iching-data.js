// iChing Data patterns v1.2

// line codes:
//
//    Change bit   Line Value
//              \ /
//               00 = 0: value 0 (yin line), not changing
//               01 = 1: value 1 (yang line), not changing
//               10 = 2: value 0 (yin line), changing to yang
//               11 = 3: value 1 (yang line), changing to yin
//    
//

// Coin patterns and their associated line types
const _lineValues = [
  2,  //000 = broken changing (all 0's = change bit)
  0,  //001 = broken line (majority of 0's)
  0,  //010 = broken line (majority of 0's)
  1,  //011 = solid line (majority of 1's)
  0,  //100 = broken line (majority of 0's)
  1,  //101 = solid line (majority of 1's)
  1,  //110 = solid line (majority of 1's)
  3   //111 = solid changing (all 1's = change bit)
];

// Line Patterns: (in order of above line type codes)  
//$scope.linePatterns = [ '---- ----', '---------','--- X ---', '----0----'];
const _linePatterns = [ String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + ' ' + String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + String.fromCharCode(0x2014),
                        String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + String.fromCharCode(0x2014),
                        String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + ' X ' + String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + String.fromCharCode(0x2014),
                        String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + '0' + String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + String.fromCharCode(0x2014) + String.fromCharCode(0x2014) ];

const _trigramNames = [
  String.fromCharCode(0x2637) + " K'un, Kun - Earth - The Receptive",  //000
  String.fromCharCode(0x2633) + " Chen, Zhen - Thunder - The Arousing", //001
  String.fromCharCode(0x2635) + " Kan - Water - The Abysmal",  //010
  String.fromCharCode(0x2631) + " Tui, Dui - Lake - The Joyousness",  //011
  String.fromCharCode(0x2636) + " Ken, Gen - Mountain - The Stillness",  //100
  String.fromCharCode(0x2632) + " Li - Fire - The Clinging Fire",   //101
  String.fromCharCode(0x2634) + " Sun, Xun - Wind or Wood - The Gentleness",  //110
  String.fromCharCode(0x2630) + " Ch'ien, Quian - Heaven - The Dragon" //111
];

const _noSpokeInfo = [
    {   id:1, hex: 1, flip: false, classes: "noSpoke posNorth" },
    {   id:2, hex: 2, flip: false, classes: "noSpoke posSouth" },
    {   id:3, hex: 29, flip: false, classes: "noSpoke posEast" },
    {   id:4, hex: 30, flip: true, classes: "noSpoke posWest" },
];

const _hexInfo = [
    {   id: 1, spokeClasses: "noSpoke posNorth", spokeNumber: 0   },
    {   id: 2, spokeClasses: "noSpoke posSouth", spokeNumber: 0   },
    {   id: 3, spokeClasses: "spoke innerSpokeLeft", spokeNumber: 1   },
    {   id: 4, spokeClasses: "spoke outerSpokeLeft", spokeNumber: 1   },
    {   id: 5, spokeClasses: "spoke innerSpokeLeft", spokeNumber: 2   },
    {   id: 6, spokeClasses: "spoke outerSpokeLeft", spokeNumber: 2   },
    {   id: 7, spokeClasses: "spoke innerSpokeLeft", spokeNumber: 3   },
    {   id: 8, spokeClasses: "spoke outerSpokeLeft", spokeNumber: 3   },
    {   id: 9, spokeClasses: "spoke innerSpokeLeft", spokeNumber: 4   },
    {   id: 10, spokeClasses: "spoke outerSpokeLeft", spokeNumber: 4   },
    {   id: 11, spokeClasses: "spoke innerSpokeLeft", spokeNumber: 5   },
    {   id: 12, spokeClasses: "spoke outerSpokeLeft", spokeNumber: 5   },
    {   id: 13, spokeClasses: "spoke innerSpokeLeft", spokeNumber: 6   },
    {   id: 14, spokeClasses: "spoke outerSpokeLeft", spokeNumber: 6   },
    {   id: 15, spokeClasses: "spoke innerSpokeLeft", spokeNumber: 7   },
    {   id: 16, spokeClasses: "spoke outerSpokeLeft", spokeNumber: 7   },
    {   id: 17, spokeClasses: "spoke innerSpokeLeft", spokeNumber: 8   },
    {   id: 18, spokeClasses: "spoke outerSpokeLeft", spokeNumber: 8   },
    {   id: 19, spokeClasses: "spoke innerSpokeLeft", spokeNumber: 9   },
    {   id: 20, spokeClasses: "spoke outerSpokeLeft", spokeNumber: 9   },
    {   id: 21, spokeClasses: "spoke innerSpokeLeft", spokeNumber: 10   },
    {   id: 22, spokeClasses: "spoke outerSpokeLeft", spokeNumber: 10   },
    {   id: 23, spokeClasses: "spoke innerSpokeLeft", spokeNumber: 11   },
    {   id: 24, spokeClasses: "spoke outerSpokeLeft", spokeNumber: 11   },
    {   id: 25, spokeClasses: "spoke innerSpokeLeft", spokeNumber: 12   },
    {   id: 26, spokeClasses: "spoke outerSpokeLeft", spokeNumber: 12   },
    {   id: 27, spokeClasses: "spoke innerSpokeLeft", spokeNumber: 13   },
    {   id: 28, spokeClasses: "spoke outerSpokeLeft", spokeNumber: 13   },
    {   id: 29, spokeClasses: "noSpoke posEast", spokeNumber: 0   },
    {   id: 30, spokeClasses: "noSpoke posWest", spokeNumber: 0   },
    {   id: 31, spokeClasses: "spoke innerSpokeLeft", spokeNumber: 14   },
    {   id: 32, spokeClasses: "spoke outerSpokeLeft", spokeNumber: 14   },
    {   id: 33, spokeClasses: "spoke innerSpokeLeft", spokeNumber: 15   },
    {   id: 34, spokeClasses: "spoke outerSpokeLeft", spokeNumber: 15   },
    {   id: 35, spokeClasses: "spoke innerSpokeRight", spokeNumber: 16   },
    {   id: 36, spokeClasses: "spoke outerSpokeRight", spokeNumber: 16   },
    {   id: 37, spokeClasses: "spoke innerSpokeRight", spokeNumber: 17   },
    {   id: 38, spokeClasses: "spoke outerSpokeRight", spokeNumber: 17   },
    {   id: 39, spokeClasses: "spoke innerSpokeRight", spokeNumber: 18   },
    {   id: 40, spokeClasses: "spoke outerSpokeRight", spokeNumber: 18   },
    {   id: 41, spokeClasses: "spoke innerSpokeRight", spokeNumber: 19   },
    {   id: 42, spokeClasses: "spoke outerSpokeRight", spokeNumber: 19   },
    {   id: 43, spokeClasses: "spoke innerSpokeRight", spokeNumber: 20   },
    {   id: 44, spokeClasses: "spoke outerSpokeRight", spokeNumber: 20   },
    {   id: 45, spokeClasses: "spoke innerSpokeRight", spokeNumber: 21   },
    {   id: 46, spokeClasses: "spoke outerSpokeRight", spokeNumber: 21   },
    {   id: 47, spokeClasses: "spoke innerSpokeRight", spokeNumber: 22   },
    {   id: 48, spokeClasses: "spoke outerSpokeRight", spokeNumber: 22   },
    {   id: 49, spokeClasses: "spoke innerSpokeRight", spokeNumber: 23   },
    {   id: 50, spokeClasses: "spoke outerSpokeRight", spokeNumber: 23   },
    {   id: 51, spokeClasses: "spoke innerSpokeRight", spokeNumber: 24   },
    {   id: 52, spokeClasses: "spoke outerSpokeRight", spokeNumber: 24   },
    {   id: 53, spokeClasses: "spoke innerSpokeRight", spokeNumber: 25   },
    {   id: 54, spokeClasses: "spoke outerSpokeRight", spokeNumber: 25   },
    {   id: 55, spokeClasses: "spoke innerSpokeRight", spokeNumber: 26   },
    {   id: 56, spokeClasses: "spoke outerSpokeRight", spokeNumber: 26   },
    {   id: 57, spokeClasses: "spoke innerSpokeRight", spokeNumber: 27   },
    {   id: 58, spokeClasses: "spoke outerSpokeRight", spokeNumber: 27   },
    {   id: 59, spokeClasses: "spoke innerSpokeRight", spokeNumber: 28   },
    {   id: 60, spokeClasses: "spoke outerSpokeRight", spokeNumber: 28   },
    {   id: 61, spokeClasses: "spoke innerSpokeRight", spokeNumber: 29   },
    {   id: 62, spokeClasses: "spoke outerSpokeRight", spokeNumber: 29   },
    {   id: 63, spokeClasses: "spoke innerSpokeRight", spokeNumber: 30   },
    {   id: 64, spokeClasses: "spoke outerSpokeRight", spokeNumber: 30   }        
];

const _spokeInfoLeft = [
    {  id: 1, hexInner: 3, hexOuter: 4, angle: 96, classes: "spoke leftSpoke angle96" }, // spoke 1
    {  id: 2, hexInner: 5, hexOuter: 6, angle: 108, classes: "spoke leftSpoke angle108" }, // spoke 2
    {  id: 3, hexInner: 7, hexOuter: 8, angle: 120, classes: "spoke leftSpoke angle120" }, // spoke 3
    {  id: 4, hexInner: 9, hexOuter: 10, angle: 132, classes: "spoke leftSpoke angle132" }, // spoke 4
    {  id: 5, hexInner: 11, hexOuter: 12, angle: 144, classes: "spoke leftSpoke angle144" }, // spoke 5
    {  id: 6, hexInner: 13, hexOuter: 14, angle: 156, classes: "spoke leftSpoke angle156" }, // spoke 6
    {  id: 7, hexInner: 15, hexOuter: 16, angle: 168, classes: "spoke leftSpoke angle168" }, // spoke 7
    {  id: 8, hexInner: 17, hexOuter: 18, angle: 180, classes: "spoke leftSpoke angle180" },   // spoke 8
    {  id: 9, hexInner: 19, hexOuter: 20, angle: 192, classes: "spoke leftSpoke angle192" },  // spoke 9
    {  id: 10, hexInner: 21, hexOuter: 22, angle: 204, classes: "spoke leftSpoke angle204" },  // spoke 10
    {  id: 11, hexInner: 23, hexOuter: 24, angle: 216, classes: "spoke leftSpoke angle216" },  // spoke 11
    {  id: 12, hexInner: 25, hexOuter: 26, angle: 228, classes: "spoke leftSpoke angle228" },  // spoke 12
    {  id: 13, hexInner: 27, hexOuter: 28, angle: 240, classes: "spoke leftSpoke angle240" },  // spoke 13
    {  id: 14, hexInner: 31, hexOuter: 32, angle: 252, classes: "spoke leftSpoke angle252" },  // spoke 14
    {  id: 15, hexInner: 33, hexOuter: 34, angle: 264, classes: "spoke leftSpoke angle264" },  // spoke 15
];

const _spokeInfoRight = [
    {  id: 16, hexInner: 35, hexOuter: 36, angle: -84, classes: "spoke rightSpoke angleN84" }, // spoke 16
    {  id: 17, hexInner: 37, hexOuter: 38, angle: -72, classes: "spoke rightSpoke angleN72" }, // spoke 17
    {  id: 18, hexInner: 39, hexOuter: 40, angle: -60, classes: "spoke rightSpoke angleN60" }, // spoke 18
    {  id: 19, hexInner: 41, hexOuter: 42, angle: -48, classes: "spoke rightSpoke angleN48" }, // spoke 19
    {  id: 20, hexInner: 43, hexOuter: 44, angle: -36, classes: "spoke rightSpoke angleN36" }, // spoke 20
    {  id: 21, hexInner: 45, hexOuter: 46, angle: -24, classes: "spoke rightSpoke angleN24" }, // spoke 21
    {  id: 22, hexInner: 47, hexOuter: 48, angle: -12, classes: "spoke rightSpoke angleN12" }, // spoke 22
    {  id: 23, hexInner: 49, hexOuter: 50, angle: 0, classes: "spoke rightSpoke angle0" },   // spoke 23
    {  id: 24, hexInner: 51, hexOuter: 52, angle: 12, classes: "spoke rightSpoke angle12" },  // spoke 24
    {  id: 25, hexInner: 53, hexOuter: 54, angle: 24, classes: "spoke rightSpoke angle24" },  // spoke 25
    {  id: 26, hexInner: 55, hexOuter: 56, angle: 36, classes: "spoke rightSpoke angle36" },  // spoke 26
    {  id: 27, hexInner: 57, hexOuter: 58, angle: 48, classes: "spoke rightSpoke angle48" },  // spoke 27
    {  id: 28, hexInner: 59, hexOuter: 60, angle: 60, classes: "spoke rightSpoke angle60" },  // spoke 28
    {  id: 29, hexInner: 61, hexOuter: 62, angle: 72, classes: "spoke rightSpoke angle72" },  // spoke 29
    {  id: 30, hexInner: 63, hexOuter: 64, angle: 84, classes: "spoke rightSpoke angle84" }  // spoke 30
];

// Info from various iChing websites
const _iChingInfo = [
  { id: 0, Domain: "https://cafeausoul.com/iching/", Short: "CafeAuSoul.com", Hexagrams: [
    {   Key: "111111",  url: "https://cafeausoul.com/iching/qian-creative",  Name: "1 - Qián (The Creative)",      },  //63 111 111
    {   Key: "000000",  url: "https://cafeausoul.com/iching/kun-receptive",  Name: "2 - K'un (The Receptive)",     },  //00 000 000
    {   Key: "010001",  url: "https://cafeausoul.com/iching/chun-difficult-beginnings",  Name: "3 - Chun (Difficult Beginnings)",       },  //17 010 001
    {   Key: "100010",  url: "https://cafeausoul.com/iching/meng-youthful-folly",  Name: "4 - Meng (Youthful Folly)",     },  //34 100 010
    {   Key: "010111",  url: "https://cafeausoul.com/iching/hsu-nourished-while-waiting",  Name: "5 - Hsu (Nourished While Waiting)",          },  //23 010 111
    {   Key: "111010",  url: "https://cafeausoul.com/iching/sung-conflict",  Name: "6 - Sung (Conflict)",           },  //58 111 010
    {   Key: "000010",  url: "https://cafeausoul.com/iching/shih-army",  Name: "7 - Shih (Army)",       },  //02 000 010
    {   Key: "010000",  url: "https://cafeausoul.com/iching/pi-uniting",  Name: "8 - Pi (Uniting)", },  //16 010 000
    {   Key: "110111",  url: "https://cafeausoul.com/iching/hsiao-chu-small-restraint",  Name: "9 - Hsiao Ch'u (Small Restraint)",  },  //55 110 111
    {   Key: "111011",  url: "https://cafeausoul.com/iching/lu-treading",  Name: "10 - Lǚ (Treading)",  },  //59 111 011
    {   Key: "000111",  url: "https://cafeausoul.com/iching/tai-peace",  Name: "11 - T'ai (Peace)",         },  //7 000 111
    {   Key: "111000",  url: "https://cafeausoul.com/iching/pi-standstill",  Name: "12 - P'i (Standstill)",     },  //56 111 000
    {   Key: "111101",  url: "https://cafeausoul.com/iching/tung-jen-fellowship",  Name: "13 - T'ung Jen (Fellowship)", },  //61 111 101
    {   Key: "101111",  url: "https://cafeausoul.com/iching/ta-yu-great-possessing",  Name: "14 - Ta Yu (Great Possessing)",          },  //47 101 111
    {   Key: "000100",  url: "https://cafeausoul.com/iching/qian-authenticity",  Name: "15 - Qiān (Authenticity)",      },  //4 000 100
    {   Key: "001000",  url: "https://cafeausoul.com/iching/yu-enthusiasm",  Name: "16 - Yu (Enthusiasm)",   },  //8 001 000
    {   Key: "011001",  url: "https://cafeausoul.com/iching/sui-following",  Name: "17 - Sui (Following)",   },  //25 011 001
    {   Key: "100110",  url: "https://cafeausoul.com/iching/ku-decay",  Name: "18 - Ku (Decay)",    },  //38 100 110
    {   Key: "000011",  url: "https://cafeausoul.com/iching/lin-approach",  Name: "19 - Lin (Approach)",  },  //3 000 011
    {   Key: "110000",  url: "https://cafeausoul.com/iching/kuan-contemplation",  Name: "20 - Kuan (Contemplation)",   },  //48 110 000
    {   Key: "101001",  url: "https://cafeausoul.com/iching/shi-ho-biting-through",  Name: "21 - Shi Ho (Biting Through)",   },  //41 101 001
    {   Key: "100101",  url: "https://cafeausoul.com/iching/bi-grace",  Name: "22 - Bi (Grace)",   },  //37 100 101
    {   Key: "100000",  url: "https://cafeausoul.com/iching/po-split-apart",  Name: "23 - Po (Split Apart)",    },  //32 100 000
    {   Key: "000001",  url: "https://cafeausoul.com/iching/fu-return",  Name: "24 - Fu (Return)",    },  //1 000 001
    {   Key: "111001",  url: "https://cafeausoul.com/iching/wu-wang-innocence",  Name: "25 - Wu Wang (Innocence)",   },  //57 111 001
    {   Key: "100111",  url: "https://cafeausoul.com/iching/ta-chu-controlled-power",  Name: "26 - Ta Ch’u (Controlled Power)",    },  //39 100 111
    {   Key: "100001",  url: "https://cafeausoul.com/iching/yi-nourishing-vision",  Name: "27 - Yi (Nourishing Vision)",   },  //33 100 001
    {   Key: "011110",  url: "https://cafeausoul.com/iching/ta-kuo-critical-mass",  Name: "28 - Ta Kuo (Critical Mass)",   },  //30 011 110
    {   Key: "010010",  url: "https://cafeausoul.com/iching/kn-abyss",  Name: "29 - Kǎn (Abyss)",    },  //18 010 010
    {   Key: "101101",  url: "https://cafeausoul.com/iching/li-clarity",  Name: "30 - Li (Clarity)",   },  //45 101 101
    {   Key: "011100",  url: "https://cafeausoul.com/iching/hsien-influencewooing",  Name: "31 - Hsien (Influence/Wooing)",  },  //28 011 100
    {   Key: "001110",  url: "https://cafeausoul.com/iching/heng-duration",  Name: "32 - Heng (Duration)",   },  //14 001 110
    {   Key: "111100",  url: "https://cafeausoul.com/iching/tun-retreat",  Name: "33 - Tun (Retreat)",     },  //60 111 100
    {   Key: "001111",  url: "https://cafeausoul.com/iching/da-zhuang-great-power",  Name: "34 - Da Zhuang (Great Power)", },  //15 001 111
    {   Key: "101000",  url: "https://cafeausoul.com/iching/chin-progress",  Name: "35 - Chin (Progress)",  },  //40 101 000
    {   Key: "000101",  url: "https://cafeausoul.com/iching/ming-yi-brightness-hiding",  Name: "36 - Ming Yi (Brightness Hiding)",    },  //5 000 101
    {   Key: "110101",  url: "https://cafeausoul.com/iching/chia-jen-family",  Name: "37 - Chia Jen (Family)",    },  //53 110 101
    {   Key: "101011",  url: "https://cafeausoul.com/iching/kuei-opposition",  Name: "38 - K’uei (Opposition)",   },  //43 101 011
    {   Key: "010100",  url: "https://cafeausoul.com/iching/jian-obstruction",  Name: "39 - Jian (Obstruction)",   },  //20 010 100
    {   Key: "001010",  url: "https://cafeausoul.com/iching/jie-liberation",  Name: "40 - Jie (Liberation)",  },  //10 001 010
    {   Key: "100011",  url: "https://cafeausoul.com/iching/sun-decrease",  Name: "41 - Sun (Decrease)",  },  //35 100 011
    {   Key: "110001",  url: "https://cafeausoul.com/iching/yi-increase",  Name: "42 - Yi (Increase)",  },  //49 110 001
    {   Key: "011111",  url: "https://cafeausoul.com/iching/guai-determination",  Name: "43 - Guai (Determination)",  },  //31 011 111
    {   Key: "111110",  url: "https://cafeausoul.com/iching/gou-coming-meet",  Name: "44 - Gou (Coming to Meet)",  },  //62 111 110
    {   Key: "011000",  url: "https://cafeausoul.com/iching/cui-gathering-together",  Name: "45 - Cui (Gathering Together)",  },  //24 011 000
    {   Key: "000110",  url: "https://cafeausoul.com/iching/sheng-pushing-upward",  Name: "46 - Sheng (Pushing Upward)",    },  //6 000 110
    {   Key: "011010",  url: "https://cafeausoul.com/iching/kun-oppressionexhaustion",  Name: "47 - Kùn (Oppression/Exhaustion)",    },  //26 011 010
    {   Key: "010110",  url: "https://cafeausoul.com/iching/jing-well",  Name: "48 - Jing (The Well)",    },  //22 010 110
    {   Key: "011101",  url: "https://cafeausoul.com/iching/ko-moltingrevolution",  Name: "49 - Ko (Molting/Revolution)",   },  //29 011 101
    {   Key: "101110",  url: "https://cafeausoul.com/iching/ting-cauldron",  Name: "50 - Ting (Cauldron)",  },  //46 101 110
    {   Key: "001001",  url: "https://cafeausoul.com/iching/zhen-shocking",  Name: "51 - Zhen (Shocking)",   },  //9 001 001
    {   Key: "100100",  url: "https://cafeausoul.com/iching/ken-keeping-still",  Name: "52 - Ken (Keeping Still)",   },  //36 100 100
    {   Key: "110100",  url: "https://cafeausoul.com/iching/jian-development",  Name: "53 - Ji’an (Development)",    },  //52 110 100
    {   Key: "001011",  url: "https://cafeausoul.com/iching/kui-mei-propriety",  Name: "54 - Kui Mei (Propriety)",   },  //11 001 011
    {   Key: "001101",  url: "https://cafeausoul.com/iching/feng-abundance",  Name: "55 - Feng (Abundance)",  },  //13 001 101
    {   Key: "101100",  url: "https://cafeausoul.com/iching/lu-wanderer",  Name: "56 - Lu (The Wanderer)",  },  //44 101 100
    {   Key: "110110",  url: "https://cafeausoul.com/iching/xun-penetration",  Name: "57 - Xun (Penetration)",   },  //54 110 110
    {   Key: "011011",  url: "https://cafeausoul.com/iching/tui-joy",  Name: "58 - Tui (Joy)",   },  //27 011 011
    {   Key: "110010",  url: "https://cafeausoul.com/iching/huan-dispersion",  Name: "59 - Huan (Dispersion)",  },  //50 110 010
    {   Key: "010011",  url: "https://cafeausoul.com/iching/jie-limitation",  Name: "60 - Jie (Limitation)", },  //19 010 011
    {   Key: "110011",  url: "https://cafeausoul.com/iching/zhong-fu-inner-truth",  Name: "61 - Zhong Fu (Inner Truth)",   },  //51 110 011
    {   Key: "001100",  url: "https://cafeausoul.com/iching/xiao-guo-small-exceeding",  Name: "62 - Xiao Guo (Small Exceeding)",  },  //12 001 100
    {   Key: "010101",  url: "https://cafeausoul.com/iching/chi-chi-after-completion",  Name: "63 - Chi Chi (After Completion)",    },  //21 010 101
    {   Key: "101010",  url: "https://cafeausoul.com/iching/wei-chi-completion",  Name: "64 - Wei Chi (Before Completion)",   }  //42 101 010
  ] },
  { id: 1, Domain: "http://www.jamesdekorne.com", Short: "JamesDekorne.com", Hexagrams: [
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
  ] },
  { id: 2, Domain: "https://divination.com/iching/", Short: "Divination.com", Hexagrams: [
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
  ] },
  { id: 3, Domain: "http://the-iching.com", Short: "The-iChing.com", Hexagrams: [
    {   Key: "111111",  url: "http://the-iching.com/hexagram_1",  Name: "1 - Force (qián). The Creative",      },  //63 111 111
    {   Key: "000000",  url: "http://the-iching.com/hexagram_2",  Name: "2 - Field (kūn). The Receptive",     },  //00 000 000
    {   Key: "010001",  url: "http://the-iching.com/hexagram_3",  Name: "3 - Sprouting (zhūn). Difficulty at the Beginning",       },  //17 010 001
    {   Key: "100010",  url: "http://the-iching.com/hexagram_4",  Name: "4 - Enveloping (méng). Youthful Folly",     },  //34 100 010
    {   Key: "010111",  url: "http://the-iching.com/hexagram_5",  Name: "5 - Attending (xū). Waiting",          },  //23 010 111
    {   Key: "111010",  url: "http://the-iching.com/hexagram_6",  Name: "6 - Arguing (sòng). Conflict",           },  //58 111 010
    {   Key: "000010",  url: "http://the-iching.com/hexagram_7",  Name: "7 - Leading (shī). The Army",       },  //02 000 010
    {   Key: "010000",  url: "http://the-iching.com/hexagram_8",  Name: "8 - Grouping (bǐ). Holding Together", },  //16 010 000
    {   Key: "110111",  url: "http://the-iching.com/hexagram_9",  Name: "9 - Small Accumulating (xiǎo chù). Small Taming",  },  //55 110 111
    {   Key: "111011",  url: "http://the-iching.com/hexagram_10",  Name: "10 - Treading (lǚ). Treading (Conduct)",  },  //59 111 011
    {   Key: "000111",  url: "http://the-iching.com/hexagram_11",  Name: "11 - Pervading (tài). Peace",         },  //7 000 111
    {   Key: "111000",  url: "http://the-iching.com/hexagram_12",  Name: "12 - Obstruction (pǐ). Standstill",     },  //56 111 000
    {   Key: "111101",  url: "http://the-iching.com/hexagram_13",  Name: "13 - Concording People (tóng rén). Fellowship", },  //61 111 101
    {   Key: "101111",  url: "http://the-iching.com/hexagram_14",  Name: "14 - Great Possessing (dà yǒu). Great Possession",          },  //47 101 111
    {   Key: "000100",  url: "http://the-iching.com/hexagram_15",  Name: "15 - Humbling (qiān). Modesty",      },  //4 000 100
    {   Key: "001000",  url: "http://the-iching.com/hexagram_16",  Name: "16 - Providing-For (yù). Enthusiasm",   },  //8 001 000
    {   Key: "011001",  url: "http://the-iching.com/hexagram_17",  Name: "17 - Following (suí)",   },  //25 011 001
    {   Key: "100110",  url: "http://the-iching.com/hexagram_18",  Name: "18 - Corrupting (gǔ). Work on the Decayed",    },  //38 100 110
    {   Key: "000011",  url: "http://the-iching.com/hexagram_19",  Name: "19 - Nearing (lín). Approach",  },  //3 000 011
    {   Key: "110000",  url: "http://the-iching.com/hexagram_20",  Name: "20 - Viewing (guān). Contemplation",   },  //48 110 000
    {   Key: "101001",  url: "http://the-iching.com/hexagram_21",  Name: "21 - Gnawing Bite (shì kè). Biting Through",   },  //41 101 001
    {   Key: "100101",  url: "http://the-iching.com/hexagram_22",  Name: "22 - Adorning (bì). Grace",   },  //37 100 101
    {   Key: "100000",  url: "http://the-iching.com/hexagram_23",  Name: "23 - Stripping (bō). Splitting Apart",    },  //32 100 000
    {   Key: "000001",  url: "http://the-iching.com/hexagram_24",  Name: "24 - Returning (fù). Return",    },  //1 000 001
    {   Key: "111001",  url: "http://the-iching.com/hexagram_25",  Name: "25 - Without Embroiling (wú wàng). Innocence",   },  //57 111 001
    {   Key: "100111",  url: "http://the-iching.com/hexagram_26",  Name: "26 - Great Accumulating (dà chù). Great Taming",    },  //39 100 111
    {   Key: "100001",  url: "http://the-iching.com/hexagram_27",  Name: "27 - Swallowing (yí). Mouth Corners",   },  //33 100 001
    {   Key: "011110",  url: "http://the-iching.com/hexagram_28",  Name: "28 - Great Exceeding (dà guò). Great Preponderance",   },  //30 011 110
    {   Key: "010010",  url: "http://the-iching.com/hexagram_29",  Name: "29 - Gorge (kǎn). The Abysmal Water",    },  //18 010 010
    {   Key: "101101",  url: "http://the-iching.com/hexagram_30",  Name: "30 - Radiance (lí). The Clinging",   },  //45 101 101
    {   Key: "011100",  url: "http://the-iching.com/hexagram_31",  Name: "31 - Conjoining (xián). Influence",  },  //28 011 100
    {   Key: "001110",  url: "http://the-iching.com/hexagram_32",  Name: "32 - Persevering (héng). Duration",   },  //14 001 110
    {   Key: "111100",  url: "http://the-iching.com/hexagram_33",  Name: "33 - Retiring (dùn). Retreat",     },  //60 111 100
    {   Key: "001111",  url: "http://the-iching.com/hexagram_34",  Name: "34 - Great Invigorating (dà zhuàng). Great Power", },  //15 001 111
    {   Key: "101000",  url: "http://the-iching.com/hexagram_35",  Name: "35 - Prospering (jìn). Progress",  },  //40 101 000
    {   Key: "000101",  url: "http://the-iching.com/hexagram_36",  Name: "36 - Brightness Hiding (míng yí). Darkening of the Light",    },  //5 000 101
    {   Key: "110101",  url: "http://the-iching.com/hexagram_37",  Name: "37 - Dwelling People (jiā rén). The Family",    },  //53 110 101
    {   Key: "101011",  url: "http://the-iching.com/hexagram_38",  Name: "38 - Polarising (kuí). Opposition",   },  //43 101 011
    {   Key: "010100",  url: "http://the-iching.com/hexagram_39",  Name: "39 - Limping (jiǎn). Obstruction",   },  //20 010 100
    {   Key: "001010",  url: "http://the-iching.com/hexagram_40",  Name: "40 - Taking-Apart (xiè). Deliverance",  },  //10 001 010
    {   Key: "100011",  url: "http://the-iching.com/hexagram_41",  Name: "41 - Diminishing (sǔn). Decrease",  },  //35 100 011
    {   Key: "110001",  url: "http://the-iching.com/hexagram_42",  Name: "42 - Augmenting (yì). Increase",  },  //49 110 001
    {   Key: "011111",  url: "http://the-iching.com/hexagram_43",  Name: "43 - Parting (guài). Breakthrough",  },  //31 011 111
    {   Key: "111110",  url: "http://the-iching.com/hexagram_44",  Name: "44 - Coupling (gòu). Coming to Meet",  },  //62 111 110
    {   Key: "011000",  url: "http://the-iching.com/hexagram_45",  Name: "45 - Clustering (cuì). Gathering Together",  },  //24 011 000
    {   Key: "000110",  url: "http://the-iching.com/hexagram_46",  Name: "46 - Ascending (shēng). Pushing Upward",    },  //6 000 110
    {   Key: "011010",  url: "http://the-iching.com/hexagram_47",  Name: "47 - Confining (kùn). Oppression",    },  //26 011 010
    {   Key: "010110",  url: "http://the-iching.com/hexagram_48",  Name: "48 - Welling (jǐng). The Well",    },  //22 010 110
    {   Key: "011101",  url: "http://the-iching.com/hexagram_49",  Name: "49 - Skinning (gé). Revolution",   },  //29 011 101
    {   Key: "101110",  url: "http://the-iching.com/hexagram_50",  Name: "50 - Holding (dǐng). The Cauldron",  },  //46 101 110
    {   Key: "001001",  url: "http://the-iching.com/hexagram_51",  Name: "51 - Shake (zhèn). Arousing",   },  //9 001 001
    {   Key: "100100",  url: "http://the-iching.com/hexagram_52",  Name: "52 - Bound (gèn). The Keeping Still",   },  //36 100 100
    {   Key: "110100",  url: "http://the-iching.com/hexagram_53",  Name: "53 - Infiltrating (jiàn). Development",    },  //52 110 100
    {   Key: "001011",  url: "http://the-iching.com/hexagram_54",  Name: "54 - Converting The Maiden (guī mèi). The Marrying Maiden",   },  //11 001 011
    {   Key: "001101",  url: "http://the-iching.com/hexagram_55",  Name: "55 - Abounding (fēng). Abundance",  },  //13 001 101
    {   Key: "101100",  url: "http://the-iching.com/hexagram_56",  Name: "56 - Sojourning (lǚ). The Wanderer",  },  //44 101 100
    {   Key: "110110",  url: "http://the-iching.com/hexagram_57",  Name: "57 - Ground (xùn). The Gentle",   },  //54 110 110
    {   Key: "011011",  url: "http://the-iching.com/hexagram_58",  Name: "58 - Open (duì). The Joyous",   },  //27 011 011
    {   Key: "110010",  url: "http://the-iching.com/hexagram_59",  Name: "59 - Dispersing (huàn). Dispersion",  },  //50 110 010
    {   Key: "010011",  url: "http://the-iching.com/hexagram_60",  Name: "60 - Articulating (jié). Limitation", },  //19 010 011
    {   Key: "110011",  url: "http://the-iching.com/hexagram_61",  Name: "61 - Centre Confirming (zhōng fú). Inner Truth",   },  //51 110 011
    {   Key: "001100",  url: "http://the-iching.com/hexagram_62",  Name: "62 - Small Exceeding (xiǎo guò). Small Preponderance",  },  //12 001 100
    {   Key: "010101",  url: "http://the-iching.com/hexagram_63",  Name: "63 - Already Fording (jì jì). After Completion",    },  //21 010 101
    {   Key: "101010",  url: "http://the-iching.com/hexagram_64",  Name: "64 - Not-Yet Fording (wèi jì). Before Completion",   }  //42 101 010
  ] },
  { id: 4, Domain: "http://inthefamilyway.org/iching/", Short: "InTheFamilyWay.org", Hexagrams: [
    {   Key: "111111",  url: "http://inthefamilyway.org/iching/hexagrams/h1/",  Name: "1 - Inspiring Force/Creator QIAN",      },  //63 111 111
    {   Key: "000000",  url: "http://inthefamilyway.org/iching/hexagrams/h2/",  Name: "2 - Field/Midwife KUN",     },  //00 000 000
    {   Key: "010001",  url: "http://inthefamilyway.org/iching/hexagrams/h3/",  Name: "3 - Sprouting ZHUN",       },  //17 010 001
    {   Key: "100010",  url: "http://inthefamilyway.org/iching/hexagrams/h4/",  Name: "4 - Enveloping MENG",     },  //34 100 010
    {   Key: "010111",  url: "http://inthefamilyway.org/iching/hexagrams/h5/",  Name: "5 - Attending XU",          },  //23 010 111
    {   Key: "111010",  url: "http://inthefamilyway.org/iching/hexagrams/h6/",  Name: "6 - Arguing SONG",           },  //58 111 010
    {   Key: "000010",  url: "http://inthefamilyway.org/iching/hexagrams/h7/",  Name: "7 - Legions SHI",       },  //02 000 010
    {   Key: "010000",  url: "http://inthefamilyway.org/iching/hexagrams/h8/",  Name: "8 - Grouping BI", },  //16 010 000
    {   Key: "110111",  url: "http://inthefamilyway.org/iching/hexagrams/h9/",  Name: "9 - Small Accumulates XIAO CHU",  },  //55 110 111
    {   Key: "111011",  url: "http://inthefamilyway.org/iching/hexagrams/h10/",  Name: "10 - Treading LU",  },  //59 111 011
    {   Key: "000111",  url: "http://inthefamilyway.org/iching/hexagrams/h11/",  Name: "11 - Pervading TAI",         },  //7 000 111
    {   Key: "111000",  url: "http://inthefamilyway.org/iching/hexagrams/h12/",  Name: "12 - Obstruction BI",     },  //56 111 000
    {   Key: "111101",  url: "http://inthefamilyway.org/iching/hexagrams/h13/",  Name: "13 - Harmonizing People TONG REN", },  //61 111 101
    {   Key: "101111",  url: "http://inthefamilyway.org/iching/hexagrams/h14/",  Name: "14 - Great Being DA YOU",          },  //47 101 111
    {   Key: "000100",  url: "http://inthefamilyway.org/iching/hexagrams/h15/",  Name: "15 - Humbling QIAN",      },  //4 000 100
    {   Key: "001000",  url: "http://inthefamilyway.org/iching/hexagrams/h16/",  Name: "16 - Providing For YU",   },  //8 001 000
    {   Key: "011001",  url: "http://inthefamilyway.org/iching/hexagrams/h17/",  Name: "17 - Following SUI",   },  //25 011 001
    {   Key: "100110",  url: "http://inthefamilyway.org/iching/hexagrams/h18/",  Name: "18 - Corruption/Renovating GU",    },  //38 100 110
    {   Key: "000011",  url: "http://inthefamilyway.org/iching/hexagrams/h19/",  Name: "19 - Nearing LIN",  },  //3 000 011
    {   Key: "110000",  url: "http://inthefamilyway.org/iching/hexagrams/h20/",  Name: "20 - Viewing GUAN",   },  //48 110 000
    {   Key: "101001",  url: "http://inthefamilyway.org/iching/hexagrams/h21/",  Name: "21 - Biting Through SHI HE",   },  //41 101 001
    {   Key: "100101",  url: "http://inthefamilyway.org/iching/hexagrams/h22/",  Name: "22 - Adorning BI",   },  //37 100 101
    {   Key: "100000",  url: "http://inthefamilyway.org/iching/hexagrams/h23/",  Name: "23 - Stripping BO",    },  //32 100 000
    {   Key: "000001",  url: "http://inthefamilyway.org/iching/hexagrams/h24/",  Name: "24 - Returning FU",    },  //1 000 001
    {   Key: "111001",  url: "http://inthefamilyway.org/iching/hexagrams/h25/",  Name: "25 - Disentangling WU WANG",   },  //57 111 001
    {   Key: "100111",  url: "http://inthefamilyway.org/iching/hexagrams/h26/",  Name: "26 - Great Accumulates DA CHU",    },  //39 100 111
    {   Key: "100001",  url: "http://inthefamilyway.org/iching/hexagrams/h27/",  Name: "27 - Jaws/Nourishing YI",   },  //33 100 001
    {   Key: "011110",  url: "http://inthefamilyway.org/iching/hexagrams/h28/",  Name: "28 - Great Transition DA GUO",   },  //30 011 110
    {   Key: "010010",  url: "http://inthefamilyway.org/iching/hexagrams/h29/",  Name: "29 - Ghost River/Navigator XI KAN",    },  //18 010 010
    {   Key: "101101",  url: "http://inthefamilyway.org/iching/hexagrams/h30/",  Name: "30 - Radiance/Visionary LI",   },  //45 101 101
    {   Key: "011100",  url: "http://inthefamilyway.org/iching/hexagrams/h31/",  Name: "31 - Conjoining XIAN",  },  //28 011 100
    {   Key: "001110",  url: "http://inthefamilyway.org/iching/hexagrams/h32/",  Name: "32 - Persevering HENG",   },  //14 001 110
    {   Key: "111100",  url: "http://inthefamilyway.org/iching/hexagrams/h33/",  Name: "33 - Retiring/Retreat DUN",     },  //60 111 100
    {   Key: "001111",  url: "http://inthefamilyway.org/iching/hexagrams/h34/",  Name: "34 - Great Invigorating DA ZHUANG", },  //15 001 111
    {   Key: "101000",  url: "http://inthefamilyway.org/iching/hexagrams/h35/",  Name: "35 - Flourishing JIN",  },  //40 101 000
    {   Key: "000101",  url: "http://inthefamilyway.org/iching/hexagrams/h36/",  Name: "36 - Hiding Brightness MING YI",    },  //5 000 101
    {   Key: "110101",  url: "http://inthefamilyway.org/iching/hexagrams/h37/",  Name: "37 - Dwelling People JIA REN",    },  //53 110 101
    {   Key: "101011",  url: "http://inthefamilyway.org/iching/hexagrams/h38/",  Name: "38 - Diverging KUI",   },  //43 101 011
    {   Key: "010100",  url: "http://inthefamilyway.org/iching/hexagrams/h39/",  Name: "39 - Limping/Difficulties JIAN",   },  //20 010 100
    {   Key: "001010",  url: "http://inthefamilyway.org/iching/hexagrams/h40/",  Name: "40 - Deliverance/Liberating JIE",  },  //10 001 010
    {   Key: "100011",  url: "http://inthefamilyway.org/iching/hexagrams/h41/",  Name: "41 - Diminishing SUN",  },  //35 100 011
    {   Key: "110001",  url: "http://inthefamilyway.org/iching/hexagrams/h42/",  Name: "42 - Augumenting YI",  },  //49 110 001
    {   Key: "011111",  url: "http://inthefamilyway.org/iching/hexagrams/h43/",  Name: "43 - Deciding/Breakthrough GUAI",  },  //31 011 111
    {   Key: "111110",  url: "http://inthefamilyway.org/iching/hexagrams/h44/",  Name: "44 - Coupling GOU",  },  //62 111 110
    {   Key: "011000",  url: "http://inthefamilyway.org/iching/hexagrams/h45/",  Name: "45 - Gathering CUI",  },  //24 011 000
    {   Key: "000110",  url: "http://inthefamilyway.org/iching/hexagrams/h46/",  Name: "46 - Ascending SHENG",    },  //6 000 110
    {   Key: "011010",  url: "http://inthefamilyway.org/iching/hexagrams/h47/",  Name: "47 - Confining/Oppression KUN",    },  //26 011 010
    {   Key: "010110",  url: "http://inthefamilyway.org/iching/hexagrams/h48/",  Name: "48 - The Well JING",    },  //22 010 110
    {   Key: "011101",  url: "http://inthefamilyway.org/iching/hexagrams/h49/",  Name: "49 - Skinning/Revolution GE",   },  //29 011 101
    {   Key: "101110",  url: "http://inthefamilyway.org/iching/hexagrams/h50/",  Name: "50 - The Vessel DING",  },  //46 101 110
    {   Key: "001001",  url: "http://inthefamilyway.org/iching/hexagrams/h51/",  Name: "51 - Shake/Groundbreaker ZHEN",   },  //9 001 001
    {   Key: "100100",  url: "http://inthefamilyway.org/iching/hexagrams/h52/",  Name: "52 - Bound/Gatekeeper GEN",   },  //36 100 100
    {   Key: "110100",  url: "http://inthefamilyway.org/iching/hexagrams/h53/",  Name: "53 - Gradual Advance JIAN",    },  //52 110 100
    {   Key: "001011",  url: "http://inthefamilyway.org/iching/hexagrams/h54/",  Name: "54 - Marrying Maiden GUI MEI",   },  //11 001 011
    {   Key: "001101",  url: "http://inthefamilyway.org/iching/hexagrams/h55/",  Name: "55 - Abounding FENG",  },  //13 001 101
    {   Key: "101100",  url: "http://inthefamilyway.org/iching/hexagrams/h56/",  Name: "56 - Sojourning LU",  },  //44 101 100
    {   Key: "110110",  url: "http://inthefamilyway.org/iching/hexagrams/h57/",  Name: "57 - Subtle Penetration/Matchmaker SUN",   },  //54 110 110
    {   Key: "011011",  url: "http://inthefamilyway.org/iching/hexagrams/h58/",  Name: "58 - Opening/Mediator DUI",   },  //27 011 011
    {   Key: "110010",  url: "http://inthefamilyway.org/iching/hexagrams/h59/",  Name: "59 - Dispersing HUAN",  },  //50 110 010
    {   Key: "010011",  url: "http://inthefamilyway.org/iching/hexagrams/h60/",  Name: "60 - Articulating JIE", },  //19 010 011
    {   Key: "110011",  url: "http://inthefamilyway.org/iching/hexagrams/h61/",  Name: "61 - Opened Heart/Connect to Center ZHONG FU",   },  //51 110 011
    {   Key: "001100",  url: "http://inthefamilyway.org/iching/hexagrams/h62/",  Name: "62 - Small Traverses/Flying Bird XIAO GUO",  },  //12 001 100
    {   Key: "010101",  url: "http://inthefamilyway.org/iching/hexagrams/h63/",  Name: "63 - Already Crossing JI JI",    },  //21 010 101
    {   Key: "101010",  url: "http://inthefamilyway.org/iching/hexagrams/h64/",  Name: "64 - Not Yet Crossing WEI JI",   }  //42 101 010
  ] },
  { id: 5, Domain: "https://www.taoistiching.org", Short: "TaoistiChing.org", Hexagrams: [
    {   Key: "111111",  url: "https://www.taoistiching.org/1.html",  Name: "1 - The Creative",      },  //63 111 111
    {   Key: "000000",  url: "https://www.taoistiching.org/2.html",  Name: "2 - Earth",     },  //00 000 000
    {   Key: "010001",  url: "https://www.taoistiching.org/3.html",  Name: "3 - Difficulty",       },  //17 010 001
    {   Key: "100010",  url: "https://www.taoistiching.org/4.html",  Name: "4 - Darkness",     },  //34 100 010
    {   Key: "010111",  url: "https://www.taoistiching.org/5.html",  Name: "5 - Attending",          },  //23 010 111
    {   Key: "111010",  url: "https://www.taoistiching.org/6.html",  Name: "6 - Contention",           },  //58 111 010
    {   Key: "000010",  url: "https://www.taoistiching.org/7.html",  Name: "7 - Army/Discipline",       },  //02 000 010
    {   Key: "010000",  url: "https://www.taoistiching.org/8.html",  Name: "8 - Accord", },  //16 010 000
    {   Key: "110111",  url: "https://www.taoistiching.org/9.html",  Name: "9 - Small Nurturance",  },  //55 110 111
    {   Key: "111011",  url: "https://www.taoistiching.org/10.html",  Name: "10 - Treading",  },  //59 111 011
    {   Key: "000111",  url: "https://www.taoistiching.org/11.html",  Name: "11 - Tranquility",         },  //7 000 111
    {   Key: "111000",  url: "https://www.taoistiching.org/12.html",  Name: "12 - Obstruction",     },  //56 111 000
    {   Key: "111101",  url: "https://www.taoistiching.org/13.html",  Name: "13 - Sameness with People", },  //61 111 101
    {   Key: "101111",  url: "https://www.taoistiching.org/14.html",  Name: "14 - Great Possession",          },  //47 101 111
    {   Key: "000100",  url: "https://www.taoistiching.org/15.html",  Name: "15 - Humility",      },  //4 000 100
    {   Key: "001000",  url: "https://www.taoistiching.org/16.html",  Name: "16 - Joy",   },  //8 001 000
    {   Key: "011001",  url: "https://www.taoistiching.org/17.html",  Name: "17 - Following",   },  //25 011 001
    {   Key: "100110",  url: "https://www.taoistiching.org/18.html",  Name: "18 - Degeneration",    },  //38 100 110
    {   Key: "000011",  url: "https://www.taoistiching.org/19.html",  Name: "19 - Overseeing",  },  //3 000 011
    {   Key: "110000",  url: "https://www.taoistiching.org/20.html",  Name: "20 - Observation",   },  //48 110 000
    {   Key: "101001",  url: "https://www.taoistiching.org/21.html",  Name: "21 - Biting Through",   },  //41 101 001
    {   Key: "100101",  url: "https://www.taoistiching.org/22.html",  Name: "22 - Adornment",   },  //37 100 101
    {   Key: "100000",  url: "https://www.taoistiching.org/23.html",  Name: "23 - Stripping Away",    },  //32 100 000
    {   Key: "000001",  url: "https://www.taoistiching.org/24.html",  Name: "24 - Return",    },  //1 000 001
    {   Key: "111001",  url: "https://www.taoistiching.org/25.html",  Name: "25 - Fidelity",   },  //57 111 001
    {   Key: "100111",  url: "https://www.taoistiching.org/26.html",  Name: "26 - Nuturance of the Great",    },  //39 100 111
    {   Key: "100001",  url: "https://www.taoistiching.org/27.html",  Name: "27 - Nourishment",   },  //33 100 001
    {   Key: "011110",  url: "https://www.taoistiching.org/28.html",  Name: "28 - Excess of the Great",   },  //30 011 110
    {   Key: "010010",  url: "https://www.taoistiching.org/29.html",  Name: "29 - Mastering Pitfals",    },  //18 010 010
    {   Key: "101101",  url: "https://www.taoistiching.org/30.html",  Name: "30 - Fire",   },  //45 101 101
    {   Key: "011100",  url: "https://www.taoistiching.org/31.html",  Name: "31 - Sensitivity",  },  //28 011 100
    {   Key: "001110",  url: "https://www.taoistiching.org/32.html",  Name: "32 - Constancy",   },  //14 001 110
    {   Key: "111100",  url: "https://www.taoistiching.org/33.html",  Name: "33 - Withdrawal",     },  //60 111 100
    {   Key: "001111",  url: "https://www.taoistiching.org/34.html",  Name: "34 - Great Power", },  //15 001 111
    {   Key: "101000",  url: "https://www.taoistiching.org/35.html",  Name: "35 - Advance",  },  //40 101 000
    {   Key: "000101",  url: "https://www.taoistiching.org/36.html",  Name: "36 - Concealment of illumination",    },  //5 000 101
    {   Key: "110101",  url: "https://www.taoistiching.org/37.html",  Name: "37 - People in the Home",    },  //53 110 101
    {   Key: "101011",  url: "https://www.taoistiching.org/38.html",  Name: "38 - Disharmony",   },  //43 101 011
    {   Key: "010100",  url: "https://www.taoistiching.org/39.html",  Name: "39 - Halting",   },  //20 010 100
    {   Key: "001010",  url: "https://www.taoistiching.org/40.html",  Name: "40 - Liberation",  },  //10 001 010
    {   Key: "100011",  url: "https://www.taoistiching.org/41.html",  Name: "41 - Reduction",  },  //35 100 011
    {   Key: "110001",  url: "https://www.taoistiching.org/42.html",  Name: "42 - Increase",  },  //49 110 001
    {   Key: "011111",  url: "https://www.taoistiching.org/43.html",  Name: "43 - Parting",  },  //31 011 111
    {   Key: "111110",  url: "https://www.taoistiching.org/44.html",  Name: "44 - Meeting",  },  //62 111 110
    {   Key: "011000",  url: "https://www.taoistiching.org/45.html",  Name: "45 - Gathering",  },  //24 011 000
    {   Key: "000110",  url: "https://www.taoistiching.org/46.html",  Name: "46 - Rising",    },  //6 000 110
    {   Key: "011010",  url: "https://www.taoistiching.org/47.html",  Name: "47 - Exhaustion",    },  //26 011 010
    {   Key: "010110",  url: "https://www.taoistiching.org/48.html",  Name: "48 - The Well",    },  //22 010 110
    {   Key: "011101",  url: "https://www.taoistiching.org/49.html",  Name: "49 - Revolution",   },  //29 011 101
    {   Key: "101110",  url: "https://www.taoistiching.org/50.html",  Name: "50 - The Cauldron",  },  //46 101 110
    {   Key: "001001",  url: "https://www.taoistiching.org/51.html",  Name: "51 - Thunder",   },  //9 001 001
    {   Key: "100100",  url: "https://www.taoistiching.org/52.html",  Name: "52 - Mountain",   },  //36 100 100
    {   Key: "110100",  url: "https://www.taoistiching.org/53.html",  Name: "53 - Gradual Progress",    },  //52 110 100
    {   Key: "001011",  url: "https://www.taoistiching.org/54.html",  Name: "54 - Making a Young Girl Marry",   },  //11 001 011
    {   Key: "001101",  url: "https://www.taoistiching.org/55.html",  Name: "55 - Abundance",  },  //13 001 101
    {   Key: "101100",  url: "https://www.taoistiching.org/56.html",  Name: "56 - Travel",  },  //44 101 100
    {   Key: "110110",  url: "https://www.taoistiching.org/57.html",  Name: "57 - Wind",   },  //54 110 110
    {   Key: "011011",  url: "https://www.taoistiching.org/58.html",  Name: "58 - Joy",   },  //27 011 011
    {   Key: "110010",  url: "https://www.taoistiching.org/59.html",  Name: "59 - Dispersal",  },  //50 110 010
    {   Key: "010011",  url: "https://www.taoistiching.org/60.html",  Name: "60 - Discipline", },  //19 010 011
    {   Key: "110011",  url: "https://www.taoistiching.org/61.html",  Name: "61 - Faithfulness in the Center",   },  //51 110 011
    {   Key: "001100",  url: "https://www.taoistiching.org/62.html",  Name: "62 - Predominance of the Small",  },  //12 001 100
    {   Key: "010101",  url: "https://www.taoistiching.org/63.html",  Name: "63 - Settled",    },  //21 010 101
    {   Key: "101010",  url: "https://www.taoistiching.org/64.html",  Name: "64 - Unsettled",   }  //42 101 010
  ] }
];
