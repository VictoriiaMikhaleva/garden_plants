/**
 * РљР°С‚Р°Р»РѕРі СѓР»РёС‡РЅС‹С… СЂР°СЃС‚РµРЅРёР№ РїРѕ С†РІРµС‚Сѓ вЂ” РІ СЃРѕР°РІС‚РѕСЂСЃС‚РІРµ СЃ Р»Р°РЅРґС€Р°С„С‚РЅС‹Рј РґРёР·Р°Р№РЅРµСЂРѕРј РђРЅРЅРѕР№ РљРѕР»РµСЃРѕРІРѕР№.
 * sun: С€РєР°Р»Р° 1вЂ“5 (1 вЂ” С‚РµРЅСЊ, 5 вЂ” РїРѕР»РЅРѕРµ СЃРѕР»РЅС†Рµ).
 */
const GARDEN_RAW_PLANTS = [
  {
    "id": 1,
    "color": "white",
    "nameRu": "Р›Р°РЅРґС‹С€Рё",
    "height": "15вЂ“30",
    "bloom": "5вЂ“5",
    "sun": "2вЂ“5",
    "bloomNote": "РјР°Р№",
    "photo": "assets/plants/1.webp",
    "photoSource": "custom"
  },
  {
    "id": 2,
    "color": "white",
    "nameRu": "РќР°СЂС†РёСЃСЃ",
    "height": "15вЂ“50",
    "bloom": "4вЂ“5",
    "sun": "2вЂ“5",
    "bloomNote": "РєРѕРЅРµС† Р°РїСЂРµР»СЏ вЂ” РЅР°С‡Р°Р»Рѕ РјР°СЏ",
    "photo": "assets/plants/2.webp",
    "photoSource": "custom"
  },
  {
    "id": 3,
    "color": "white",
    "nameRu": "РџСЂРёРјСѓР»Р°",
    "height": "10вЂ“25",
    "bloom": "4вЂ“4",
    "sun": "4вЂ“5",
    "bloomNote": "Р°РїСЂРµР»СЊ",
    "photo": "assets/plants/3.webp",
    "photoSource": "custom"
  },
  {
    "id": 4,
    "color": "white",
    "nameRu": "РђРЅРµРјРѕРЅР°",
    "height": "15вЂ“30",
    "bloom": "4вЂ“5",
    "sun": "3вЂ“4",
    "bloomNote": "Р°РїСЂРµР»СЊ вЂ” РјР°Р№",
    "photo": "assets/plants/4.webp",
    "photoSource": "custom"
  },
  {
    "id": 5,
    "color": "white",
    "nameRu": "РџРёРѕРЅ",
    "height": "60вЂ“100",
    "bloom": "6вЂ“7",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” РёСЋР»СЊ",
    "photo": "assets/plants/5.webp",
    "photoSource": "custom"
  },
  {
    "id": 6,
    "color": "white",
    "nameRu": "РСЂРёСЃ",
    "height": "40вЂ“80",
    "bloom": "5вЂ“7",
    "sun": "4вЂ“5",
    "bloomNote": "РјР°Р№ вЂ” РёСЋР»СЊ",
    "photo": "assets/plants/6.webp",
    "photoSource": "custom"
  },
  {
    "id": 7,
    "color": "white",
    "nameRu": "РҐСЂРёР·Р°РЅС‚РµРјР°",
    "height": "35вЂ“70",
    "bloom": "8вЂ“10",
    "sun": "4вЂ“5",
    "bloomNote": "Р°РІРіСѓСЃС‚ вЂ” РѕСЃРµРЅСЊ",
    "photo": "assets/plants/7.webp",
    "photoSource": "custom"
  },
  {
    "id": 8,
    "color": "white",
    "nameRu": "Р“Р»Р°РґРёРѕР»СѓСЃ",
    "height": "70вЂ“100",
    "bloom": "7вЂ“9",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋР»СЊ вЂ” СЃРµРЅС‚СЏР±СЂСЊ",
    "photo": "assets/plants/8.webp",
    "photoSource": "custom"
  },
  {
    "id": 9,
    "color": "white",
    "nameRu": "Р’РёРѕР»Р°",
    "height": "15вЂ“30",
    "bloom": "3вЂ“5",
    "sun": "2вЂ“5",
    "bloomNote": "СЃРµСЂРµРґРёРЅР° РјР°СЂС‚Р° вЂ” РєРѕРЅРµС† РјР°СЏ",
    "photo": "assets/plants/9.webp",
    "photoSource": "custom"
  },
  {
    "id": 10,
    "color": "white",
    "nameRu": "Р”РµР»СЊС„РёРЅРёСѓРј",
    "height": "100вЂ“200",
    "bloom": "6вЂ“6",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋРЅСЊ",
    "photo": "assets/plants/10.webp",
    "photoSource": "custom"
  },
  {
    "id": 11,
    "color": "white",
    "nameRu": "РќРёРІСЏРЅРёРє",
    "height": "80вЂ“100",
    "bloom": "5вЂ“8",
    "sun": "4вЂ“5",
    "bloomNote": "РјР°Р№ Рё Р°РІРіСѓСЃС‚",
    "photo": "assets/plants/11.webp",
    "photoSource": "custom"
  },
  {
    "id": 12,
    "color": "white",
    "nameRu": "РђСЃС‚РёР»СЊР±Р°",
    "height": "100вЂ“150",
    "bloom": "6вЂ“8",
    "sun": "1вЂ“3",
    "bloomNote": "РёСЋРЅСЊ вЂ” Р°РІРіСѓСЃС‚",
    "photo": "assets/plants/12.webp",
    "photoSource": "custom"
  },
  {
    "id": 13,
    "color": "white",
    "nameRu": "Р¤Р»РѕРєСЃ С€РёР»РѕРІРёРґРЅС‹Р№",
    "height": "20вЂ“35",
    "bloom": "6вЂ“7",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” РёСЋР»СЊ",
    "photo": "assets/plants/13.webp",
    "photoSource": "custom"
  },
  {
    "id": 14,
    "color": "white",
    "nameRu": "РЇСЃРєРѕР»РєР°",
    "height": "10вЂ“15",
    "bloom": "6вЂ“6",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋРЅСЊ",
    "photo": "assets/plants/14.webp",
    "photoSource": "custom"
  },
  {
    "id": 15,
    "color": "white",
    "nameRu": "РўСЋР»СЊРїР°РЅ",
    "height": "40вЂ“60",
    "bloom": "4вЂ“5",
    "sun": "4вЂ“5",
    "bloomNote": "РєРѕРЅРµС† Р°РїСЂРµР»СЏ вЂ” РЅР°С‡Р°Р»Рѕ РјР°СЏ",
    "photo": "assets/plants/15.webp",
    "photoSource": "custom"
  },
  {
    "id": 16,
    "color": "blue",
    "nameRu": "РћРІСЃСЏРЅРёС†Р° РіРѕР»СѓР±Р°СЏ",
    "height": "30вЂ“40",
    "bloom": "6вЂ“7",
    "sun": "4вЂ“5",
    "bloomNote": "Р»РµС‚РѕРј РґРµРєРѕСЂР°С‚РёРІРЅР° Р»РёСЃС‚РІРѕР№",
    "photo": "assets/plants/16.webp",
    "photoSource": "custom"
  },
  {
    "id": 17,
    "color": "blue",
    "nameRu": "Р­РґРµР»СЊРІРµР№СЃ Р°Р»СЊРїРёР№СЃРєРёР№",
    "height": "20вЂ“25",
    "bloom": "7вЂ“7",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋР»СЊ, Р±РµР»С‹Рµ С†РІРµС‚РєРё",
    "photo": "assets/plants/17.webp",
    "photoSource": "custom"
  },
  {
    "id": 18,
    "color": "blue",
    "nameRu": "РћС‡РёС‚РѕРє Р·РёР±РѕР»СЊРґР°",
    "height": "10вЂ“15",
    "bloom": "7вЂ“8",
    "sun": "4вЂ“5",
    "bloomNote": "Р»РµС‚РѕРј",
    "photo": "assets/plants/18.webp",
    "photoSource": "custom"
  },
  {
    "id": 19,
    "color": "blue",
    "nameRu": "РџРѕР»С‹РЅСЊ РЎС‚РµР»Р»РµСЂР°",
    "height": "45вЂ“50",
    "bloom": "7вЂ“8",
    "sun": "4вЂ“5",
    "bloomNote": "Р»РµС‚РѕРј",
    "photo": "assets/plants/19.webp",
    "photoSource": "custom"
  },
  {
    "id": 20,
    "color": "blue",
    "nameRu": "РџРѕР»С‹РЅСЊ РЁРјРёРґС‚Р°",
    "height": "20вЂ“30",
    "bloom": "7вЂ“8",
    "sun": "4вЂ“5",
    "bloomNote": "Р»РµС‚РѕРј",
    "photo": "assets/plants/20.webp",
    "photoSource": "custom"
  },
  {
    "id": 21,
    "color": "blue",
    "nameRu": "Р¦РёРЅРµСЂР°СЂРёСЏ РїСЂРёРјРѕСЂСЃРєР°СЏ",
    "height": "10вЂ“50",
    "bloom": "6вЂ“8",
    "sun": "4вЂ“5",
    "bloomNote": "Р»РµС‚РѕРј",
    "photo": "assets/plants/21.webp",
    "photoSource": "custom"
  },
  {
    "id": 22,
    "color": "blue",
    "nameRu": "Р§РёСЃС‚РµС† РІРёР·Р°РЅС‚РёР№СЃРєРёР№",
    "height": "30вЂ“60",
    "bloom": "5вЂ“8",
    "sun": "4вЂ“5",
    "bloomNote": "РјР°Р№ вЂ” Р°РІРіСѓСЃС‚",
    "photo": "assets/plants/22.webp",
    "photoSource": "custom"
  },
  {
    "id": 23,
    "color": "blue",
    "nameRu": "Р‘СЂСѓРЅРЅРµСЂР° РєСЂСѓРїРЅРѕР»РёСЃС‚РЅР°СЏ",
    "height": "20вЂ“30",
    "bloom": "4вЂ“5",
    "sun": "2вЂ“4",
    "bloomNote": "РєРѕРЅРµС† Р°РїСЂРµР»СЏ вЂ” РЅР°С‡Р°Р»Рѕ РјР°СЏ",
    "photo": "assets/plants/23.webp",
    "photoSource": "custom"
  },
  {
    "id": 24,
    "color": "blue",
    "nameRu": "РђРЅС‚РµРЅРЅР°СЂРёСЏ (РєРѕС€Р°С‡СЊСЏ Р»Р°РїРєР°)",
    "height": "10вЂ“30",
    "bloom": "5вЂ“6",
    "sun": "4вЂ“5",
    "bloomNote": "РјР°Р№ вЂ” РёСЋРЅСЊ, Р±РµР»С‹Рµ С†РІРµС‚РєРё",
    "photo": "assets/plants/24.webp",
    "photoSource": "custom"
  },
  {
    "id": 25,
    "color": "blue",
    "nameRu": "Р­Р»РёРјСѓСЃ РїРµСЃС‡Р°РЅС‹Р№",
    "height": "60вЂ“100",
    "bloom": "6вЂ“7",
    "sun": "2вЂ“5",
    "bloomNote": "Р»РµС‚РѕРј",
    "photo": "assets/plants/25.webp",
    "photoSource": "custom"
  },
  {
    "id": 26,
    "color": "blue",
    "nameRu": "РЎРёРЅРµРіРѕР»РѕРІРЅРёРє РіРёРіР°РЅС‚СЃРєРёР№",
    "height": "150вЂ“180",
    "bloom": "6вЂ“9",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” РєРѕРЅРµС† СЃРµРЅС‚СЏР±СЂСЏ",
    "photo": "assets/plants/26.webp",
    "photoSource": "custom"
  },
  {
    "id": 27,
    "color": "blue",
    "nameRu": "РҐРѕСЃС‚Р° Р±РµР»РѕРѕРєР°Р№РјР»С‘РЅРЅР°СЏ",
    "height": "40вЂ“50",
    "bloom": "7вЂ“8",
    "sun": "1вЂ“2",
    "bloomNote": "РёСЋР»СЊ вЂ” Р°РІРіСѓСЃС‚, С„РёРѕР»РµС‚РѕРІС‹Рµ С†РІРµС‚С‹",
    "photo": "assets/plants/27.webp",
    "photoSource": "custom"
  },
  {
    "id": 28,
    "color": "blue",
    "nameRu": "РҐРѕСЃС‚Р° Р—РёР±РѕР»СЊРґР°",
    "height": "30вЂ“40",
    "bloom": "7вЂ“7",
    "sun": "1вЂ“2",
    "bloomNote": "РёСЋР»СЊ",
    "photo": "assets/plants/28.webp",
    "photoSource": "custom"
  },
  {
    "id": 29,
    "color": "blue",
    "nameRu": "РҐРѕСЃС‚Р° РєРѕСЂРѕР»РµРІСЃРєР°СЏ",
    "height": "60вЂ“80",
    "bloom": "8вЂ“10",
    "sun": "1вЂ“2",
    "bloomNote": "РєРѕРЅРµС† Р»РµС‚Р° вЂ” Р·Р°РјРѕСЂРѕР·РєРё",
    "photo": "assets/plants/29.webp",
    "photoSource": "custom"
  },
  {
    "id": 30,
    "color": "blue",
    "nameRu": "РҐРѕСЃС‚Р° РІР·РґСѓС‚Р°СЏ",
    "height": "40вЂ“50",
    "bloom": "7вЂ“8",
    "sun": "1вЂ“2",
    "bloomNote": "РёСЋР»СЊ вЂ” Р°РІРіСѓСЃС‚, СЃРёСЂРµРЅРµРІС‹Рµ С†РІРµС‚С‹",
    "photo": "assets/plants/30.webp",
    "photoSource": "custom"
  },
  {
    "id": 31,
    "color": "blue",
    "nameRu": "РҐРѕСЃС‚Р° Canadian Blue",
    "height": "30вЂ“40",
    "bloom": "7вЂ“8",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋР»СЊ вЂ” Р°РІРіСѓСЃС‚",
    "photo": "assets/plants/31.webp",
    "photoSource": "custom"
  },
  {
    "id": 32,
    "color": "blue",
    "nameRu": "РҐРѕСЃС‚Р° РїРѕРґРѕСЂРѕР¶РЅР°СЏ",
    "height": "80вЂ“100",
    "bloom": "8вЂ“8",
    "sun": "1вЂ“3",
    "bloomNote": "Р°РІРіСѓСЃС‚",
    "photo": "assets/plants/32.webp",
    "photoSource": "custom"
  },
  {
    "id": 33,
    "color": "blue",
    "nameRu": "РҐРѕСЃС‚Р° Р¤РѕСЂС‡СѓРЅР° В«РџР°С‚СЂРёРѕС‚В»",
    "height": "40вЂ“45",
    "bloom": "7вЂ“8",
    "sun": "1вЂ“4",
    "bloomNote": "СЃРµСЂРµРґРёРЅР° РёСЋР»СЏ вЂ” Р°РІРіСѓСЃС‚, Р»Р°РІР°РЅРґРѕРІС‹Рµ С†РІРµС‚С‹",
    "photo": "assets/plants/33.webp",
    "photoSource": "custom"
  },
  {
    "id": 34,
    "color": "purple",
    "nameRu": "Р›СЋРїРёРЅ",
    "height": "80вЂ“120",
    "bloom": "6вЂ“6",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋРЅСЊ",
    "photo": "assets/plants/34.webp",
    "photoSource": "custom"
  },
  {
    "id": 35,
    "color": "purple",
    "nameRu": "РСЂРёСЃ РіРµСЂРјР°РЅСЃРєРёР№",
    "height": "60вЂ“100",
    "bloom": "5вЂ“6",
    "sun": "4вЂ“5",
    "bloomNote": "РјР°Р№ вЂ” РёСЋРЅСЊ",
    "photo": "assets/plants/35.webp",
    "photoSource": "custom"
  },
  {
    "id": 36,
    "color": "purple",
    "nameRu": "РђСЃС‚СЂР° РЅРѕРІРѕР°РЅРіР»РёР№СЃРєР°СЏ",
    "height": "60вЂ“80",
    "bloom": "9вЂ“10",
    "sun": "4вЂ“5",
    "bloomNote": "СЃРµРЅС‚СЏР±СЂСЊ вЂ” РѕРєС‚СЏР±СЂСЊ",
    "photo": "assets/plants/36.webp",
    "photoSource": "custom"
  },
  {
    "id": 37,
    "color": "purple",
    "nameRu": "Р‘РµР·РІСЂРµРјРµРЅРЅРёРє",
    "height": "15вЂ“20",
    "bloom": "9вЂ“10",
    "sun": "4вЂ“5",
    "bloomNote": "СЃРµРЅС‚СЏР±СЂСЊ вЂ” РѕРєС‚СЏР±СЂСЊ",
    "photo": "assets/plants/37.webp",
    "photoSource": "custom"
  },
  {
    "id": 38,
    "color": "purple",
    "nameRu": "РђСЃС‚РёР»СЊР±Р° В«Purple RainВ» / В«Purple LanceВ»",
    "height": "100вЂ“150",
    "bloom": "7вЂ“8",
    "sun": "1вЂ“3",
    "bloomNote": "РёСЋР»СЊ вЂ” Р°РІРіСѓСЃС‚",
    "photo": "assets/plants/38.webp",
    "photoSource": "custom"
  },
  {
    "id": 40,
    "color": "purple",
    "nameRu": "Р”РµР»СЊС„РёРЅРёСѓРј",
    "height": "80вЂ“120",
    "bloom": "6вЂ“6",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋРЅСЊ",
    "photo": "assets/plants/40.webp",
    "photoSource": "custom"
  },
  {
    "id": 41,
    "color": "purple",
    "nameRu": "РљРѕР»РѕРєРѕР»СЊС‡РёРє РєСЂР°РїРёРІРѕР»РёСЃС‚РЅС‹Р№",
    "height": "70вЂ“100",
    "bloom": "6вЂ“8",
    "sun": "1вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” Р°РІРіСѓСЃС‚",
    "photo": "assets/plants/41.webp",
    "photoSource": "custom"
  },
  {
    "id": 42,
    "color": "purple",
    "nameRu": "РљСЂРѕРєСѓСЃ",
    "height": "8вЂ“10",
    "bloom": "3вЂ“5",
    "sun": "4вЂ“5",
    "bloomNote": "РјР°СЂС‚ вЂ” РјР°Р№",
    "photo": "assets/plants/42.webp",
    "photoSource": "custom"
  },
  {
    "id": 43,
    "color": "purple",
    "nameRu": "Р¤Р»РѕРєСЃ РјРµС‚РµР»СЊС‡Р°С‚С‹Р№",
    "height": "80вЂ“90",
    "bloom": "6вЂ“8",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” Р°РІРіСѓСЃС‚",
    "photo": "assets/plants/43.webp",
    "photoSource": "custom"
  },
  {
    "id": 44,
    "color": "purple",
    "nameRu": "РҐСЂРёР·Р°РЅС‚РµРјР°",
    "height": "50вЂ“70",
    "bloom": "8вЂ“9",
    "sun": "4вЂ“5",
    "bloomNote": "Р°РІРіСѓСЃС‚ вЂ” СЃРµРЅС‚СЏР±СЂСЊ",
    "photo": "assets/plants/44.webp",
    "photoSource": "custom"
  },
  {
    "id": 45,
    "color": "purple",
    "nameRu": "Р“РµРѕСЂРіРёРЅР°",
    "height": "50вЂ“200",
    "bloom": "7вЂ“10",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋР»СЊ вЂ” РѕСЃРµРЅСЊ",
    "photo": "assets/plants/45.webp",
    "photoSource": "custom"
  },
  {
    "id": 46,
    "color": "purple",
    "nameRu": "Р“Р»Р°РґРёРѕР»СѓСЃ",
    "height": "70вЂ“100",
    "bloom": "7вЂ“8",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋР»СЊ вЂ” Р°РІРіСѓСЃС‚",
    "photo": "assets/plants/46.webp",
    "photoSource": "custom"
  },
  {
    "id": 47,
    "color": "purple",
    "nameRu": "РђРєРѕРЅРёС‚",
    "height": "30вЂ“40",
    "bloom": "7вЂ“10",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋР»СЊ вЂ” Р·Р°РјРѕСЂРѕР·РєРё",
    "photo": "assets/plants/47.webp",
    "photoSource": "custom"
  },
  {
    "id": 48,
    "color": "purple",
    "nameRu": "Р“РµСЃРїРµСЂРёСЃ",
    "height": "50вЂ“60",
    "bloom": "5вЂ“8",
    "sun": "1вЂ“3",
    "bloomNote": "РјР°Р№ вЂ” Р°РІРіСѓСЃС‚",
    "photo": "assets/plants/48.webp",
    "photoSource": "custom"
  },
  {
    "id": 49,
    "color": "purple",
    "nameRu": "РљР»РµРјР°С‚РёСЃ",
    "height": "100вЂ“150",
    "bloom": "5вЂ“9",
    "sun": "4вЂ“5",
    "bloomNote": "РјР°Р№ вЂ” СЃРµРЅС‚СЏР±СЂСЊ",
    "photo": "assets/plants/49.webp",
    "photoSource": "custom"
  },
  {
    "id": 50,
    "color": "purple",
    "nameRu": "Р“РёР°С†РёРЅС‚ Royal Novi/ Amethyst/Bismarck",
    "height": "20вЂ“30",
    "bloom": "3вЂ“4",
    "sun": "4вЂ“5",
    "bloomNote": "РјР°СЂС‚ вЂ” Р°РїСЂРµР»СЊ",
    "photo": "assets/plants/50.webp",
    "photoSource": "custom"
  },
  {
    "id": 53,
    "color": "purple",
    "nameRu": "Р›РёР»РёСЏ Purple Lady/ Purple Prince",
    "height": "40вЂ“150",
    "bloom": "8вЂ“8",
    "sun": "4вЂ“5",
    "bloomNote": "Р°РІРіСѓСЃС‚",
    "photo": "assets/plants/53.webp",
    "photoSource": "custom"
  },
  {
    "id": 55,
    "color": "sky",
    "nameRu": "РђРЅРµРјРѕРЅР° (РІРµС‚СЂРµРЅРёС†Р°)",
    "height": "20вЂ“30",
    "bloom": "4вЂ“11",
    "sun": "2вЂ“4",
    "bloomNote": "Р°РїСЂРµР»СЊ вЂ” РЅРѕСЏР±СЂСЊ",
    "photo": "assets/plants/55.webp",
    "photoSource": "custom"
  },
  {
    "id": 56,
    "color": "sky",
    "nameRu": "РђСЃС‚СЂР° РѕСЃРµРЅРЅСЏСЏ",
    "height": "30вЂ“50",
    "bloom": "8вЂ“11",
    "sun": "4вЂ“5",
    "bloomNote": "РєРѕРЅРµС† Р°РІРіСѓСЃС‚Р° вЂ” РЅРѕСЏР±СЂСЊ",
    "photo": "assets/plants/56.webp",
    "photoSource": "custom"
  },
  {
    "id": 57,
    "color": "sky",
    "nameRu": "Р‘Р°СЂРІРёРЅРѕРє РјР°Р»С‹Р№",
    "height": "20вЂ“40",
    "bloom": "4вЂ“10",
    "sun": "1вЂ“2",
    "bloomNote": "Р°РїСЂРµР»СЊ вЂ” РґРѕ С…РѕР»РѕРґРѕРІ",
    "photo": "assets/plants/57.webp",
    "photoSource": "custom"
  },
  {
    "id": 58,
    "color": "sky",
    "nameRu": "Р’Р°СЃРёР»С‘Рє РјРЅРѕРіРѕР»РµС‚РЅРёР№",
    "height": "20вЂ“30",
    "bloom": "6вЂ“10",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” РґРѕ Р·Р°РјРѕСЂРѕР·РєРѕРІ"
  },
  {
    "id": 59,
    "color": "sky",
    "nameRu": "Р’РµСЂРѕРЅРёРєР° РґСѓР±СЂР°РІРЅР°СЏ",
    "height": "15вЂ“45",
    "bloom": "4вЂ“7",
    "sun": "2вЂ“5",
    "bloomNote": "Р°РїСЂРµР»СЊ вЂ” РёСЋР»СЊ",
    "photo": "assets/plants/59.webp",
    "photoSource": "custom"
  },
  {
    "id": 60,
    "color": "sky",
    "nameRu": "Р“РёР°С†РёРЅС‚",
    "height": "20вЂ“30",
    "bloom": "3вЂ“5",
    "sun": "4вЂ“5",
    "bloomNote": "РјР°СЂС‚ вЂ” РјР°Р№",
    "photo": "assets/plants/60.webp",
    "photoSource": "custom"
  },
  {
    "id": 61,
    "color": "sky",
    "nameRu": "РСЂРёСЃ",
    "height": "40вЂ“60",
    "bloom": "5вЂ“6",
    "sun": "4вЂ“5",
    "bloomNote": "РјР°Р№ вЂ” РёСЋРЅСЊ",
    "photo": "assets/plants/61.webp",
    "photoSource": "custom"
  },
  {
    "id": 62,
    "color": "sky",
    "nameRu": "Р”РµР»СЊС„РёРЅРёСѓРј",
    "height": "150вЂ“200",
    "bloom": "6вЂ“6",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋРЅСЊ",
    "photo": "assets/plants/62.webp",
    "photoSource": "custom"
  },
  {
    "id": 63,
    "color": "sky",
    "nameRu": "Р–РёРІСѓС‡РєР°",
    "height": "10вЂ“20",
    "bloom": "5вЂ“10",
    "sun": "4вЂ“5",
    "bloomNote": "РјР°Р№ вЂ” РїРѕР·РґРЅСЏСЏ РѕСЃРµРЅСЊ",
    "photo": "assets/plants/63.webp",
    "photoSource": "custom"
  },
  {
    "id": 64,
    "color": "sky",
    "nameRu": "РСЃСЃРѕРї",
    "height": "20вЂ“50",
    "bloom": "7вЂ“10",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋР»СЊ вЂ” РѕРєС‚СЏР±СЂСЊ",
    "photo": "assets/plants/64.webp",
    "photoSource": "custom"
  },
  {
    "id": 65,
    "color": "sky",
    "nameRu": "РљР»РµРјР°С‚РёСЃ",
    "height": "100вЂ“150",
    "bloom": "5вЂ“9",
    "sun": "4вЂ“5",
    "bloomNote": "РјР°Р№ вЂ” СЃРµРЅС‚СЏР±СЂСЊ",
    "photo": "assets/plants/65.webp",
    "photoSource": "custom"
  },
  {
    "id": 66,
    "color": "sky",
    "nameRu": "Р›СЋРїРёРЅ",
    "height": "80вЂ“120",
    "bloom": "6вЂ“6",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋРЅСЊ",
    "photo": "assets/plants/66.webp",
    "photoSource": "custom"
  },
  {
    "id": 67,
    "color": "sky",
    "nameRu": "Лён",
    "height": "40–60",
    "bloom": "6–8",
    "sun": "4–5",
    "bloomNote": "середина июня — середина августа",
    "photo": "assets/plants/67.webp",
    "photoSource": "custom"
  },
  {
    "id": 68,
    "color": "yellow",
    "nameRu": "РњСѓСЃРєР°СЂРё",
    "height": "10вЂ“30",
    "bloom": "4вЂ“4",
    "sun": "2вЂ“5",
    "bloomNote": "Р°РїСЂРµР»СЊ"
  },
  {
    "id": 69,
    "color": "yellow",
    "nameRu": "РњРµРґСѓРЅРёС†Р°",
    "height": "10вЂ“50",
    "bloom": "5вЂ“5",
    "sun": "1вЂ“3",
    "bloomNote": "СЃРµСЂРµРґРёРЅР° РјР°СЏ"
  },
  {
    "id": 70,
    "color": "sky",
    "nameRu": "РќРµР·Р°Р±СѓРґРєР°",
    "height": "10вЂ“50",
    "bloom": "5вЂ“6",
    "sun": "1вЂ“3",
    "bloomNote": "РјР°Р№ вЂ” СЃРµСЂРµРґРёРЅР° РёСЋРЅСЏ"
  },
  {
    "id": 71,
    "color": "yellow",
    "nameRu": "РџРµС‡РµРЅРѕС‡РЅРёС†Р°",
    "height": "15вЂ“25",
    "bloom": "4вЂ“5",
    "sun": "1вЂ“5",
    "bloomNote": "Р°РїСЂРµР»СЊ вЂ” РјР°Р№"
  },
  {
    "id": 72,
    "color": "yellow",
    "nameRu": "РџСЂРѕР»РµСЃРєР°",
    "height": "30вЂ“35",
    "bloom": "4вЂ“5",
    "sun": "2вЂ“5",
    "bloomNote": "РєРѕРЅРµС† Р°РїСЂРµР»СЏ вЂ” РјР°Р№"
  },
  {
    "id": 73,
    "color": "yellow",
    "nameRu": "РџР»Р°С‚РёРєРѕРґРѕРЅ",
    "height": "15вЂ“60",
    "bloom": "7вЂ“8",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋР»СЊ вЂ” Р°РІРіСѓСЃС‚"
  },
  {
    "id": 74,
    "color": "yellow",
    "nameRu": "РЎРёРЅСЋС…Р° РіРѕР»СѓР±Р°СЏ",
    "height": "60вЂ“80",
    "bloom": "6вЂ“7",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” РёСЋР»СЊ"
  },
  {
    "id": 75,
    "color": "yellow",
    "nameRu": "Р¤Р»РѕРєСЃ СЂР°СЃС‚РѕРїС‹СЂРµРЅРЅС‹Р№",
    "height": "25вЂ“30",
    "bloom": "5вЂ“6",
    "sun": "2вЂ“5",
    "bloomNote": "СЃРµСЂРµРґРёРЅР° РјР°СЏ вЂ” РёСЋРЅСЊ"
  },
  {
    "id": 76,
    "color": "yellow",
    "nameRu": "РҐРёРѕРЅРѕРґРѕРєСЃР° Р›СЋС†РёР»РёРё",
    "height": "10вЂ“20",
    "bloom": "3вЂ“4",
    "sun": "2вЂ“5",
    "bloomNote": "РјР°СЂС‚ вЂ” Р°РїСЂРµР»СЊ"
  },
  {
    "id": 77,
    "color": "yellow",
    "nameRu": "РЁР°Р»С„РµР№ Р»СѓРіРѕРІРѕР№",
    "height": "30вЂ“60",
    "bloom": "6вЂ“9",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” СЃРµРЅС‚СЏР±СЂСЊ"
  },
  {
    "id": 78,
    "color": "orange",
    "nameRu": "Р‘Р°СЂС…Р°С‚С†С‹",
    "height": "20вЂ“30",
    "bloom": "5вЂ“6",
    "sun": "2вЂ“5",
    "bloomNote": "РјР°Р№ вЂ” РёСЋРЅСЊ"
  },
  {
    "id": 79,
    "color": "orange",
    "nameRu": "Р’РёРѕР»Р°",
    "height": "15вЂ“30",
    "bloom": "3вЂ“5",
    "sun": "2вЂ“5",
    "bloomNote": "СЃРµСЂРµРґРёРЅР° РјР°СЂС‚Р° вЂ” РєРѕРЅРµС† РјР°СЏ"
  },
  {
    "id": 80,
    "color": "orange",
    "nameRu": "РўСЋР»СЊРїР°РЅ",
    "height": "40вЂ“60",
    "bloom": "4вЂ“5",
    "sun": "4вЂ“5",
    "bloomNote": "РєРѕРЅРµС† Р°РїСЂРµР»СЏ вЂ” РЅР°С‡Р°Р»Рѕ РјР°СЏ"
  },
  {
    "id": 81,
    "color": "orange",
    "nameRu": "РќР°СЂС†РёСЃСЃ",
    "height": "15вЂ“50",
    "bloom": "4вЂ“5",
    "sun": "2вЂ“5",
    "bloomNote": "РєРѕРЅРµС† Р°РїСЂРµР»СЏ вЂ” РЅР°С‡Р°Р»Рѕ РјР°СЏ"
  },
  {
    "id": 82,
    "color": "orange",
    "nameRu": "Р–С‘Р»С‚С‹Рµ СЂРѕРјР°С€РєРё",
    "height": "25вЂ“100",
    "bloom": "4вЂ“10",
    "sun": "4вЂ“5",
    "bloomNote": "Р°РїСЂРµР»СЊ вЂ” РєРѕРЅРµС† РѕСЃРµРЅРё"
  },
  {
    "id": 83,
    "color": "orange",
    "nameRu": "Р›РёР»РёСЏ",
    "height": "40вЂ“150",
    "bloom": "7вЂ“8",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋР»СЊ вЂ” Р°РІРіСѓСЃС‚"
  },
  {
    "id": 84,
    "color": "orange",
    "nameRu": "РҐСЂРёР·Р°РЅС‚РµРјР°",
    "height": "35вЂ“70",
    "bloom": "8вЂ“10",
    "sun": "4вЂ“5",
    "bloomNote": "Р°РІРіСѓСЃС‚ вЂ” РѕСЃРµРЅСЊ"
  },
  {
    "id": 85,
    "color": "orange",
    "nameRu": "РђСЃС‚СЂР°",
    "height": "30вЂ“70",
    "bloom": "9вЂ“11",
    "sun": "4вЂ“5",
    "bloomNote": "СЃРµРЅС‚СЏР±СЂСЊ вЂ” РЅРѕСЏР±СЂСЊ"
  },
  {
    "id": 86,
    "color": "orange",
    "nameRu": "Р“Р»Р°РґРёРѕР»СѓСЃ",
    "height": "80вЂ“150",
    "bloom": "7вЂ“8",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋР»СЊ вЂ” Р°РІРіСѓСЃС‚"
  },
  {
    "id": 87,
    "color": "orange",
    "nameRu": "РСЂРёСЃ",
    "height": "120вЂ“180",
    "bloom": "5вЂ“6",
    "sun": "4вЂ“5",
    "bloomNote": "РјР°Р№ вЂ” РёСЋРЅСЊ"
  },
  {
    "id": 88,
    "color": "orange",
    "nameRu": "Р“РёР°С†РёРЅС‚",
    "height": "10вЂ“50",
    "bloom": "3вЂ“5",
    "sun": "4вЂ“5",
    "bloomNote": "РјР°СЂС‚ вЂ” РјР°Р№"
  },
  {
    "id": 89,
    "color": "orange",
    "nameRu": "Р”РѕСЂРѕРЅРёРєСѓРј",
    "height": "30вЂ“50",
    "bloom": "6вЂ“7",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” РёСЋР»СЊ"
  },
  {
    "id": 90,
    "color": "orange",
    "nameRu": "РџРёРѕРЅ",
    "height": "60вЂ“100",
    "bloom": "6вЂ“7",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” РёСЋР»СЊ"
  },
  {
    "id": 91,
    "color": "red-orange",
    "nameRu": "Р‘Р°СЂС…Р°С‚С†С‹",
    "height": "20вЂ“30",
    "bloom": "5вЂ“6",
    "sun": "4вЂ“5",
    "bloomNote": "РјР°Р№ вЂ” РёСЋРЅСЊ"
  },
  {
    "id": 92,
    "color": "red-orange",
    "nameRu": "РљР°Р»РµРЅРґСѓР»Р°",
    "height": "15вЂ“30",
    "bloom": "6вЂ“9",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” СЃРµРЅС‚СЏР±СЂСЊ"
  },
  {
    "id": 93,
    "color": "red-orange",
    "nameRu": "Р­С…РёРЅР°С†РµСЏ",
    "height": "100вЂ“150",
    "bloom": "7вЂ“10",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋР»СЊ вЂ” РѕРєС‚СЏР±СЂСЊ"
  },
  {
    "id": 94,
    "color": "red-orange",
    "nameRu": "РќР°СЃС‚СѓСЂС†РёСЏ",
    "height": "20вЂ“30",
    "bloom": "7вЂ“8",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋР»СЊ вЂ” Р°РІРіСѓСЃС‚"
  },
  {
    "id": 95,
    "color": "red-orange",
    "nameRu": "Р“Р°Р№Р»Р°СЂРґРёСЏ",
    "height": "35вЂ“75",
    "bloom": "6вЂ“10",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” РґРѕ Р·Р°РјРѕСЂРѕР·РєРѕРІ"
  },
  {
    "id": 96,
    "color": "red-orange",
    "nameRu": "РўСЋР»СЊРїР°РЅ",
    "height": "40вЂ“60",
    "bloom": "4вЂ“5",
    "sun": "4вЂ“5",
    "bloomNote": "РєРѕРЅРµС† Р°РїСЂРµР»СЏ вЂ” РЅР°С‡Р°Р»Рѕ РјР°СЏ"
  },
  {
    "id": 97,
    "color": "red-orange",
    "nameRu": "РҐСЂРёР·Р°РЅС‚РµРјР°",
    "height": "35вЂ“70",
    "bloom": "8вЂ“10",
    "sun": "4вЂ“5",
    "bloomNote": "Р°РІРіСѓСЃС‚ вЂ” РѕСЃРµРЅСЊ"
  },
  {
    "id": 98,
    "color": "red-orange",
    "nameRu": "Р СѓРґР±РµРєРёСЏ",
    "height": "50вЂ“60",
    "bloom": "7вЂ“10",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋР»СЊ вЂ” РґРѕ Р·Р°РјРѕСЂРѕР·РєРѕРІ"
  },
  {
    "id": 99,
    "color": "red-orange",
    "nameRu": "Р РѕР·Р°",
    "height": "20вЂ“100",
    "bloom": "5вЂ“7",
    "sun": "4вЂ“5",
    "bloomNote": "РјР°Р№ вЂ” РёСЋР»СЊ"
  },
  {
    "id": 100,
    "color": "red",
    "nameRu": "РџСЂРёРјСѓР»Р° РІРµСЃРµРЅРЅСЏСЏ",
    "height": "15вЂ“30",
    "bloom": "4вЂ“6",
    "sun": "2вЂ“5",
    "bloomNote": "Р°РїСЂРµР»СЊ вЂ” РёСЋРЅСЊ"
  },
  {
    "id": 101,
    "color": "red",
    "nameRu": "РђРјР°СЂР°РЅС‚",
    "height": "60вЂ“80",
    "bloom": "6вЂ“10",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” РґРѕ РјРѕСЂРѕР·РѕРІ"
  },
  {
    "id": 102,
    "color": "red",
    "nameRu": "РђСЃС‚РёР»СЊР±Р°",
    "height": "50вЂ“150",
    "bloom": "7вЂ“8",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋР»СЊ вЂ” Р°РІРіСѓСЃС‚"
  },
  {
    "id": 103,
    "color": "red",
    "nameRu": "Р›Р°РїС‡Р°С‚РєР° РєСЂРѕРІР°РІРѕ-РєСЂР°СЃРЅР°СЏ",
    "height": "35вЂ“45",
    "bloom": "6вЂ“7",
    "sun": "1вЂ“3",
    "bloomNote": "РёСЋРЅСЊ вЂ” РёСЋР»СЊ"
  },
  {
    "id": 104,
    "color": "red",
    "nameRu": "Р‘РµРіРѕРЅРёСЏ",
    "height": "25вЂ“40",
    "bloom": "6вЂ“8",
    "sun": "1вЂ“3",
    "bloomNote": "РёСЋРЅСЊ вЂ” Р°РІРіСѓСЃС‚"
  },
  {
    "id": 105,
    "color": "red",
    "nameRu": "РњР°Рє РІРѕСЃС‚РѕС‡РЅС‹Р№",
    "height": "80вЂ“100",
    "bloom": "6вЂ“6",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋРЅСЊ"
  },
  {
    "id": 106,
    "color": "red",
    "nameRu": "РџРёСЂРµС‚СЂСѓРј РєСЂР°СЃРЅС‹Р№",
    "height": "50вЂ“70",
    "bloom": "6вЂ“8",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” Р°РІРіСѓСЃС‚"
  },
  {
    "id": 107,
    "color": "red",
    "nameRu": "Р“РµР»РµРЅРёСѓРј РѕСЃРµРЅРЅРёР№",
    "height": "60вЂ“90",
    "bloom": "7вЂ“8",
    "sun": "2вЂ“5",
    "bloomNote": "РєРѕРЅРµС† РёСЋР»СЏ вЂ” Р°РІРіСѓСЃС‚"
  },
  {
    "id": 108,
    "color": "red",
    "nameRu": "РҐСЂРёР·Р°РЅС‚РµРјР° РєРѕСЂРµР№СЃРєР°СЏ",
    "height": "60вЂ“70",
    "bloom": "9вЂ“10",
    "sun": "4вЂ“5",
    "bloomNote": "СЃРµРЅС‚СЏР±СЂСЊ вЂ” РѕРєС‚СЏР±СЂСЊ"
  },
  {
    "id": 109,
    "color": "red",
    "nameRu": "РђРґРѕРЅРёСЃ РёР·С‹СЃРєР°РЅРЅС‹Р№",
    "height": "20вЂ“30",
    "bloom": "8вЂ“9",
    "sun": "4вЂ“5",
    "bloomNote": "Р°РІРіСѓСЃС‚ вЂ” СЃРµРЅС‚СЏР±СЂСЊ"
  },
  {
    "id": 110,
    "color": "red",
    "nameRu": "Р›РёС…РЅРёСЃ С…Р°Р»С†РµРґРѕРЅСЃРєРёР№",
    "height": "80вЂ“100",
    "bloom": "6вЂ“7",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” РёСЋР»СЊ"
  },
  {
    "id": 111,
    "color": "red",
    "nameRu": "Р“РµР№С…РµСЂР° РєСЂРѕРІР°РІРѕ-РєСЂР°СЃРЅР°СЏ",
    "height": "50вЂ“60",
    "bloom": "6вЂ“8",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” Р°РІРіСѓСЃС‚"
  },
  {
    "id": 112,
    "color": "red",
    "nameRu": "РҐСЂРёР·Р°РЅС‚РµРјР°",
    "height": "35вЂ“70",
    "bloom": "8вЂ“9",
    "sun": "4вЂ“5",
    "bloomNote": "Р°РІРіСѓСЃС‚ вЂ” СЃРµРЅС‚СЏР±СЂСЊ"
  },
  {
    "id": 113,
    "color": "red",
    "nameRu": "Р¤Р»РѕРєСЃ РјРµС‚РµР»СЊС‡Р°С‚С‹Р№",
    "height": "60вЂ“120",
    "bloom": "6вЂ“9",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” СЃРµРЅС‚СЏР±СЂСЊ"
  },
  {
    "id": 114,
    "color": "red",
    "nameRu": "Р РѕР·Р°",
    "height": "20вЂ“100",
    "bloom": "5вЂ“6",
    "sun": "4вЂ“5",
    "bloomNote": "РјР°Р№ вЂ” РёСЋРЅСЊ"
  },
  {
    "id": 115,
    "color": "pink",
    "nameRu": "Р‘Р°РґР°РЅ С‚РѕР»СЃС‚РѕР»РёСЃС‚РЅС‹Р№",
    "height": "25вЂ“40",
    "bloom": "4вЂ“5",
    "sun": "1вЂ“5",
    "bloomNote": "РєРѕРЅРµС† Р°РїСЂРµР»СЏ вЂ” РјР°Р№"
  },
  {
    "id": 116,
    "color": "pink",
    "nameRu": "Р”РёС†РµРЅС‚СЂР° РІРµР»РёРєРѕР»РµРїРЅР°СЏ",
    "height": "30вЂ“100",
    "bloom": "5вЂ“5",
    "sun": "2вЂ“5",
    "bloomNote": "РјР°Р№"
  },
  {
    "id": 117,
    "color": "pink",
    "nameRu": "РћР±СЂРёРµС‚Р° РєСѓР»СЊС‚СѓСЂРЅР°СЏ",
    "height": "10вЂ“15",
    "bloom": "5вЂ“5",
    "sun": "4вЂ“5",
    "bloomNote": "РјР°Р№"
  },
  {
    "id": 118,
    "color": "pink",
    "nameRu": "РџСЂРёРјСѓР»Р° РѕР±С‹РєРЅРѕРІРµРЅРЅР°СЏ",
    "height": "10вЂ“25",
    "bloom": "4вЂ“4",
    "sun": "4вЂ“5",
    "bloomNote": "Р°РїСЂРµР»СЊ"
  },
  {
    "id": 119,
    "color": "pink",
    "nameRu": "Р¤Р»РѕРєСЃ С€РёР»РѕРІРёРґРЅС‹Р№",
    "height": "15вЂ“20",
    "bloom": "5вЂ“6",
    "sun": "2вЂ“5",
    "bloomNote": "СЃРµСЂРµРґРёРЅР° РјР°СЏ вЂ” РєРѕРЅРµС† РёСЋРЅСЏ"
  },
  {
    "id": 120,
    "color": "pink",
    "nameRu": "РђСЃС‚СЂР° Р°Р»СЊРїРёР№СЃРєР°СЏ",
    "height": "18вЂ“85",
    "bloom": "6вЂ“6",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋРЅСЊ"
  },
  {
    "id": 121,
    "color": "pink",
    "nameRu": "РђСЃС‚СЂР° РЅРѕРІРѕР°РЅРіР»РёР№СЃРєР°СЏ",
    "height": "70вЂ“150",
    "bloom": "9вЂ“10",
    "sun": "4вЂ“5",
    "bloomNote": "СЃРµРЅС‚СЏР±СЂСЊ вЂ” РѕРєС‚СЏР±СЂСЊ"
  },
  {
    "id": 122,
    "color": "pink",
    "nameRu": "РђСЃС‚СЂР° РЅРѕРІРѕР±РµР»СЊРіРёР№СЃРєР°СЏ",
    "height": "100вЂ“120",
    "bloom": "9вЂ“9",
    "sun": "4вЂ“5",
    "bloomNote": "СЃРµРЅС‚СЏР±СЂСЊ"
  },
  {
    "id": 123,
    "color": "pink",
    "nameRu": "Р“РІРѕР·РґРёРєР° РїРµСЂРёСЃС‚Р°СЏ",
    "height": "35вЂ“40",
    "bloom": "6вЂ“6",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋРЅСЊ"
  },
  {
    "id": 124,
    "color": "pink",
    "nameRu": "Р“РµСЂР°РЅСЊ РєСЂРѕРІР°РІРѕ-РєСЂР°СЃРЅР°СЏ",
    "height": "10вЂ“50",
    "bloom": "6вЂ“7",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” РёСЋР»СЊ"
  },
  {
    "id": 125,
    "color": "pink",
    "nameRu": "РћС‡РёС‚РѕРє Р»РѕР¶РЅС‹Р№",
    "height": "20вЂ“25",
    "bloom": "7вЂ“7",
    "sun": "1вЂ“3",
    "bloomNote": "РёСЋР»СЊ"
  },
  {
    "id": 126,
    "color": "pink",
    "nameRu": "РџРёСЂРµС‚СЂСѓРј СЂРѕР·РѕРІС‹Р№",
    "height": "55вЂ“60",
    "bloom": "6вЂ“6",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋРЅСЊ"
  },
  {
    "id": 127,
    "color": "pink",
    "nameRu": "РђСЃС‚СЂР° РєСѓСЃС‚Р°СЂРЅРёРєРѕРІР°СЏ",
    "height": "30вЂ“40",
    "bloom": "9вЂ“9",
    "sun": "4вЂ“5",
    "bloomNote": "СЃРµРЅС‚СЏР±СЂСЊ"
  },
  {
    "id": 128,
    "color": "pink",
    "nameRu": "Р‘РµР·РІСЂРµРјРµРЅРЅРёРє РѕСЃРµРЅРЅРёР№",
    "height": "35вЂ“40",
    "bloom": "9вЂ“10",
    "sun": "4вЂ“5",
    "bloomNote": "РєРѕРЅРµС† СЃРµРЅС‚СЏР±СЂСЏ вЂ” РѕРєС‚СЏР±СЂСЊ"
  },
  {
    "id": 129,
    "color": "pink",
    "nameRu": "РҐСЂРёР·Р°РЅС‚РµРјР° РєРѕСЂРµР№СЃРєР°СЏ",
    "height": "40вЂ“100",
    "bloom": "9вЂ“10",
    "sun": "4вЂ“5",
    "bloomNote": "СЃРµРЅС‚СЏР±СЂСЊ вЂ” РґРѕ Р·Р°РјРѕСЂРѕР·РєРѕРІ"
  },
  {
    "id": 130,
    "color": "pink",
    "nameRu": "РђРЅРµРјРѕРЅР° СЏРїРѕРЅСЃРєР°СЏ",
    "height": "10вЂ“20",
    "bloom": "5вЂ“6",
    "sun": "1вЂ“2",
    "bloomNote": "РјР°Р№ вЂ” РЅР°С‡Р°Р»Рѕ РёСЋРЅСЏ"
  },
  {
    "id": 131,
    "color": "pink",
    "nameRu": "РўРёРјСЊСЏРЅ РїРѕР»Р·СѓС‡РёР№",
    "height": "10вЂ“15",
    "bloom": "8вЂ“8",
    "sun": "4вЂ“5",
    "bloomNote": "Р°РІРіСѓСЃС‚"
  },
  {
    "id": 132,
    "color": "pink",
    "nameRu": "РђРєРІРёР»РµРіРёСЏ",
    "height": "50вЂ“100",
    "bloom": "6вЂ“7",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” РёСЋР»СЊ"
  },
  {
    "id": 133,
    "color": "pink",
    "nameRu": "РђСЂРјРµСЂРёСЏ",
    "height": "50вЂ“60",
    "bloom": "5вЂ“6",
    "sun": "4вЂ“5",
    "bloomNote": "РјР°Р№ вЂ” РёСЋРЅСЊ"
  },
  {
    "id": 134,
    "color": "pink",
    "nameRu": "Р“РІРѕР·РґРёРєР°",
    "height": "10вЂ“50",
    "bloom": "6вЂ“7",
    "sun": "2вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” РёСЋР»СЊ"
  },
  {
    "id": 135,
    "color": "pink",
    "nameRu": "Р“РµРѕСЂРіРёРЅР°",
    "height": "50вЂ“200",
    "bloom": "7вЂ“10",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋР»СЊ вЂ” РѕСЃРµРЅСЊ"
  },
  {
    "id": 136,
    "color": "pink",
    "nameRu": "Р“РµСЂР°РЅСЊ (РїРµР»Р°СЂРіРѕРЅРёСЏ)",
    "height": "30вЂ“70",
    "bloom": "6вЂ“8",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” Р°РІРіСѓСЃС‚"
  },
  {
    "id": 137,
    "color": "pink",
    "nameRu": "Р“Р»Р°РґРёРѕР»СѓСЃ",
    "height": "80вЂ“150",
    "bloom": "7вЂ“8",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋР»СЊ вЂ” Р°РІРіСѓСЃС‚"
  },
  {
    "id": 138,
    "color": "pink",
    "nameRu": "РњР°СЂРіР°СЂРёС‚РєР°",
    "height": "10вЂ“30",
    "bloom": "4вЂ“11",
    "sun": "2вЂ“5",
    "bloomNote": "Р°РїСЂРµР»СЊ вЂ” РЅРѕСЏР±СЂСЊ"
  },
  {
    "id": 139,
    "color": "pink",
    "nameRu": "РџРёРѕРЅ",
    "height": "60вЂ“100",
    "bloom": "6вЂ“7",
    "sun": "4вЂ“5",
    "bloomNote": "РёСЋРЅСЊ вЂ” РёСЋР»СЊ"
  }
];

const GARDEN_COLOR_LABELS = {
  white: "Р‘РµР»С‹Рµ",
  blue: "РЎРёРЅРµ-Р·РµР»С‘РЅС‹Рµ (Р»РёСЃС‚РІР°)",
  sky: "РЎРёРЅРёРµ / РіРѕР»СѓР±С‹Рµ",
  purple: "Р¤РёРѕР»РµС‚РѕРІС‹Рµ",
  yellow: "Р–С‘Р»С‚С‹Рµ",
  orange: "РћСЂР°РЅР¶РµРІС‹Рµ",
  "red-orange": "РљСЂР°СЃРЅРѕ-РѕСЂР°РЅР¶РµРІС‹Рµ",
  red: "РљСЂР°СЃРЅС‹Рµ",
  pink: "Р РѕР·РѕРІС‹Рµ"
};

const GARDEN_SUN_LABELS = {
  1: "РўРµРЅСЊ",
  2: "РўРµРЅРµРІС‹РЅРѕСЃР»РёРІРѕРµ",
  3: "РџРѕР»СѓС‚РµРЅСЊ",
  4: "РЎРІРµС‚РѕР»СЋР±РёРІРѕРµ",
  5: "РџРѕР»РЅРѕРµ СЃРѕР»РЅС†Рµ"
};

const GARDEN_MONTH_LABELS = [
  "", "СЏРЅРІР°СЂСЊ", "С„РµРІСЂР°Р»СЊ", "РјР°СЂС‚", "Р°РїСЂРµР»СЊ", "РјР°Р№", "РёСЋРЅСЊ",
  "РёСЋР»СЊ", "Р°РІРіСѓСЃС‚", "СЃРµРЅС‚СЏР±СЂСЊ", "РѕРєС‚СЏР±СЂСЊ", "РЅРѕСЏР±СЂСЊ", "РґРµРєР°Р±СЂСЊ"
];

