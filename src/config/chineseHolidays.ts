/**
 * 中国法定节假日配置（含调休放假全部日期）
 * 数据来源：国务院办公厅节假日安排通知
 */

export type HolidayKey =
	| "newYear"       // 元旦
	| "springFestival" // 春节
	| "qingming"     // 清明节
	| "laborDay"     // 劳动节
	| "dragonBoat"   // 端午节
	| "midAutumn"    // 中秋节
	| "nationalDay"; // 国庆节

type HolidayRange = [string, string, HolidayKey]; // [start YYYY-MM-DD, end YYYY-MM-DD, key]

// 每年放假调休日期范围（国务院公布）
const HOLIDAY_RANGES: Record<string, HolidayRange[]> = {
	"2020": [
		["2020-01-01", "2020-01-01", "newYear"],
		["2020-01-24", "2020-01-30", "springFestival"],
		["2020-04-04", "2020-04-06", "qingming"],
		["2020-05-01", "2020-05-05", "laborDay"],
		["2020-06-25", "2020-06-27", "dragonBoat"],
		["2020-10-01", "2020-10-08", "nationalDay"],
	],
	"2021": [
		["2021-01-01", "2021-01-03", "newYear"],
		["2021-02-11", "2021-02-17", "springFestival"],
		["2021-04-03", "2021-04-05", "qingming"],
		["2021-05-01", "2021-05-05", "laborDay"],
		["2021-06-12", "2021-06-14", "dragonBoat"],
		["2021-09-19", "2021-09-21", "midAutumn"],
		["2021-10-01", "2021-10-07", "nationalDay"],
	],
	"2022": [
		["2022-01-01", "2022-01-03", "newYear"],
		["2022-01-31", "2022-02-06", "springFestival"],
		["2022-04-03", "2022-04-05", "qingming"],
		["2022-04-30", "2022-05-04", "laborDay"],
		["2022-06-03", "2022-06-05", "dragonBoat"],
		["2022-09-10", "2022-09-12", "midAutumn"],
		["2022-10-01", "2022-10-07", "nationalDay"],
	],
	"2023": [
		["2023-01-01", "2023-01-02", "newYear"],
		["2023-01-21", "2023-01-27", "springFestival"],
		["2023-04-05", "2023-04-05", "qingming"],
		["2023-04-29", "2023-05-03", "laborDay"],
		["2023-06-22", "2023-06-24", "dragonBoat"],
		["2023-09-29", "2023-10-06", "nationalDay"], // 中秋+国庆连休
	],
	"2024": [
		["2024-01-01", "2024-01-01", "newYear"],
		["2024-02-10", "2024-02-17", "springFestival"],
		["2024-04-04", "2024-04-06", "qingming"],
		["2024-05-01", "2024-05-05", "laborDay"],
		["2024-06-08", "2024-06-10", "dragonBoat"],
		["2024-09-15", "2024-09-17", "midAutumn"],
		["2024-10-01", "2024-10-07", "nationalDay"],
	],
	"2025": [
		["2025-01-01", "2025-01-01", "newYear"],
		["2025-01-28", "2025-02-04", "springFestival"],
		["2025-04-04", "2025-04-06", "qingming"],
		["2025-05-01", "2025-05-05", "laborDay"],
		["2025-05-31", "2025-06-02", "dragonBoat"],
		["2025-10-01", "2025-10-08", "nationalDay"], // 中秋+国庆连休
	],
	"2026": [
		["2026-01-01", "2026-01-03", "newYear"],
		["2026-02-15", "2026-02-23", "springFestival"],
		["2026-04-04", "2026-04-06", "qingming"],
		["2026-05-01", "2026-05-05", "laborDay"],
		["2026-06-19", "2026-06-21", "dragonBoat"],
		["2026-09-25", "2026-09-27", "midAutumn"],
		["2026-10-01", "2026-10-07", "nationalDay"],
	],
	"2027": [
		["2027-01-01", "2027-01-03", "newYear"],
		["2027-02-06", "2027-02-12", "springFestival"],
		["2027-04-04", "2027-04-06", "qingming"],
		["2027-05-01", "2027-05-05", "laborDay"],
		["2027-05-31", "2027-06-02", "dragonBoat"],
		["2027-10-01", "2027-10-08", "nationalDay"], // 中秋+国庆可能连休
	],
	"2028": [
		["2028-01-01", "2028-01-03", "newYear"],
		["2028-01-26", "2028-02-01", "springFestival"],
		["2028-04-04", "2028-04-06", "qingming"],
		["2028-05-01", "2028-05-05", "laborDay"],
		["2028-05-19", "2028-05-21", "dragonBoat"],
		["2028-09-24", "2028-09-26", "midAutumn"],
		["2028-10-01", "2028-10-07", "nationalDay"],
	],
	"2029": [
		["2029-01-01", "2029-01-03", "newYear"],
		["2029-02-13", "2029-02-19", "springFestival"],
		["2029-04-04", "2029-04-06", "qingming"],
		["2029-05-01", "2029-05-05", "laborDay"],
		["2029-06-08", "2029-06-10", "dragonBoat"],
		["2029-10-01", "2029-10-07", "nationalDay"],
		["2029-10-04", "2029-10-06", "midAutumn"],
	],
	"2030": [
		["2030-01-01", "2030-01-03", "newYear"],
		["2030-02-03", "2030-02-09", "springFestival"],
		["2030-04-04", "2030-04-06", "qingming"],
		["2030-05-01", "2030-05-05", "laborDay"],
		["2030-05-28", "2030-05-30", "dragonBoat"],
		["2030-09-23", "2030-09-25", "midAutumn"],
		["2030-10-01", "2030-10-07", "nationalDay"],
	],
	"2031": [
		["2031-01-01", "2031-01-03", "newYear"],
		["2031-01-23", "2031-01-29", "springFestival"],
		["2031-04-04", "2031-04-06", "qingming"],
		["2031-05-01", "2031-05-05", "laborDay"],
		["2031-06-16", "2031-06-18", "dragonBoat"],
		["2031-09-12", "2031-09-14", "midAutumn"],
		["2031-10-01", "2031-10-07", "nationalDay"],
	],
	"2032": [
		["2032-01-01", "2032-01-03", "newYear"],
		["2032-02-11", "2032-02-17", "springFestival"],
		["2032-04-04", "2032-04-06", "qingming"],
		["2032-05-01", "2032-05-05", "laborDay"],
		["2032-06-06", "2032-06-08", "dragonBoat"],
		["2032-10-01", "2032-10-07", "nationalDay"], // 中秋可能合并
	],
	"2033": [
		["2033-01-01", "2033-01-03", "newYear"],
		["2033-01-31", "2033-02-06", "springFestival"],
		["2033-04-04", "2033-04-06", "qingming"],
		["2033-05-01", "2033-05-05", "laborDay"],
		["2033-05-25", "2033-05-27", "dragonBoat"],
		["2033-09-20", "2033-09-22", "midAutumn"],
		["2033-10-01", "2033-10-07", "nationalDay"],
	],
	"2034": [
		["2034-01-01", "2034-01-03", "newYear"],
		["2034-02-19", "2034-02-25", "springFestival"],
		["2034-04-04", "2034-04-06", "qingming"],
		["2034-05-01", "2034-05-05", "laborDay"],
		["2034-06-14", "2034-06-16", "dragonBoat"],
		["2034-09-10", "2034-09-12", "midAutumn"],
		["2034-10-01", "2034-10-07", "nationalDay"],
	],
	"2035": [
		["2035-01-01", "2035-01-03", "newYear"],
		["2035-02-08", "2035-02-14", "springFestival"],
		["2035-04-04", "2035-04-06", "qingming"],
		["2035-05-01", "2035-05-05", "laborDay"],
		["2035-06-03", "2035-06-05", "dragonBoat"],
		["2035-09-28", "2035-10-04", "nationalDay"], // 中秋+国庆连休
	],
};

function parseDateStr(s: string): number {
	const [y, m, d] = s.split("-").map(Number);
	return new Date(y, m - 1, d).getTime();
}

function expandRange(start: string, end: string): string[] {
	const dates: string[] = [];
	let t = parseDateStr(start);
	const endT = parseDateStr(end);
	while (t <= endT) {
		const d = new Date(t);
		dates.push(
			`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
		);
		t += 86400000;
	}
	return dates;
}

/** 预计算的日期->节假日映射（2020-2035） */
let _holidayMapCache: Record<string, HolidayKey> | null = null;

function buildHolidayMap(): Record<string, HolidayKey> {
	if (_holidayMapCache) return _holidayMapCache;
	const map: Record<string, HolidayKey> = {};
	for (const [year, ranges] of Object.entries(HOLIDAY_RANGES)) {
		for (const [start, end, key] of ranges) {
			for (const dateKey of expandRange(start, end)) {
				const existing = map[dateKey];
				// 国庆优先于中秋（重叠时）
				if (existing === "nationalDay" && key === "midAutumn") continue;
				map[dateKey] = key;
			}
		}
	}
	_holidayMapCache = map;
	return map;
}

/**
 * 根据日期获取节假日 key，用于 i18n 翻译
 */
export function getHolidayKey(dateKey: string): HolidayKey | null {
	if (!dateKey || dateKey.length < 10) return null;
	return buildHolidayMap()[dateKey] ?? null;
}
