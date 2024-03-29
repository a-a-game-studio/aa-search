import { isArray } from 'util';

export function toNumberArray(input: any[]) {
	const a: number[] = [];
	if (input && isArray(input)) {
		for (let i = 0; i < input.length; i++) {
			let iVal = NaN;
			if (input[i] || input[i] === 0) {
				iVal = Number(input[i]);
			}

			if (iVal || iVal === 0) {
				a.push(iVal);
			}
		}
	}
	return a;
}

/**
 * Генерация случайного числа в между двумя числами включительно
 * @param min
 * @param max
 */
export function randomInteger(min: number, max: number): number {
	// случайное число от min до (max+1)
	const rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}
