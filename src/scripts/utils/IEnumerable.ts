/**
 * get array of internal members to enumerate over
 */
export interface IEnumerable<T> {
	getEnumerator(): Array<T>;
}
