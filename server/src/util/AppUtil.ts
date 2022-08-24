export function messageErrorTryCatchTreatment(error: any) {
	try {
		let mensagem = '';
		if (error) {
			if (error.message) {
				mensagem = String(error.message);
			} else {
				mensagem = error && error.error ? JSON.stringify(error.error) : JSON.stringify(error);
				if (
					error &&
					(error instanceof ReferenceError ||
						error instanceof TypeError ||
						error instanceof EvalError ||
						error instanceof RangeError)
				) {
					mensagem = String(error);
				}
			}
		}
		return mensagem;
	} catch (error) {
		return 'Erro não catalogado';
	}
}
