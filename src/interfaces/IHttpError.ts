export default interface IHttpError {
	name: string;
	message: string;
	stack: string;
	httpStatusCode: number;
}
