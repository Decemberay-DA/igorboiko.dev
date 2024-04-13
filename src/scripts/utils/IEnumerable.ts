/**
 * get array of internal members to enumerate over
 */
export default interface IEnumerable<T> {
	getEnumerator(): Array<T>;
}
